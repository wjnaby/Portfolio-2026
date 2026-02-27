import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Menu, X, MapPin, Phone, Code, ChevronUp } from 'lucide-react';
import './App.css';
import IntroScreen from './components/IntroScreen';
import ProfileCard from './components/ProfileCard';
import HeroSection from './components/HeroSection';
import Lanyard from './components/Lanyard';

// Particle trail cursor component
function ParticleCursor() {
  const [particles, setParticles] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const particleIdRef = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      const now = Date.now();
      const spawnDelay = isHovering ? 20 : 30; // Faster spawn on hover

      // Throttle particle spawning
      if (now - lastSpawnTime.current < spawnDelay) return;
      lastSpawnTime.current = now;

      const newParticle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        createdAt: now,
        life: 1,
      };

      setParticles((prev) => [...prev, newParticle]);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Attach hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop to update particles
    const animate = () => {
      const now = Date.now();
      setParticles((prev) =>
        prev
          .map((p) => {
            const age = now - p.createdAt;
            const maxLife = 800; // Particle lifetime in ms
            const life = 1 - age / maxLife;
            return { ...p, life };
          })
          .filter((p) => p.life > 0)
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((particle) => {
        const scale = particle.life * (isHovering ? 1.3 : 1);
        const opacity = particle.life;
        
        return (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-dpurple-glow"
            style={{
              left: particle.x - 4,
              top: particle.y - 4,
              transform: `scale(${scale})`,
              opacity: opacity,
              boxShadow: `0 0 ${8 * scale}px ${4 * scale}px rgba(124, 58, 237, ${opacity * 0.6})`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        );
      })}
    </div>
  );
}

// Technology icon component
function TechIcon({ name }) {
  const icons = {
    'React': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
      </svg>
    ),
    'TypeScript': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.51-1.04-1.02 0-.4.31-.71.81-.71.5 0 .81.21 1.11.71l1.41-.91c-.51-.91-1.32-1.25-2.42-1.25-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.17c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.48.86zM13 11.25H8v1.5h1.5V20h1.75v-7.25H13v-1.5z"/>
      </svg>
    ),
    'Tailwind CSS': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"/>
      </svg>
    ),
    'HTML/CSS': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.56l4.07-1.13.55-6.1H9.38L9.2 8.3h7.6l.2-1.99H7l.56 6.01h6.89l-.23 2.58-2.22.6-2.22-.6-.14-1.66h-2l.29 3.19L12 17.56M4.07 3h15.86L18.5 19.2 12 21l-6.5-1.8L4.07 3z"/>
      </svg>
    ),
    'Node.js': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01-.53.3-.63.36-1.12.51-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47-.02-.12-.11-.21-.22-.21h-.97c-.12 0-.23.1-.23.23 0 1.24.68 2.74 3.97 2.74 2.39 0 3.75-.94 3.75-2.59 0-1.64-1.11-2.08-3.44-2.39-2.34-.31-2.58-.46-2.58-1.03 0-.46.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16C17.56 8.82 16.38 8 14 8z"/>
      </svg>
    ),
    'Express': (
      <Code className="w-4 h-4 mr-1.5" />
    ),
    'PHP': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.01 10.49c-.53 0-.92.13-1.18.4-.25.26-.38.65-.38 1.18v.15c0 .53.13.92.38 1.18.26.26.65.39 1.18.39h.57c.08 0 .14-.06.14-.14v-2.92c0-.08-.06-.14-.14-.14h-.57m.87-1.37h.73c.53 0 .92-.13 1.18-.39.26-.26.39-.65.39-1.18v-.15c0-.53-.13-.92-.39-1.18-.26-.26-.65-.39-1.18-.39h-.73c-.08 0-.14.06-.14.14v2.92c0 .08.06.14.14.14m8.96 0h.73c.53 0 .92-.13 1.18-.39.26-.26.39-.65.39-1.18v-.15c0-.53-.13-.92-.39-1.18-.26-.26-.65-.39-1.18-.39h-.73c-.08 0-.14.06-.14.14v2.92c0 .08.06.14.14.14M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1.95 14.77L9.4 15c-.11-.23-.31-.35-.56-.35H7.44c-.08 0-.14.06-.14.14v1.98c0 .08-.06.14-.14.14h-.89c-.08 0-.14-.06-.14-.14V7.23c0-.08.06-.14.14-.14h2.44c.76 0 1.35.18 1.76.54.41.36.62.88.62 1.55v.33c0 .5-.1.91-.31 1.24s-.5.57-.87.72c.05.04.1.09.14.14.04.05.08.1.11.16l.74 1.48v.01l1.32 2.64c.08.18.02.3-.16.3h-.95c-.24 0-.44-.12-.55-.35m7.51-6.92c-.41-.36-1-.54-1.76-.54h-2.44c-.08 0-.14.06-.14.14v9.54c0 .08.06.14.14.14h.88c.08 0 .14-.06.14-.14v-2.12c0-.08.06-.14.14-.14h1.27c.76 0 1.35-.18 1.76-.54.41-.36.62-.88.62-1.55v-3.24c0-.67-.21-1.19-.62-1.55m-4.51 0c-.41-.36-1-.54-1.76-.54h-2.44c-.08 0-.14.06-.14.14v9.54c0 .08.06.14.14.14h.88c.08 0 .14-.06.14-.14v-2.12c0-.08.06-.14.14-.14h1.27c.76 0 1.35-.18 1.76-.54.41-.36.62-.88.62-1.55v-3.24c0-.67-.21-1.19-.62-1.55z"/>
      </svg>
    ),
    'Laravel': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.023-.028-.037h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.03 5.831v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/>
      </svg>
    ),
    'MySQL': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.837-.388-.9-.852-1.35-1.392-1.35-.184 0-.338.048-.462.144-.123.095-.184.24-.184.43 0 .32.133.633.398.936.186.216.4.405.64.566.227.15.425.27.593.36.17.09.335.154.496.19.027.007.05.013.073.02l-.15.476a2.6 2.6 0 01-.279-.075 2.787 2.787 0 01-.326-.112 3.92 3.92 0 01-.415-.19 5.546 5.546 0 01-.514-.275 6.36 6.36 0 01-.617-.42c-.34-.274-.6-.593-.777-.955a2.095 2.095 0 01-.265-1.033c0-.397.132-.723.395-.976.264-.254.608-.38 1.032-.38.604 0 1.08.229 1.428.685.348.456.522 1.05.522 1.783z"/>
      </svg>
    ),
    'Git': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
      </svg>
    ),
    'GitHub': (
      <Github className="w-4 h-4 mr-1.5" />
    ),
    'VS Code': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
      </svg>
    ),
    'DBeaver': (
      <Code className="w-4 h-4 mr-1.5" />
    ),
    'Ruby': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.156.083c3.033.525 3.893 2.598 3.829 4.77L24 4.822 22.635 22.71 4.89 23.926h.016C3.433 23.864.787 23.572.098 19.95l-.042.19.01-.001.02.001-.004.001-.006.001c-.025.001-.051.001-.077.001.026 0 .052 0 .077-.001l.006-.001.004-.001-.02-.001.042-.19C-.003 19.948 0 19.945 0 19.943v-.002l.095-.582.013-.095L2.689.209l17.467-.126z"/>
      </svg>
    ),
    'Ruby on Rails': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.523 7.514c-.051.048-1.083 1.033-1.083 1.033S5.6 7.707 5.549 7.659c-.051-.049-.102-.049-.153 0-.102.049-.204.146-.306.244-.051.048-.051.097 0 .145.051.049.841.695.841.695s-.841.743-.892.792c-.051.048-.051.097 0 .145.102.098.204.195.306.243.051.049.102.049.153 0 .051-.048 1.084-1.032 1.084-1.032s.841.646.892.695c.051.048.102.048.153 0 .102-.049.204-.146.306-.244.051-.048.051-.097 0-.145-.051-.049-.841-.695-.841-.695s.841-.743.892-.792c.051-.048.051-.097 0-.145-.102-.097-.204-.195-.306-.243-.051-.049-.102-.049-.153 0zm4.736 0c-.051.048-1.084 1.033-1.084 1.033s-.841-.646-.892-.695c-.051-.049-.102-.049-.153 0-.102.049-.204.146-.306.244-.051.048-.051.097 0 .145.051.049.841.695.841.695s-.841.743-.892.792c-.051.048-.051.097 0 .145.102.098.204.195.306.243.051.049.102.049.153 0 .051-.048 1.084-1.032 1.084-1.032s.841.646.892.695c.051.048.102.048.153 0 .102-.049.204-.146.306-.244.051-.048.051-.097 0-.145-.051-.049-.841-.695-.841-.695s.841-.743.892-.792c.051-.048.051-.097 0-.145-.102-.097-.204-.195-.306-.243-.051-.049-.102-.049-.153 0z"/>
      </svg>
    ),
    'Bootstrap 5': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z"/>
      </svg>
    ),
    'CSS': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
      </svg>
    ),
    'HTML': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    ),
    'Hotwire/Turbo': (
      <Code className="w-4 h-4 mr-1.5" />
    ),
    'JavaScript': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    ),
    'Vue.js': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
      </svg>
    ),
    'HTML5': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    ),
    'Vite': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55a.306.306 0 0 1-.593-.111l.28-7.66a.306.306 0 0 0-.306-.327H8.332a.306.306 0 0 1-.296-.327z"/>
        <path d="M.004 6.278a.306.306 0 0 1 .296-.327h3.204a.306.306 0 0 1 .296.327l.512 8.657a.306.306 0 0 0 .306.327h3.504a.306.306 0 0 1 .296.327l-.28 7.66a.306.306 0 0 1-.593.111L.755 9.81a.306.306 0 0 1 .332-.438l2.388.46a.306.306 0 0 0 .352-.385L2.269.044A.306.306 0 0 1 2.622-.34l8.332 1.634a.306.306 0 0 1 .247.282l-.512 8.657a.306.306 0 0 1-.296.327H.306A.306.306 0 0 1 0 10.233z"/>
      </svg>
    ),
    'PostgreSQL': (
      <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-.7522-.1761a.5436.5436 0 0 0-.2206.3183c-.0742.2855-.0607.5894.0395.8652.1742.4851.0673.8711-.3156 1.1792-.3168.2476-.7305.3672-1.1586.3672-1.4795 0-2.0126-1.0014-2.0126-1.7774V8.9582c0-1.0936-.4932-1.8252-1.4166-2.1767-1.0646-.4054-2.2918-.2955-3.5752.311a.5599.5599 0 0 0-.3119.3277.5906.5906 0 0 0 .0768.5093c.1024.1446.2594.2312.4288.2378a.5494.5494 0 0 0 .4478-.1833c.8535-.9253 1.9563-1.189 3.1114-.7467.4764.1806.6693.5289.6693 1.2028v.663c0 .2995-.0169.5794-.0501.8465-.1571 1.2537-1.0137 2.0458-2.2448 2.0458-1.0183 0-1.9453-.545-2.5364-1.4915-.9156-1.4683-1.0785-3.2903-.4344-4.8871.1423-.3523.3879-.6618.7013-.8837.3377-.239.7496-.3747 1.1765-.3747.4399 0 .8693.1392 1.2471.4034a.5622.5622 0 0 0 .6255-.9211c-.5763-.4026-1.2445-.6189-1.9383-.6189-.6532 0-1.283.2015-1.8199.582-.6282.4453-1.1209 1.0551-1.4238 1.7623-.7551 1.7625-.5678 3.8506.4976 5.5479.7365 1.1749 1.9216 1.8457 3.2323 1.8457 1.0609 0 1.9763-.4549 2.6469-1.3166v.7084c0 1.1261.8073 2.2197 2.0126 2.7287.3987.1685.8232.2541 1.2616.2541.8476 0 1.6707-.3127 2.2664-.8605.7736-.7106.9691-1.6704.5786-2.8472z"/>
      </svg>
    ),
    'Subdomain routing': (
      <Code className="w-4 h-4 mr-1.5" />
    )
  };

  return icons[name] || <Code className="w-4 h-4 mr-1.5" />;
}

