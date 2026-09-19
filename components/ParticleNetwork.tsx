import React, { useEffect, useRef } from 'react';

export const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    
    // Configuration
    const particleCount = Math.min(Math.floor(window.innerWidth / 8), 150);
    const connectionDistance = 120;
    const mouseDistance = 200;
    
    const mouse = { x: -1000, y: -1000 }; // Start off-screen

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      initParticles();
    };

    // Initialize Particles
    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 60 : particleCount;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8, 
          vy: (Math.random() - 0.5) * 0.8,
        });
      }
    };

    // Animation Loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee'; // Cyan-400
        ctx.fill();

        // Connect to particles
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                const opacity = 1 - dist / connectionDistance;
                ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.5})`; // Cyan with fade
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
        
        // Connect to Mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseDistance) {
             // Slight repulsion
             const force = (mouseDistance - dist) / mouseDistance;
             const angle = Math.atan2(dy, dx);
             p.vx += Math.cos(angle) * force * 0.05;
             p.vy += Math.sin(angle) * force * 0.05;

             ctx.beginPath();
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / mouseDistance})`; // Purple connection
             ctx.lineWidth = 1;
             ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#050505]">
        <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};