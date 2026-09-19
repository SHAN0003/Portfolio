import React, { useEffect, useRef } from 'react';

export const CartoonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Cartoon Palette
    const colors = ['#FFD60A', '#5AC8FA', '#FF2D55', '#5856D6', '#FFFFFF'];

    interface Shape {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        type: 'circle' | 'square' | 'triangle';
        color: string;
        rotation: number;
        vRotation: number;
    }

    let shapes: Shape[] = [];
    const count = 30;

    const init = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        shapes = [];
        for(let i=0; i<count; i++) {
            shapes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                size: Math.random() * 40 + 20,
                type: Math.random() > 0.6 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle',
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                vRotation: (Math.random() - 0.5) * 0.1
            });
        }
    };

    const drawShape = (s: Shape) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = s.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;

        ctx.beginPath();
        if (s.type === 'circle') {
            ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        } else if (s.type === 'square') {
            ctx.rect(-s.size/2, -s.size/2, s.size, s.size);
        } else if (s.type === 'triangle') {
            ctx.moveTo(0, -s.size);
            ctx.lineTo(s.size, s.size);
            ctx.lineTo(-s.size, s.size);
            ctx.closePath();
        }
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    let animationId: number;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        shapes.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.rotation += s.vRotation;

            // Bounce with simple physics
            if(s.x < -50 || s.x > width + 50) s.vx *= -1;
            if(s.y < -50 || s.y > height + 50) s.vy *= -1;

            drawShape(s);
        });

        animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
        window.removeEventListener('resize', init);
        cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#FFFDF5] overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
                 backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
             }} 
        />
        <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
