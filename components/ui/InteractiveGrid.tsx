import React, { useEffect, useRef } from 'react';

export const InteractiveGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    // Grid settings
    const spacing = 40;
    const rows = Math.ceil(height / spacing);
    const cols = Math.ceil(width / spacing);
    const radius = 1.5;
    const color = '#333333';
    
    // Mouse interaction settings
    const mouse = { x: -1000, y: -1000 };
    const influenceRadius = 150;
    const forceFactor = 20; // How much they push away

    // Point Class
    class Point {
      originX: number;
      originY: number;
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
      }

      update() {
        const dx = mouse.x - this.originX;
        const dy = mouse.y - this.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = this.originX;
        let targetY = this.originY;

        if (distance < influenceRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (influenceRadius - distance) / influenceRadius;
            const push = force * forceFactor;
            
            // Push away from mouse
            targetX -= Math.cos(angle) * push;
            targetY -= Math.sin(angle) * push;
        }

        // Smoothly interpolate current position to target
        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.fill();
      }
    }

    let points: Point[] = [];

    const init = () => {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        points = [];
        const numCols = Math.ceil(width / spacing);
        const numRows = Math.ceil(height / spacing);

        for(let i = 0; i < numCols; i++) {
            for(let j = 0; j < numRows; j++) {
                points.push(new Point(i * spacing + spacing/2, j * spacing + spacing/2));
            }
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
        init();
    };

    window.addEventListener('resize', handleResize);
    // Attach to window to track mouse even if outside canvas bounds but near
    window.addEventListener('mousemove', handleMouseMove);
    
    init();

    let animationId: number;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        points.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-40">
        <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
