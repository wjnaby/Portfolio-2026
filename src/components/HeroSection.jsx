import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

// WhatsApp icon (Lucide doesn't include it)
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Update hrefs with your real links (e.g. WhatsApp: https://wa.me/60XXXXXXXXX, Email: mailto:you@example.com)
const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/wjnaby', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/wjnaby', icon: Linkedin },
  { name: 'WhatsApp', href: 'https://wa.me/60XXXXXXXXX', icon: WhatsAppIcon },
  { name: 'Email', href: 'mailto:your.email@example.com', icon: Mail },
];

export default function HeroSection({ darkMode, scrollToSection, parallaxOffset = 0, ProfileCard }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden bg-transparent">
      {/* Subtle overlays: soft teal tint left, soft purple right — low brightness, minimal */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_30%,rgba(13,45,40,0.2),transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_60%,rgba(30,27,46,0.25),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-dpurple-deep/30"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-6xl mx-auto z-10 flex flex-col md:flex-row items-center gap-12 md:gap-12 py-8">
        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left hero-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-dpurple-light to-white bg-clip-text text-transparent hero-slide-up">
            Hi, I'm Wan Fatin Nabilah
          </h1>
          <p
            className="text-xl sm:text-2xl font-semibold mb-6 text-dpurple-glow hero-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            Junior Full Stack Developer
          </p>
          <div className="mb-8 max-w-xl mx-auto md:mx-0">
            <p className="text-sm sm:text-base leading-relaxed text-white hero-slide-up" style={{ animationDelay: '0.2s' }}>
              I craft beautiful, scalable, and high-performance web applications using modern technologies across the full stack. 
            </p>
          </div>

          {/* Social links – above buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 hero-slide-up" style={{ animationDelay: '0.35s' }}>
            {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dpurple-accent ${
                  darkMode
                    ? 'bg-dblack-700/90 border-dpurple-dark text-dpurple-light hover:border-dpurple-accent hover:text-dpurple-glow hover:shadow-purple-glow'
                    : 'bg-dblack-700/90 border-dpurple-dark text-dpurple-light hover:border-dpurple-accent hover:text-dpurple-glow hover:shadow-purple-glow'
                }`}
                aria-label={name}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3.5 bg-gradient-to-r from-dpurple-accent to-dpurple-glow text-white rounded-xl font-semibold shadow-purple-glow hover:shadow-purple-glow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: '500ms' }}
            >
              View Projects
            </button>
            <a
              href={import.meta.env.BASE_URL + 'resume.pdf'}
              download
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 animate-bounce-in border ${
                darkMode
                  ? 'bg-dblack-700/80 border-dpurple-dark text-white hover:bg-dpurple-dark/80 hover:border-dpurple-glow hover:shadow-purple-glow'
                  : 'bg-dblack-700/80 border-dpurple-dark text-white hover:bg-dpurple-dark/80 hover:border-dpurple-glow hover:shadow-purple-glow backdrop-blur-sm'
              }`}
              style={{ animationDelay: '650ms' }}
            >
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3.5 rounded-xl font-semibold border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 animate-bounce-in ${
                darkMode
                  ? 'border-dpurple-dark text-dpurple-light hover:border-dpurple-accent hover:bg-dblack-700/80 hover:text-dpurple-glow'
                  : 'border-dpurple-dark text-dpurple-light hover:border-dpurple-accent hover:bg-dblack-700/80 hover:text-dpurple-glow'
              }`}
              style={{ animationDelay: '800ms' }}
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right: Profile card / image */}
        {ProfileCard && (
          <div
            className="flex-1 flex justify-center md:justify-end w-full max-w-sm shrink-0 hero-slide-up"
            style={{ animationDelay: '0.25s' }}
          >
            <ProfileCard
              name="Wan Fatin Nabilah"
              title="Junior Full Stack Developer"
              handle="wjnaby"
              status="Online"
              contactText="Contact Me"
              avatarUrl={import.meta.env.BASE_URL + 'profile-card.jpeg'}
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => scrollToSection('contact')}
              behindGlowEnabled={false}
              innerGradient="linear-gradient(145deg,#1e1b2e 0%,#2d2a4a 50%,#12121a 100%)"
              codeDesign="WFN"
            />
          </div>
        )}
      </div>
    </section>
  );
}
