'use client';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Star class - moved outside component
class Star {
  constructor(random, maxStars, speedMultiplier, twinkleIntensity, brightness, w, h) {
    this.orbitRadius = random(this.maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = (random(this.orbitRadius) / 50000) * speedMultiplier;
    this.alpha = (random(2, 10) / 10) * brightness;
    this.random = random;
    this.twinkleIntensity = twinkleIntensity;
    this.w = w;
    this.h = h;
  }

  maxOrbit = (x, y) => {
    const max = Math.max(x, y);
    const diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  };

  draw(ctx, canvas2) {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
    const twinkle = this.random(this.twinkleIntensity);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
  }
}

// StarsCanvas Component
function StarsCanvas({
  transparent = false,
  maxStars = 1200,
  hue = 217,
  brightness = 10,
  speedMultiplier = 1,
  twinkleIntensity = 20,
  className = '',
  paused = false,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let stars = [];

    // --- Cached gradient texture ---
    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // --- Utility functions ---
    const random = (min, max) => {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      if (min > max) [min, max] = [max, min];
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 0; i < maxStars; i++) {
      const star = new Star(random, maxStars, speedMultiplier, twinkleIntensity, brightness, w, h);
      stars.push(star);
    }

    // --- Animation loop ---
    const animate = () => {
      if (paused) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = transparent ? 'hsla(217, 64%, 6%, 0)' : 'hsla(217, 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < stars.length; i++) {
        stars[i].draw(ctx, canvas2);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // --- Resize handling ---
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [transparent, maxStars, hue, brightness, speedMultiplier, twinkleIntensity, paused]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}

// Landing Page Component
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <StarsCanvas transparent={false} maxStars={1200} hue={217} brightness={10} />
      
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 z-10">
        <div
          className="text-center px-6"
        >
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Autonomous CI/CD Healing Agent
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            RIFT 2026 Hackathon - AI/ML Track
          </p>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-300 hover:scale-105"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
