'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { BarChart2, CheckSquare, Home, Book, Bot, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 
  const [userToggled, setUserToggled] = useState(false); 
  const navRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => pathname === path;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setUserToggled(true); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
        setUserToggled(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!userToggled && isOpen) {
      setIsOpen(false);
    }
  }, [pathname, userToggled, isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setUserToggled(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setIsOpen(false);
            setUserToggled(false);
          }}
        />
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1b1b1b] border-t border-gray-200 px-4 py-2 z-50">
        <ul className="flex justify-around">
          <NavItem to="/" icon={<Home />} label="Dashboard" isActive={isActive('/')} isMobile />
          <NavItem to="/tasks" icon={<CheckSquare />} label="Tasks" isActive={isActive('/tasks')} isMobile />
          <NavItem to="/subjects" icon={<Book />} label="Subjects" isActive={isActive('/subjects')} isMobile />
          <NavItem to="/matrix" icon={<BarChart2 />} label="Matrix" isActive={isActive('/matrix')} isMobile />
          <NavItem to="/assistant" icon={<Bot />} label="Helping Hand" isActive={isActive('/assistant')} isMobile />
          <NavItem to="/yourself" icon={<User />} label="See Yourself" isActive={isActive('/yourself')} isMobile />
        </ul>
      </nav>

      <nav 
        ref={navRef}
        className={`hidden md:block fixed top-0 left-0 h-screen bg-[#1b1b1b] border-r border-gray-200 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
          {isOpen && (
            <h1 className="text-2xl font-bold text-amber-400 transition-opacity duration-200">
              JustMe
            </h1>
          )}
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg hover:bg-neutral-800 text-gray-400 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="py-4">
          <ul className="space-y-2 px-3">
            <NavItem 
              to="/" 
              icon={<Home />} 
              label="Dashboard" 
              isActive={isActive('/')} 
              isOpen={isOpen}
              onNavigate={() => !userToggled && setIsOpen(false)}
            />
            <NavItem 
              to="/tasks" 
              icon={<CheckSquare />} 
              label="Tasks" 
              isActive={isActive('/tasks')} 
              isOpen={isOpen}
              onNavigate={() => !userToggled && setIsOpen(false)}
            />
            <NavItem 
              to="/subjects" 
              icon={<Book />} 
              label="Subjects" 
              isActive={isActive('/subjects')} 
              isOpen={isOpen}
              onNavigate={() => !userToggled && setIsOpen(false)}
            />
            <NavItem 
              to="/matrix" 
              icon={<BarChart2 />} 
              label="Matrix" 
              isActive={isActive('/matrix')} 
              isOpen={isOpen}
              onNavigate={() => !userToggled && setIsOpen(false)}
            />
            <NavItem 
              to="/assistant" 
              icon={<Bot />} 
              label="Helping Hand" 
              isActive={isActive('/assistant')} 
              isOpen={isOpen}
              onNavigate={() => !userToggled && setIsOpen(false)}
            />
            <NavItem 
              to="/yourself" 
              icon={<User />} 
              label="See Yourself" 
              isActive={isActive('/yourself')} 
              isOpen={isOpen}
              onNavigate={() => !userToggled && setIsOpen(false)}
            />
          </ul>
        </div>

        {!isOpen && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-amber-400 rounded-full opacity-50"></div>
          </div>
        )}
      </nav>
    </>
  );
}

function NavItem({ to, icon, label, isActive, isOpen, isMobile, onNavigate }: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isOpen?: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
}) {
  if (isMobile) {
    return (
      <li>
        <Link
          href={to}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${
            isActive ? 'text-amber-500' : 'text-gray-400 hover:text-amber-400'
          }`}
        >
          {icon}
          <span className="text-xs">{label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="relative group">
      <Link
        href={to}
        onClick={onNavigate}
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'text-amber-500 bg-amber-500/10 border-l border-amber-500' 
            : 'text-gray-400 hover:bg-neutral-800 hover:text-amber-400 hover:border-l hover:border-amber-400/50'
        }`}
      >
        <div className="flex-shrink-0">
          {icon}
        </div>
        {isOpen && (
          <span className="truncate transition-opacity duration-200">{label}</span>
        )}
        
        {!isOpen && (
          <div className="absolute left-full ml-3 px-3 py-2 bg-neutral-900 border border-gray-600 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-60 pointer-events-none">
            {label}
            <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-neutral-900"></div>
          </div>
        )}
      </Link>
    </li>
  );
}