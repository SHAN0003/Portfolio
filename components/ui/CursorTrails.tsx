import React, { useEffect, useRef } from 'react';

class TrailParticle {
  x: number;
  y: number;
  size: number;
  life: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  vRotation: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4; // Bigger chunks
    this.life = 1.0;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2 + 1; // Fall down slightly

    const colors = ['#FFD60A', '#5AC8FA', '#FF2D55', '#1c1c1e'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotation = Math.random() * Math.PI;
    this.vRotation = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vRotation;
    this.life -= 0.02;
    this.size *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    // Draw squares (confetti)
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

export const CursorTrails: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const particles = useRef<TrailParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch || width < 768) return;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // Spawn confetti
      if (Math.random() > 0.5) {
        particles.current.push(new TrailParticle(mouse.current.x, mouse.current.y));
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.current.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[8000]"
    />
  );
};
