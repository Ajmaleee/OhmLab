import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/resistor-color-code', label: 'Resistor Color Code Calculator' },
    { path: '/series-resistance', label: 'Series Resistance Calculator' },
    { path: '/parallel-resistance', label: 'Parallel Resistance Calculator' },
    { path: '/voltage-divider', label: 'Voltage Divider Calculator' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-teal-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-teal-700 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold tracking-wide">
            OhmLab
          </Link>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
              <nav className="mt-12 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg border-l-4 transition-all ${
                      isActive(link.path)
                        ? 'bg-teal-50 border-teal-600 text-teal-600 font-semibold'
                        : 'border-transparent hover:bg-gray-50 hover:border-teal-600 text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold text-teal-400 mb-4">OhmLab</h4>
              <p className="text-gray-300 mb-2">
                Fast resistor & electronics calculators for students
              </p>
              <p className="text-sm text-gray-400">Created by Ajmal Ali A</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-teal-400 mb-4">Calculators</h4>
              <div className="space-y-2">
                <Link to="/resistor-color-code" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Resistor Color Code
                </Link>
                <Link to="/series-resistance" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Series Resistance
                </Link>
                <Link to="/parallel-resistance" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Parallel Resistance
                </Link>
                <Link to="/voltage-divider" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Voltage Divider
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-teal-400 mb-4">Information</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
                <Link to="/privacy-policy" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/disclaimer" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Disclaimer
                </Link>
                <Link to="/terms" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 OhmLab. All rights reserved. | Kerala, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
