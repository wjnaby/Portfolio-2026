import React, { useEffect } from 'react';

// Coding icons as SVG components
const CodeBrackets = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const Terminal = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 20z" />
  </svg>
);

const CurlyBraces = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3c-1.5 0-2.5 1-2.5 2v4c0 1-1 2-2 2 1 0 2 1 2 2v4c0 1 1 2 2.5 2M16 3c1.5 0 2.5 1 2.5 2v4c0 1 1 2 2 2-1 0-2 1-2 2v4c0 1-1 2-2.5 2" />
  </svg>
);

const Database = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

const GitBranch = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12m0 0a3 3 0 103 3m-3-3a3 3 0 01-3 3m6-15a3 3 0 100 6 3 3 0 000-6zm12 3a3 3 0 11-6 0 3 3 0 016 0zm-3 3v6m0 0a3 3 0 103 3m-3-3a3 3 0 01-3 3" />
  </svg>
);

const ReactIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
  </svg>
);

// Tech logo icon buttons (like the reference image)
const HTMLIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

const CSSIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z"/>
  </svg>
);

const JSIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
  </svg>
);

const PythonIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.79l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

function IntroScreen({ onEnter, isExiting }) {
  const welcomeText = "Welcome to My Portfolio";
  const nameText = "Wan Fatin Nabilah";

  // Tech logos to display between <Developer> tag and name
  const techLogos = [
    { Icon: HTMLIcon, label: 'HTML', color: '#E34F26' },
    { Icon: JSIcon, label: 'JS', color: '#F7DF1E' },
    { Icon: ReactIcon, label: 'React', color: '#61DAFB' },
  ];

  // Load Google Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Floating coding icons data
  const floatingIcons = [
    { Icon: CodeBrackets, position: 'top-[15%] left-[10%]', delay: '0s', size: 'w-12 h-12 sm:w-16 sm:h-16' },
    { Icon: Terminal, position: 'top-[20%] right-[12%]', delay: '0.5s', size: 'w-10 h-10 sm:w-14 sm:h-14' },
    { Icon: CurlyBraces, position: 'bottom-[25%] left-[8%]', delay: '1s', size: 'w-10 h-10 sm:w-12 sm:h-12' },
    { Icon: Database, position: 'bottom-[20%] right-[10%]', delay: '1.5s', size: 'w-10 h-10 sm:w-14 sm:h-14' },
    { Icon: GitBranch, position: 'top-[40%] left-[5%]', delay: '0.8s', size: 'w-8 h-8 sm:w-10 sm:h-10' },
    { Icon: ReactIcon, position: 'top-[35%] right-[6%]', delay: '1.2s', size: 'w-10 h-10 sm:w-12 sm:h-12' },
    { Icon: CodeBrackets, position: 'bottom-[40%] right-[15%]', delay: '0.3s', size: 'w-8 h-8 sm:w-10 sm:h-10' },
    { Icon: Terminal, position: 'bottom-[35%] left-[15%]', delay: '0.7s', size: 'w-8 h-8 sm:w-10 sm:h-10' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-700 ease-in-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Floating coding icons */}
      {floatingIcons.map(({ Icon, position, delay, size }, index) => (
        <div
          key={index}
          className={`absolute ${position} ${size} text-gray-600/30 animate-float-icon`}
          style={{ animationDelay: delay }}
        >
          <Icon className="w-full h-full" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Code opening tag decoration */}
        <div className="flex justify-center mb-4 animate-fade-in-tag" style={{ fontFamily: "'Fira Code', monospace" }}>
          <span className="text-purple-500/70 text-lg sm:text-xl">&lt;</span>
          <span className="text-blue-400/70 text-lg sm:text-xl">Developer</span>
          <span className="text-purple-500/70 text-lg sm:text-xl">&gt;</span>
        </div>

        {/* Tech Logo Icons Row */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-0 animate-fade-in-logos">
          {techLogos.map(({ Icon, label, color }, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm cursor-default transition-all duration-300 hover:scale-110 hover:border-white/30 animate-logo-pop"
              style={{
                animationDelay: `${0.8 + index * 0.1}s`,
                boxShadow: `0 0 0 0 ${color}00`,
              }}
              title={label}
            >
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110"
                style={{ color }}
              />
              {/* Tooltip */}
              <span
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {label}
              </span>
              {/* Glow ring on hover */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: color, filter: 'blur(4px)' }}
              />
            </div>
          ))}
        </div>

        {/* Welcome text with letter animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {welcomeText.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-3 sm:mr-4">
                {word.split('').map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className="inline-block animate-letter-bounce hover:animate-letter-wave"
                    style={{
                      animationDelay: `${wordIndex * 200 + letterIndex * 50}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        {/* Name with wave animation */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2" style={{ fontFamily: "'Fira Code', monospace" }}>
          {nameText.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-name-wave hover:text-purple-400 transition-colors cursor-default"
              style={{
                animationDelay: `${1200 + index * 60}ms`,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>

        {/* Code closing tag decoration */}
        <div className="flex justify-center mb-10 animate-fade-in-tag-delayed" style={{ fontFamily: "'Fira Code', monospace" }}>
          <span className="text-purple-500/70 text-lg sm:text-xl">&lt;/</span>
          <span className="text-blue-400/70 text-lg sm:text-xl">Developer</span>
          <span className="text-purple-500/70 text-lg sm:text-xl">&gt;</span>
        </div>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="group relative px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 animate-fade-in-intro-button"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {/* Button glow effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2">
            <CodeBrackets className="w-5 h-5" />
            Enter Portfolio
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>

      {/* Intro screen styles */}
      <style>{`
        @keyframes letter-bounce {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.5) rotateX(90deg);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1.1) rotateX(0deg);
          }
          70% {
            transform: translateY(5px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes letter-wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes name-wave {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.05);
          }
          80% {
            transform: translateY(2px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-intro-button {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-25px) rotate(0deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-10px) rotate(-5deg);
            opacity: 0.5;
          }
        }

        @keyframes fade-in-tag {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logo-pop {
          0% {
            opacity: 0;
            transform: scale(0.4) translateY(10px);
          }
          70% {
            opacity: 1;
            transform: scale(1.1) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-letter-bounce {
          opacity: 0;
          animation: letter-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-letter-wave:hover {
          animation: letter-wave 0.4s ease-in-out;
        }

        .animate-name-wave {
          opacity: 0;
          animation: name-wave 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in-intro-button {
          opacity: 0;
          animation: fade-in-intro-button 0.6s ease-out 2.2s forwards;
        }

        .animate-float-icon {
          animation: float-icon 6s ease-in-out infinite;
        }

        .animate-fade-in-tag {
          opacity: 0;
          animation: fade-in-tag 0.5s ease-out 0.2s forwards;
        }

        .animate-fade-in-tag-delayed {
          opacity: 0;
          animation: fade-in-tag 0.5s ease-out 1.8s forwards;
        }

        .animate-fade-in-logos {
          opacity: 0;
          animation: fade-in-tag 0.5s ease-out 0.6s forwards;
        }

        .animate-logo-pop {
          opacity: 0;
          animation: logo-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Hover glow effect for letters */
        .animate-letter-bounce:hover,
        .animate-name-wave:hover {
          animation: glow-pulse 1s ease-in-out infinite;
          color: inherit;
        }
      `}</style>
    </div>
  );
}

export default IntroScreen;