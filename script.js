document.addEventListener('DOMContentLoaded', () => {
  // ========== LOVE RAIN ==========
  const rainContainer = document.getElementById('love-rain');
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-drop');
    heart.textContent = ['❤️','💖','💘','💝','💗','💕'][Math.floor(Math.random()*6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    rainContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }
  setInterval(createHeart, 300);

  // ========== MUSIC PLAYER ==========
  const audio = document.getElementById('bg-music');
  const toggleBtn = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  let isPlaying = false;
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      toggleBtn.textContent = '🎵💔';
      label.textContent = 'Lagu dihentikan';
    } else {
      audio.play().catch(e => console.log('Autoplay blocked, klik untuk mulai'));
      toggleBtn.textContent = '🎵❤️';
      label.textContent = 'A Thousand Years';
    }
    isPlaying = !isPlaying;
  });

  // ========== TYPING HERO ==========
  const typingEl = document.getElementById('typing-text');
  const teks = 'Untuk Haliza Cahyati Ramadhan';
  let i = 0;
  function ketik() {
    if (i < teks.length) {
      typingEl.textContent += teks.charAt(i);
      i++;
      setTimeout(ketik, 120);
    }
  }
  ketik();

  // ========== SURAT TYPING (muncul saat scroll) ==========
  const suratBox = document.getElementById('surat-text');
  const suratPenuh = `Sayangku, Haliza... Aku gak pandai merangkai kata, tapi setiap detik tanpamu terasa hampa. Kamu adalah alasan aku tersenyum di pagi hari dan bermimpi indah di malam hari. Terima kasih sudah menjadi kamu yang sekarang. Aku sayang kamu, lebih dari yang kamu tahu. 🌹`;
  let suratTyped = false;
  const observerSurat = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !suratTyped) {
        suratTyped = true;
        let j = 0;
        const intervalSurat = setInterval(() => {
          if (j < suratPenuh.length) {
            suratBox.textContent += suratPenuh.charAt(j);
            j++;
          } else {
            clearInterval(intervalSurat);
          }
        }, 50);
      }
    });
  }, { threshold: 0.3 });
  observerSurat.observe(document.getElementById('surat'));

  // ========== ALASAN (random love reasons) ==========
  const reasons = [
    'Karena senyummu indah', 'Karena kamu penyayang', 'Karena kamu pengertian',
    'Karena kamu selalu ada', 'Karena kamu lucu banget', 'Karena kamu kuat',
    'Karena kamu tulus', 'Karena kamu cerdas', 'Karena kamu sabar', 'Karena kamu spesial',
    'Karena kamu hangat', 'Karena kamu jujur', 'Karena kamu perhatian'
  ];
  const grid = document.getElementById('reasons-grid');
  reasons.sort(() => Math.random() - 0.5).forEach((reason, idx) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.textContent = `💖 ${reason}`;
    card.style.animationDelay = (idx * 0.1) + 's';
    grid.appendChild(card);
  });

  // ========== FORM SLIDER 10 ASPEK ==========
  const aspek = [
    'Kegantengan', 'Kebaikan Hati', 'Kesabaran', 'Perhatian',
    'Humoris', 'Romantis', 'Pengertian', 'Kesetiaan',
    'Kejujuran', 'Tanggung Jawab'
  ];
  const sliderContainer = document.getElementById('slider-container');
  aspek.forEach((nama, index) => {
    const div = document.createElement('div');
    div.className = 'slider-item';
    div.innerHTML = `
      <label>${nama}: <span class="nilai-label" id="nilai-${index}">5</span></label>
      <input type="range" min="1" max="10" value="5" class="slider" data-index="${index}">
    `;
    sliderContainer.appendChild(div);
  });

  // Update nilai label ketika slider digeser
  document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const idx = e.target.dataset.index;
      document.getElementById(`nilai-${idx}`).textContent = e.target.value;
    });
  });

  // ========== SUBMIT FORM & WHATSAPP ==========
  const form = document.getElementById('rating-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sliders = document.querySelectorAll('.slider');
    let pesan = `Hai Bayu! Ini penilaian dari Haliza Cahyati Ramadhan ya:%0A%0A`;
    sliders.forEach((slider, i) => {
      const label = aspek[i];
      const nilai = slider.value;
      pesan += `${label}: ${nilai}/10%0A`;
    });
    pesan += `%0A❤️ Dari pacarmu tersayang.`;
    const nomor = '+6283890031202'; // tanpa spasi, kode negara
    const url = `https://wa.me/${nomor}?text=${pesan}`;
    window.open(url, '_blank');

    // Efek love burst
    const burst = document.getElementById('form-love-burst');
    burst.innerHTML = '💖💘💝💗💕';
    burst.style.fontSize = '3rem';
    setTimeout(() => { burst.innerHTML = ''; }, 2000);
  });

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.reveal');
  const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach(el => observerReveal.observe(el));

  // ========== COUNTDOWN SIMBOLIK (ke anniversary kosong, tampilkan "Selamanya") ==========
  const countdownEl = document.getElementById('countdown');
  countdownEl.textContent = '💞 Bersama selamanya sejak hari ini 💞';
});
