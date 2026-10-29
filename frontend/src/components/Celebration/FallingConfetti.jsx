import React, { useEffect, useRef } from 'react';

export function FallingConfetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Festive Color Palette (Pink celebration for baby girl Lía Saori with gold, white & accents)
    const colors = [
      '#f472b6', // pink-400
      '#ec4899', // pink-500
      '#db2777', // pink-600
      '#fbcfe8', // pink-200
      '#f59e0b', // gold
      '#fbbf24', // amber-400
      '#fef08a', // light gold
      '#ffffff', // white sparkle
      '#e879f9', // fuchsia-400
      '#38bdf8', // sky-400 (baby blue accent)
    ];

    const shapes = ['ribbon', 'circle', 'heart', 'star'];

    // Generate continuous falling particles
    const particleCount = 85;
    const particles = [];

    const createParticle = (fromTop = false) => {
      const size = Math.random() * 8 + 6;
      return {
        x: Math.random() * width,
        y: fromTop ? -20 - Math.random() * 50 : Math.random() * height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        speedY: Math.random() * 2 + 1.2,
        speedX: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        opacity: Math.random() * 0.4 + 0.6,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(false));
    }

    // Burst particles triggered on events
    const burstParticles = [];

    const triggerBurst = () => {
      const burstCount = 70;
      const originX = width / 2;
      const originY = height * 0.4;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 4;
        burstParticles.push({
          x: originX,
          y: originY,
          size: Math.random() * 9 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity - 3,
          gravity: 0.25,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          opacity: 1,
          decay: Math.random() * 0.015 + 0.008,
        });
      }
    };

    const handleCustomBurst = () => {
      triggerBurst();
    };

    window.addEventListener('celebrate-confetti', handleCustomBurst);

    // Initial festive burst after load
    const initialBurstTimer = setTimeout(() => {
      triggerBurst();
    }, 600);

    // Draw a single heart
    const drawHeart = (ctx, x, y, size) => {
      const topCurveHeight = size * 0.3;
      ctx.beginPath();
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    // Draw a small 4-point star / sparkle
    const drawStar = (ctx, x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(
          x + Math.cos(((18 + i * 90) * Math.PI) / 180) * size,
          y + Math.sin(((18 + i * 90) * Math.PI) / 180) * size
        );
        ctx.lineTo(
          x + Math.cos(((63 + i * 90) * Math.PI) / 180) * (size * 0.35),
          y + Math.sin(((63 + i * 90) * Math.PI) / 180) * (size * 0.35)
        );
      }
      ctx.closePath();
      ctx.fill();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render continuous falling confetti
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.wobble) * 0.8;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          particles[i] = createParticle(true);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'heart') {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
        } else if (p.shape === 'star') {
          drawStar(ctx, 0, 0, p.size * 0.8);
        } else {
          // Classic ribbon strip
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        ctx.restore();
      }

      // 2. Render burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.speedX;
        bp.y += bp.speedY;
        bp.speedY += bp.gravity;
        bp.speedX *= 0.98;
        bp.rotation += bp.rotationSpeed;
        bp.opacity -= bp.decay;

        if (bp.opacity <= 0 || bp.y > height + 50) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate((bp.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, bp.opacity);
        ctx.fillStyle = bp.color;

        if (bp.shape === 'heart') {
          drawHeart(ctx, -bp.size / 2, -bp.size / 2, bp.size);
        } else if (bp.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, bp.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-bp.size / 2, -bp.size / 4, bp.size, bp.size / 2);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(initialBurstTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('celebrate-confetti', handleCustomBurst);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
