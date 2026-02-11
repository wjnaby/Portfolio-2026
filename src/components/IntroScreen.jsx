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

function IntroScreen({ onEnter, isExiting }) {
  const welcomeText = "Welcome to My Portfolio";
  const nameText = "Wan Fatin Nabilah";

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

        {/* Welcome text with letter animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4" style={{ fontFamily: "'Fira Code', monospace" }}>
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
