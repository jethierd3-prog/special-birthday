(() => {
  'use strict';

  const byId = (id) => document.getElementById(id);

  // Birthday letter: reveal and hide without moving the reader away from the section.
  const openLetter = byId('openLetter');
  const letterCard = byId('letterCard');
  const letterAside = byId('letterAside');
  const closeLetter = byId('closeLetter');

  function showLetter() {
    if (!openLetter || !letterCard) return;
    openLetter.classList.add('is-open');
    openLetter.setAttribute('aria-expanded', 'true');
    letterCard.hidden = false;
    if (letterAside) letterAside.hidden = true;
    window.setTimeout(() => letterCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
  }
  function hideLetter() {
    if (!openLetter || !letterCard) return;
    openLetter.classList.remove('is-open');
    openLetter.setAttribute('aria-expanded', 'false');
    letterCard.hidden = true;
    if (letterAside) letterAside.hidden = false;
  }
  openLetter?.addEventListener('click', () => letterCard?.hidden ? showLetter() : hideLetter());
  closeLetter?.addEventListener('click', hideLetter);

  // Verse carousel. All verse text comes from app.py.
  let verses = [];
  try { verses = JSON.parse(byId('verseData')?.textContent || '[]'); } catch (error) { console.error('Could not read verse data.', error); }
  let verseIndex = 0;
  const verseText = byId('verseText');
  const verseReference = byId('verseReference');
  const verseCount = byId('verseCount');
  function showVerse(index) {
    if (!verses.length || !verseText || !verseReference || !verseCount) return;
    verseIndex = (index + verses.length) % verses.length;
    verseText.textContent = verses[verseIndex].text;
    verseReference.textContent = verses[verseIndex].ref;
    verseCount.textContent = `${String(verseIndex + 1).padStart(2, '0')} / ${String(verses.length).padStart(2, '0')}`;
  }
  byId('prevVerse')?.addEventListener('click', () => showVerse(verseIndex - 1));
  byId('nextVerse')?.addEventListener('click', () => showVerse(verseIndex + 1));

  // Hidden wishes appear when a flower is selected.
  const wishReveal = byId('wishReveal');
  document.querySelectorAll('.flower-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.flower-card').forEach((other) => {
        other.setAttribute('aria-pressed', String(other === card));
      });
      if (!wishReveal) return;
      const title = document.createElement('strong');
      title.textContent = `${card.dataset.flower || 'A flower'} has a wish for you`;
      const message = document.createElement('span');
      message.textContent = card.dataset.message || 'May something beautiful bloom for you today.';
      const paragraph = document.createElement('p');
      paragraph.append(title, document.createElement('br'), message);
      wishReveal.replaceChildren();
      const icon = document.createElement('span');
      icon.className = 'wish-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✧';
      wishReveal.append(icon, paragraph);
    });
  });

  // Tiny flower planting activity.
  const plantButton = byId('plantButton');
  const plantedFlowers = byId('plantedFlowers');
  const plantCount = byId('plantCount');
  const gardenEmpty = byId('gardenEmpty');
  const flowerColors = ['#d8a2c1', '#c7b0e2', '#f0c96f', '#e6a9aa', '#f4d6e1', '#b5a4d6', '#edb977'];
  let plantedCount = 0;
  function plantFlower() {
    if (!plantedFlowers || plantedCount >= 16) {
      if (plantButton && plantedCount >= 16) plantButton.textContent = '✿ Your garden is full';
      return;
    }
    plantedCount += 1;
    const flower = document.createElement('span');
    flower.className = 'planted-flower';
    flower.setAttribute('aria-hidden', 'true');
    const stem = document.createElement('span'); stem.className = 'stem';
    const leaf = document.createElement('span'); leaf.className = 'leaf';
    const head = document.createElement('span'); head.className = 'head';
    head.style.setProperty('--flower-color', flowerColors[(plantedCount - 1) % flowerColors.length]);
    flower.append(stem, leaf, head);
    const x = 8 + ((plantedCount * 37 + (plantedCount % 3) * 17) % 83);
    const height = 55 + ((plantedCount * 11) % 38);
    flower.style.left = `${x}%`;
    flower.style.height = `${height}px`;
    flower.style.transform = `rotate(${(plantedCount % 2 ? -1 : 1) * (4 + plantedCount % 9)}deg)`;
    plantedFlowers.appendChild(flower);
    if (plantCount) plantCount.textContent = String(plantedCount);
    if (gardenEmpty) gardenEmpty.hidden = true;
    if (plantedCount >= 16 && plantButton) plantButton.textContent = '✿ Your garden is full';
  }
  plantButton?.addEventListener('click', plantFlower);

  // A short, self-ending petal shower. The user can trigger it repeatedly.
  const petalLayer = byId('petalLayer');
  const petalButton = byId('petalButton');
  let petalTimer = null;
  let petalCount = 0;
  function rainPetals() {
    if (!petalLayer || petalCount > 0) return;
    petalCount = 1;
    const colors = ['#d9b8e2', '#ecc3d2', '#f2dca0', '#c8badf', '#e8a9bd', '#f7e8ef'];
    for (let i = 0; i < 42; i += 1) {
      const petal = document.createElement('span');
      petal.className = 'falling-petal';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.background = colors[Math.floor(Math.random() * colors.length)];
      petal.style.width = `${7 + Math.random() * 8}px`;
      petal.style.height = `${11 + Math.random() * 10}px`;
      petal.style.animationDelay = `${Math.random() * 1.5}s`;
      petal.style.animationDuration = `${3.5 + Math.random() * 3}s`;
      petal.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
      petal.style.setProperty('--spin', `${180 + Math.random() * 900}deg`);
      petalLayer.appendChild(petal);
      petal.addEventListener('animationend', () => petal.remove(), { once: true });
    }
    petalTimer = window.setTimeout(() => {
      petalLayer.replaceChildren();
      petalCount = 0;
      petalTimer = null;
    }, 8000);
  }
  petalButton?.addEventListener('click', rainPetals);
  window.addEventListener('pagehide', () => { if (petalTimer) window.clearTimeout(petalTimer); });

  // Optional background music, only rendered by Flask if the MP3 exists.
  const musicButton = byId('musicButton');
  const music = byId('bgMusic');
  musicButton?.addEventListener('click', async () => {
    if (!music) return;
    if (music.paused) {
      try {
        await music.play();
        musicButton.textContent = 'Ⅱ Pause the music';
        musicButton.setAttribute('aria-pressed', 'true');
      } catch (error) {
        musicButton.textContent = 'Music could not start';
        console.warn('Browser prevented music playback.', error);
      }
    } else {
      music.pause();
      musicButton.textContent = '♫ Play a little music';
      musicButton.setAttribute('aria-pressed', 'false');
    }
  });
})();
