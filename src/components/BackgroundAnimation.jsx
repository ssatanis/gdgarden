import { useEffect, useRef, useState } from 'react';

/**
 * BackgroundAnimation Component
 * Beautiful canvas-based falling leaves animation
 * Interactive - click leaves to create particle bursts
 */
const BackgroundAnimation = ({ type = 'leaves' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const leavesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Leaf class for falling leaves animation
  class Leaf {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      // Start at random position for initial render
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = -20;
      this.size = Math.random() * 20 + 20;
      this.speed = Math.random() * 1 + 0.5;
      this.swing = Math.random() * 2 - 1;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.5 + 0.3;

      // Flower color palette - purples, pinks, and whites
      const colors = [
        '#e8d5ff', // Light purple
        '#f3ebff', // Very light purple
        '#d4bff0', // Medium purple
        '#ffb3d9', // Light pink
        '#ffc9e5', // Pale pink
        '#ffffff', // White
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speed;
      this.x += Math.sin(this.y * this.swingSpeed) * this.swing;
      this.rotation += this.rotationSpeed;

      // Reset when leaf goes off screen
      if (this.y > this.canvas.height + 50) {
        this.reset();
      }
      if (this.x > this.canvas.width + 50 || this.x < -50) {
        this.x = Math.random() * this.canvas.width;
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      // Draw flower shape (5 petals)
      const petalCount = 5;
      const petalSize = this.size / 2;
      
      for (let i = 0; i < petalCount; i++) {
        const angle = (i * 2 * Math.PI) / petalCount;
        const petalX = Math.cos(angle) * (petalSize / 2);
        const petalY = Math.sin(angle) * (petalSize / 2);
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(petalX, petalY, petalSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw center of flower
      ctx.fillStyle = '#ffeb3b';
      ctx.beginPath();
      ctx.arc(0, 0, petalSize / 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    isClicked(mouseX, mouseY) {
      const distance = Math.sqrt(
        Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2)
      );
      return distance < this.size;
    }
  }

  // Particle class for click burst effect
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 2;
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
      this.color = color;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += 0.1; // Gravity
      this.life -= this.decay;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particlesRef = useRef([]);

  // Handle canvas click for interactive particle effect
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if any leaf was clicked
    leavesRef.current.forEach((leaf) => {
      if (leaf.isClicked(mouseX, mouseY)) {
        // Create particle burst
        for (let i = 0; i < 15; i++) {
          particlesRef.current.push(new Particle(leaf.x, leaf.y, leaf.color));
        }
        // Reset the leaf
        leaf.reset();
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: canvas.width, height: canvas.height });

      // Reinitialize leaves if size changes significantly
      if (leavesRef.current.length === 0) {
        const leafCount = Math.floor((canvas.width * canvas.height) / 15000) + 20;
        leavesRef.current = Array.from({ length: leafCount }, () => new Leaf(canvas));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw leaves
      leavesRef.current.forEach((leaf) => {
        leaf.canvas = canvas; // Update canvas reference
        leaf.update();
        leaf.draw(ctx);
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="fixed inset-0 pointer-events-auto cursor-pointer -z-10"
      style={{
        background: 'transparent',
      }}
    />
  );
};

export default BackgroundAnimation;