// Custom hook for scroll reveal animations (callback ref so we observe as soon as element exists)
function useReveal(initialVisible = false) {
  const [visible, setVisible] = useState(initialVisible);
  const observerRef = useRef(null);

  const ref = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1, rootMargin: '50px' }
    );
    observerRef.current.observe(node);
  }, []);

  return [ref, visible];
}

// Parallax hook
function useParallax() {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return offset;
}

// Letter animation component
function AnimatedText({ text, delay = 0 }) {
  const words = text.split(' ');
  
  return (
    <span className="inline-block">
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block mr-3">
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              className="inline-block animate-letter-pop"
              style={{
                animationDelay: `${delay + (wordIdx * 50) + (charIdx * 30)}ms`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

// Skill button component with internal fade transition and tech icons
function SkillButton({ skill, level, index, visible, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer inline-flex items-center overflow-hidden ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } ${
        darkMode 
          ? 'bg-dpurple-dark text-white hover:bg-dpurple-accent hover:text-white hover:shadow-purple-glow' 
          : 'bg-dpurple-dark/80 text-white hover:bg-dpurple-accent hover:text-white hover:shadow-purple-glow'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Tech Icon - always visible */}
      <TechIcon name={skill} />
      
      {/* Skill Name - fades out on hover */}
      <span
        className={`transition-all duration-300 ${
          isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {skill}
      </span>
      
      {/* Skill Level - fades in on hover */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {level}
      </span>
    </span>
  );
}

export default function Portfolio() {
  // Intro screen state
  const [showIntro, setShowIntro] = useState(true);
  const [isIntroExiting, setIsIntroExiting] = useState(false);
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const fullText = 'Computer Science Student & Web Developer';

  // Handle intro screen exit
  const handleEnterPortfolio = () => {
    setIsIntroExiting(true);
    // Wait for fade-out animation to complete before hiding intro
    setTimeout(() => {
      setShowIntro(false);
      setPortfolioVisible(true);
    }, 700); // Match the transition duration (0.7s)
  };

  const [aboutRef, aboutVisible] = useReveal();
  const [educationRef, educationVisible] = useReveal();
  const [projectsRef, projectsVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();

  const parallaxOffset = useParallax();

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking for active section and scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + 120;

      setShowScrollTop(scrollY > 400);

      // At top of page, set home
      if (scrollY < 150) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Attendance Management System",
      description: "Laravel-based system with QR code check-in, role-based access control, and automated reports generation",
      tech: ["Laravel", "PHP", "Tailwind CSS", "Vue.js", "HTML5","JavaScript", "Vite"],
      link: "https://github.com/wjnaby/attendance-system",
      type: "Personal Project",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    },
    {
      title: "SW Kitchen Bites",
      description: "This is a social recipe-sharing web application built with Ruby on Rails that allows users to post, discover, and interact with cooking recipes.",
      tech: ["Ruby", "Ruby on Rails ", "Bootstrap 5", "CSS", "HTML", "Hotwire/Turbo", "JavaScript"],
      link: "https://github.com/wjnaby/sw_kitchen_bites",
      type: "Personal Project",
      image: import.meta.env.BASE_URL + "kitchen.jpeg"
    },
    {
      title: "Walk With Me 2026",
      description: "Walk With Me 2026 is a community walking event held in memory of Dato' KY, with registration open for different participant groups.",
      tech: ["Ruby", "Ruby on Rails 8 ", "Bootstrap 5", "CSS", "HTML", "Hotwire/Turbo", "JavaScript", "Tailwind CSS", "PostgreSQL","Subdomain routing"],
      link: "https://walkwithme.my/",
      type: "Internship Project",
      image: import.meta.env.BASE_URL + "walkwithme.jpeg",
      isLive: true
    },
    {
      title: "Cafe Ordering System",
      description: "Full-stack cafe ordering system with Admin and User roles. Features admin dashboard to manage menu items, pricing, and customer orders (CRUD operations), plus user-facing ordering flow for browsing menus and placing orders.",
      tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Vite", "JavaScript", "Git"],
      link: "https://cafe-system-vsaw.onrender.com",
      githubLink: "https://github.com/wjnaby/cafe-system",
      type: "Personal Project",
      image: import.meta.env.BASE_URL + "cafe-order.jpeg",
      isLive: true
    },
    {
      title: "Cafe Recommendation System",
      description: "A café recommendation web application with rule-based logic to personalize recommendations based on user preferences.",
      tech: ["PHP", "MySQL", "CSS", "HTML", "JavaScript"],
      link: "https://github.com/wjnaby/Jw-Recommendation-System",
      type: "Academic Project",
      image: import.meta.env.BASE_URL + "cafe-recommendation.jpeg"
    },
    {
      title: "Todo App",
      description: "A task management system with reminders, notes, and calendar view. Features CRUD operations for tasks and notes using Ruby on Rails MVC architecture with an interactive frontend.",
      tech: ["Ruby", "Ruby on Rails", "HTML", "CSS", "JavaScript", "SQLite", "Git"],
      link: "https://github.com/wjnaby/todo_app",
      type: "Personal Project",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing my skills, projects, and experience. Clean, modern layout with work samples, About section, and easy navigation.",
      tech: ["JavaScript", "React", "JSX", "CSS", "Tailwind CSS", "HTML", "Three.js", "React Three Fiber", "Drei", "Rapier", "Vite", "ESLint", "GitHub Pages"],
      link: "https://github.com/wjnaby/portfolio-website",
      type: "Personal Project",
      image: import.meta.env.BASE_URL + "portfolio.jpeg"
    }
  ];

  const featuredProjectTitles = ['Walk With Me 2026', 'Cafe Ordering System', 'SW Kitchen Bites', 'Portfolio Website'];
  const displayedProjects = showAllProjects
    ? projects
    : featuredProjectTitles.map((title) => projects.find((p) => p.title === title)).filter(Boolean);

  const skills = [
    { 
      category: "Frontend", 
      items: [
        { name: "React", level: "Advanced" },
        { name: "Vue.js", level: "Intermediate" },
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "Bootstrap 5", level: "Advanced" },
        { name: "HTML5", level: "Expert" },
        { name: "CSS", level: "Expert" }
      ]
    },
    { 
      category: "Backend", 
      items: [
        { name: "Ruby", level: "Advanced" },
        { name: "Ruby on Rails", level: "Advanced" },
        { name: "PHP", level: "Intermediate" },
        { name: "Laravel", level: "Advanced" },
        { name: "Node.js", level: "Advanced" },
        { name: "Express", level: "Intermediate" },
        { name: "Hotwire/Turbo", level: "Intermediate" }
      ]
    },
    { 
      category: "Database", 
      items: [
        { name: "MySQL", level: "Advanced" },
        { name: "PostgreSQL", level: "Intermediate" }
      ]
    },
    { 
      category: "Tools", 
      items: [
        { name: "Git", level: "Expert" },
        { name: "GitHub", level: "Expert" },
        { name: "VS Code", level: "Expert" },
        { name: "Vite", level: "Advanced" },
        { name: "DBeaver", level: "Intermediate" }
      ]
    }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Intro Screen */}
      {showIntro && (
        <IntroScreen onEnter={handleEnterPortfolio} isExiting={isIntroExiting} />
      )}

      {/* Main Portfolio - hero animations run when this becomes visible (after Enter Portfolio); bg transparent so body gradient shows */}
      <div 
        className={`min-h-screen transition-all duration-700 ease-in-out bg-transparent ${darkMode ? 'text-white' : 'text-dpurple-light'} ${
          portfolioVisible ? 'opacity-100 hero-enter' : 'opacity-0'
        }`}
        style={{ visibility: showIntro && !isIntroExiting ? 'hidden' : 'visible' }}
      >
      {/* Particle Trail Cursor */}
      <ParticleCursor />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-dblack/95 border-b border-dpurple-dark/50' : 'bg-dblack-800/95 border-b border-dpurple-dark/30'} backdrop-blur-md shadow-lg shadow-black/20`} aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-dpurple-glow to-dpurple-accent bg-clip-text text-transparent animate-pulse-slow hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-dpurple-glow rounded"
              aria-label="Go to home"
            >
              JW
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 relative py-1 ${
                    activeSection === section
                      ? 'text-dpurple-glow font-medium'
                      : darkMode ? 'text-dpurple-light/80 hover:text-white' : 'text-dpurple-light/90 hover:text-white'
                  }`}
                  aria-current={activeSection === section ? 'true' : undefined}
                >
                  {section}
                  {activeSection === section && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-dpurple-accent rounded-full transition-all duration-300 animate-expand" aria-hidden />
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 ${darkMode ? 'bg-dpurple-dark hover:bg-dpurple-mid text-dpurple-light' : 'bg-dpurple-dark/80 hover:bg-dpurple-mid text-dpurple-light'}`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 ${darkMode ? 'bg-dpurple-dark hover:bg-dpurple-mid text-dpurple-light' : 'bg-dpurple-dark/80 hover:bg-dpurple-mid text-dpurple-light'}`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 text-dpurple-light hover:text-white"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-dblack-700 border-t border-dpurple-dark/50 animate-slide-down"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((section, idx) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-3 px-2 rounded-lg transition-colors animate-fade-in ${
                    activeSection === section ? 'text-dpurple-glow font-medium bg-dpurple-dark/50' : 'text-dpurple-light hover:text-dpurple-glow hover:bg-dpurple-dark/30'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  aria-current={activeSection === section ? 'true' : undefined}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <HeroSection
        darkMode={darkMode}
        scrollToSection={scrollToSection}
        parallaxOffset={parallaxOffset}
        ProfileCard={ProfileCard}
      />

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className={`py-20 px-4 transition-all duration-700 relative overflow-hidden ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } bg-transparent`}
      >
        <div className="max-w-6xl mx-auto relative z-10 rounded-2xl border border-dpurple-dark/50 bg-dblack-800/40 shadow-[0_0_40px_-10px_rgba(124,58,237,0.25)] backdrop-blur-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Part 1: Words */}
            <div className="about-part about-part-words flex-1 min-w-0 p-8 sm:p-10 lg:p-12 text-left">
              <h2 className="text-4xl font-bold text-white mb-6 animate-slide-in-bottom">About Me</h2>
              <p className={`text-white/95 text-lg leading-relaxed mb-4 ${aboutVisible ? 'animate-slide-in-bottom' : ''}`}>
                I'm a full-stack developer passionate about building modern, high-performance applications with an intuitive user experience. I enjoy working with the latest technologies like Artificial Intelligence, Machine Learning, and cloud-based development, blending creativity with precision to deliver impactful solutions.
              </p>
              <p className={`text-white/90 text-lg leading-relaxed mb-6 ${aboutVisible ? 'animate-slide-in-bottom' : ''}`} style={{ animationDelay: '80ms' }}>
                With experience across multiple completed projects, I'm committed to writing clean code and creating solutions that make a difference.
              </p>
              <p className={`text-dpurple-glow/90 italic text-base ${aboutVisible ? 'animate-slide-in-bottom' : ''}`} style={{ animationDelay: '150ms' }}>
                Working with heart, creating with mind.
              </p>
            </div>
            {/* Part 2: Lanyard */}
            <div className="about-part about-part-lanyard flex-shrink-0 flex items-center justify-center min-w-[280px] p-6 sm:p-8 lg:border-l border-dpurple-dark/40">
              <div className="lanyard-wrapper lanyard-about w-full">
                {aboutVisible && (
                  <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={skillsRef}
        className={`py-16 px-4 transition-all duration-700 relative overflow-hidden ${
          skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } bg-transparent`}
      >
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        {/* Floating code symbols */}
        <div className="absolute top-16 left-[10%] text-4xl font-mono text-dpurple-dark animate-float">&lt;/&gt;</div>
        <div className="absolute bottom-16 right-[10%] text-3xl font-mono text-dpurple-dark animate-float-delayed">{ }</div>
        <div className="absolute top-1/2 left-[5%] text-2xl font-mono text-dpurple-dark animate-float" style={{ animationDelay: '0.5s' }}>#</div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-3 text-center">Skills & Technologies</h2>
          <p className="text-center text-sm mb-8 text-white">
            Hover over a skill to see my proficiency level
          </p>
          
          {/* Compact Landscape Skills Layout */}
          <div className="space-y-3">
            {skills.map((skillGroup, idx) => (
              <div 
                key={idx} 
                className={`px-4 py-3 rounded-xl transform transition-all duration-500 ${
                  skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${
                  darkMode 
                    ? 'bg-dblack-700 hover:shadow-purple-glow border border-dpurple-dark/50' 
                    : 'bg-dblack-700 shadow-lg hover:shadow-purple-glow border border-dpurple-dark/30'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Category Label - Compact */}
                  <div className="flex items-center gap-2 sm:min-w-[120px] sm:border-r sm:pr-4 sm:border-dpurple-dark/50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      idx === 0 ? 'bg-dpurple-accent/25' : 
                      idx === 1 ? 'bg-dpurple-glow/25' : 
                      idx === 2 ? 'bg-dpurple-mid/40' :
                      'bg-dpurple-light/20'
                    }`}>
                      {idx === 0 && (
                        <svg className="w-4 h-4 text-dpurple-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg className="w-4 h-4 text-dpurple-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg className="w-4 h-4 text-dpurple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg className="w-4 h-4 text-dpurple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {skillGroup.category}
                    </h3>
                  </div>
                  
                  {/* Skills - Compact Horizontal Flow */}
                  <div className="flex-1 flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <SkillButton
                        key={i}
                        skill={skill.name}
                        level={skill.level}
                        index={idx * skillGroup.items.length + i}
                        visible={skillsVisible}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section 
        id="education" 
        ref={educationRef}
        className={`py-20 px-4 transition-all duration-700 relative overflow-hidden ${
          educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } bg-transparent`}
      >
        {/* Decorative elements */}
        <div className="absolute top-20 right-[15%] w-24 h-24 bg-gradient-to-br from-dpurple-accent/20 to-dpurple-glow/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-[15%] w-20 h-20 bg-gradient-to-br from-dpurple-glow/20 to-dpurple-mid/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        {/* Graduation cap icon */}
        <div className="absolute top-24 left-[8%] text-dpurple-dark">
          <svg className="w-12 h-12 animate-float" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        </div>
        {/* Book icon */}
        <div className="absolute bottom-24 right-[8%] text-dpurple-dark">
          <svg className="w-10 h-10 animate-float-delayed" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
          </svg>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center">Education</h2>
          <div className="max-w-3xl mx-auto space-y-8">

            {/* First Education Card */}
            <div
              className={`rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:rotate-1 ${
                educationVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              } ${
                darkMode
                  ? 'bg-dblack-700 hover:ring-2 hover:ring-dpurple-accent/30 hover:shadow-purple-glow border border-dpurple-dark/40'
                  : 'bg-dblack-700 shadow-lg hover:ring-2 hover:ring-dpurple-accent/30 hover:shadow-purple-glow border border-dpurple-dark/30'
              }`}
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Bachelor of Computer Science
                  </h3>
                  <p className="text-white text-lg mb-2">
                    Universiti Teknologi MARA (UiTM) Machang
                  </p>
                  <p className="text-white">
                    Graduation: 2023
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-white">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Calculus', 'Introduction to Web and Mobile Application', 'Computer Organization', 'Data Structure','Discrete Mathematics','Interactive Multimedia'].map(
                    (course, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer ${
                          darkMode
                            ? 'bg-dpurple-dark text-white hover:bg-dpurple-accent hover:text-white'
                            : 'bg-dpurple-dark text-white hover:bg-dpurple-accent hover:text-white'
                        }`}
                      >
                        {course}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Second Education Card */}
            <div
              className={`rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 ${
                educationVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              } ${
                darkMode
                  ? 'bg-dblack-700 hover:ring-2 hover:ring-dpurple-accent/30 hover:shadow-purple-glow border border-dpurple-dark/40'
                  : 'bg-dblack-700 shadow-lg hover:ring-2 hover:ring-dpurple-accent/30 hover:shadow-purple-glow border border-dpurple-dark/30'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Bachelor of Computer Science
                  </h3>
                  <p className="text-white text-lg mb-2">
                    Universiti Teknologi MARA (UiTM) Shah Alam
                  </p>
                  <p className="text-white">
                    Expected Graduation: 2026
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-white">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Data Database Design and Development',
                    'Data Communication and Networking',
                    'Artificial Intelligence Algorithms',
                    'Database Systems',
                    'Software Engineering',
                    'Object-Oriented Programming',
                  ].map((course, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer ${
                        darkMode
                          ? 'bg-dpurple-dark text-white hover:bg-dpurple-accent hover:text-white'
                          : 'bg-dpurple-dark text-white hover:bg-dpurple-accent hover:text-white'
                      }`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={projectsRef}
        className={`py-16 px-4 transition-all duration-700 relative overflow-hidden ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } bg-transparent`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dpurple-accent/60 via-dpurple-glow/50 to-dpurple-mid/60" />
        <div className="absolute top-20 left-[5%] w-40 h-40 bg-dpurple-accent/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-[5%] w-48 h-48 bg-dpurple-glow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Floating shapes */}
        <div className="absolute top-32 right-[10%] w-4 h-4 bg-dpurple-accent/25 rounded rotate-45 animate-float" />
        <div className="absolute bottom-32 left-[10%] w-3 h-3 bg-dpurple-glow/25 rounded-full animate-float-delayed" />
        <div className="absolute top-1/2 left-[3%] w-2 h-8 bg-dpurple-mid/20 rounded animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 group ${
                  projectsVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                } backdrop-blur-xl border shadow-lg ${
                  darkMode
                    ? 'bg-white/5 border-white/10 hover:border-dpurple-accent/40 hover:shadow-purple-glow'
                    : 'bg-white/20 border-white/20 hover:border-dpurple-accent/50 hover:shadow-xl'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative h-44 overflow-hidden rounded-t-xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md bg-white/15 border border-white/20 text-dpurple-light">
                    {project.type}
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-dpurple-glow transition-colors">{project.title}</h3>
                  <p className="mb-3 text-sm text-white/90 leading-snug line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-dpurple-accent to-dpurple-glow text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
                    {project.githubLink ? (
                      <>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-dpurple-glow hover:text-dpurple-light transition-colors group/link"
                        >
                          Live
                          <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-dpurple-glow hover:text-dpurple-light transition-colors group/link"
                        >
                          GitHub
                          <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      </>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-dpurple-glow hover:text-dpurple-light transition-colors group/link"
                      >
                        {project.isLive ? 'View Live' : 'View on GitHub'}
                        <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {projects.length > 4 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="px-8 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 min-w-[240px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-dblack-900 bg-gradient-to-r from-dpurple-accent to-dpurple-glow border-2 border-dpurple-light/30 shadow-lg hover:shadow-purple-glow hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
              >
                {showAllProjects ? 'Show Less' : 'View More Projects'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`py-20 px-4 transition-all duration-700 relative overflow-hidden ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } bg-transparent`}
      >
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dpurple-accent/8 via-transparent to-dpurple-glow/8" />
        {/* Decorative elements */}
        <div className="absolute top-10 left-[10%] w-32 h-32 bg-gradient-to-br from-dpurple-accent/15 to-dpurple-glow/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-[10%] w-40 h-40 bg-gradient-to-br from-dpurple-glow/15 to-dpurple-mid/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        {/* Envelope icon */}
        <div className="absolute top-20 right-[12%] text-dpurple-dark">
          <svg className="w-16 h-16 animate-float" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        {/* Chat bubble */}
        <div className="absolute bottom-24 left-[12%] text-dpurple-dark">
          <svg className="w-12 h-12 animate-float-delayed" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        {/* Small dots */}
        <div className="absolute top-1/3 left-[5%] w-2 h-2 bg-dpurple-glow/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-[5%] w-2 h-2 bg-dpurple-accent/50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-2xl mx-auto relative z-10 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
          <p className="text-base mb-8 text-center max-w-xl mx-auto text-white">
            Feel free to reach out! Whether you have a question or just want to drop a message,
            I'll do my best to get back to you.
          </p>
          
          {/* Contact Details */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Location */}
            <div className={`text-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
              darkMode ? 'bg-dblack-700 border border-dpurple-dark/40' : 'bg-dblack-700 border border-dpurple-dark/30 shadow-purple-glow'
            }`}>
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-dpurple-accent/20">
                  <MapPin size={20} className="text-dpurple-glow" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-white">Location</h3>
              <p className="text-sm text-white">
                Shah Alam, Selangor, Malaysia
              </p>
            </div>

            {/* Email */}
            <div className={`text-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
              darkMode ? 'bg-dblack-700 border border-dpurple-dark/40' : 'bg-dblack-700 border border-dpurple-dark/30 shadow-purple-glow'
            }`}>
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-dpurple-glow/20">
                  <Mail size={20} className="text-dpurple-glow" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-white">Email</h3>
              <a 
                href="mailto:wanfatinnabilah14@gmail.com"
                className="text-sm text-white hover:text-dpurple-glow transition-colors"
              >
                wanfatinnabilah14@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className={`text-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
              darkMode ? 'bg-dblack-700 border border-dpurple-dark/40' : 'bg-dblack-700 border border-dpurple-dark/30 shadow-purple-glow'
            }`}>
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-dpurple-mid/30">
                  <Phone size={20} className="text-dpurple-light" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-white">Phone</h3>
              <a 
                href="https://wa.me/601129858921"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-dpurple-glow transition-colors"
              >
                +60 1129858921 (WhatsApp)
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-6">
            {[
              { icon: Github, link: "https://github.com/wjnaby", delay: 0 },
              { icon: Linkedin, link: "https://linkedin.com/in/yourusername", delay: 150 },
              { icon: Mail, link: "mailto:wanfatinnabilah14@gmail.com", delay: 300 }
            ].map(({ icon: Icon, link, delay }, idx) => (
              <a
                key={idx}
                href={link}
                target={idx < 2 ? "_blank" : undefined}
                rel={idx < 2 ? "noopener noreferrer" : undefined}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-12 active:scale-95 ${
                  contactVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                } ${
                  darkMode ? 'bg-dpurple-dark hover:bg-dpurple-accent hover:shadow-purple-glow text-dpurple-light' : 'bg-dpurple-dark hover:bg-dpurple-accent hover:text-white hover:shadow-purple-glow text-dpurple-light'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <div className="flex justify-center">
            <a
              href={import.meta.env.BASE_URL + "resume.pdf"}
              download
              className={`px-8 py-3 bg-gradient-to-r from-dpurple-accent to-dpurple-glow text-white rounded-lg font-semibold hover:shadow-purple-glow transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 ${
                contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-transparent border-t border-dpurple-dark/40">
        <p className="text-white">
          © 2026 Fatin. 
        </p>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-dpurple-accent to-dpurple-glow text-white shadow-purple-glow hover:shadow-purple-glow-lg transform hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-slow {
          0%, 100% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
          }
          50% {
            transform: translateX(-50%) translateY(-50%) rotate(180deg);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes letter-pop {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          50% {
            transform: translateY(-5px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(30px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-bottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes expand {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Hero: slide up only – runs when .hero-enter is added (after Enter Portfolio) */
        @keyframes hero-slide-up {
          from {
            transform: translateY(28px);
            opacity: 1;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .hero-block {
          opacity: 1;
        }

        /* Start in "down" position; animation runs only when portfolio is entered */
        .hero-slide-up {
          transform: translateY(28px);
          opacity: 1;
        }

        .hero-enter .hero-slide-up {
          animation: hero-slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-line {
          display: block;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-letter-pop {
          animation: letter-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-in {
          opacity: 0;
        }
        .hero-enter .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }

        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        .transform,
        .transition-transform {
          will-change: transform;
        }

        .transition-opacity {
          will-change: opacity;
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      </div>
    </>
  );
}