    // Gabungkan semua script dalam satu event listener agar tidak error
    window.addEventListener('DOMContentLoaded', () => {
      // Fade-in animation for products only when in viewport
      const products = document.querySelectorAll('.product');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-top');
            }, 200 + i * 200);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      products.forEach(product => observer.observe(product));

      // Underwater particle animation
      const canvas = document.getElementById('underwater-canvas');
      const ctx = canvas.getContext('2d');
      let particles = [];

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();

      function randomBlue() {
        const blues = [
          'rgba(79,140,255,0.18)',
          'rgba(79,180,255,0.22)',
          'rgba(79,140,255,0.10)',
          'rgba(79,140,255,0.30)'
        ];
        return blues[Math.floor(Math.random() * blues.length)];
      }

      function createParticles() {
        particles = [];
        const count = Math.floor(window.innerWidth / 12);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 1,
            speed: Math.random() * 0.5 + 0.2,
            drift: (Math.random() - 0.5) * 0.2,
            color: randomBlue()
          });
        }
      }
      createParticles();

      window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
      });

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
          p.y -= p.speed;
          p.x += p.drift;
          if (p.y + p.r < 0) {
            p.y = canvas.height + p.r;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();

      // Animasi rotasi teks
      const items = ["Stiker", "Acrylic Keychain", "Lanyard ID Card", "Lanyard Keychain"];
      let index = 0;
      setInterval(() => {
        index = (index + 1) % items.length;
        document.getElementById("rotatingBar").textContent = items[index];
      }, 3000);

      // Smooth scroll untuk navigasi header
      document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              window.scrollTo({
                top: target.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    });