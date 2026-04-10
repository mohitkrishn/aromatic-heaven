import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {

  const navigate = useNavigate();

  const handleNavigateAndScroll = async (path) => {
    await navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-black border-t border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer Content - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* 1. Brand Section */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-wider text-amber-500 font-['Lexend_Deca']">
                AROMATIC<br />
                <span className="text-white text-sm font-light tracking-[0.2em]">HEAVEN</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-['Funnel_Sans'] max-w-xs">
              Experience the ultimate relaxation and rejuvenation. Premium spa treatments tailored to restore your body and mind's natural harmony at your place.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-black transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-black transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-black transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-['Outfit'] font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-amber-500">
              Quick Links
            </h3>
            <ul className="space-y-4 font-['Funnel_Sans']">
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/")}
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/signup")}
                >
                  Sign Up
                </span>
              </li>
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/login")}
                >
                  Login
                </span>
              </li>
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/services")}
                >
                  Our Services
                </span>
              </li>
            </ul>
          </div>

          {/* 3. Popular Services */}
          <div>
            <h3 className="text-white font-['Outfit'] font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-amber-500">
              Top Services
            </h3>
            <ul className="space-y-4 font-['Funnel_Sans']">
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/book-service/6991bde574609476f682725a")}
                >
                  Full Body Tightening Massage
                </span>
              </li>
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/book-service/6991c02f74609476f682725e")}
                >
                  Happy Feet Therapy
                </span>
              </li>
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/book-service/6991bf6c74609476f682725c")}
                >
                  Ultimate Head Champi
                </span>
              </li>
              <li>
                <span
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm cursor-pointer"
                  onClick={() => handleNavigateAndScroll("/book-service/6991c0e474609476f6827262")}
                >
                  Deep Relief Back & Shoulder Rescue
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-white font-['Outfit'] font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-amber-500">
              Get in Touch
            </h3>
            <ul className="space-y-4 font-['Funnel_Sans']">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Spa Avenue, Boring Road,<br />
                  Patna, Bihar 800001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <a href="mailto:hello@aromaticheaven.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  hello@aromaticheaven.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-zinc-800/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-['Funnel_Sans']">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Aromatic Heaven. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-zinc-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-zinc-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;