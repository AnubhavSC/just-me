'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, CheckSquare, Home, Book, Bot, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1b1b1b] border-t border-gray-200 px-4 py-2 z-30 md:top-0 md:bottom-auto md:right-auto md:h-screen md:w-64 md:border-t-0 md:border-r">
      <div className="hidden md:flex md:items-center md:h-20 md:px-4">
        <h1 className="text-2xl font-bold text-amber-400">JustMe</h1>
      </div>
      
      <ul className="flex justify-around md:flex-col md:space-y-2 md:mt-8">
        <NavItem to="/" icon={<Home />} label="Dashboard" isActive={isActive('/')} />
        <NavItem to="/tasks" icon={<CheckSquare />} label="Tasks" isActive={isActive('/tasks')} />
        <NavItem to="/subjects" icon={<Book />} label="Subjects" isActive={isActive('/subjects')} />
        <NavItem to="/matrix" icon={<BarChart2 />} label="Matrix" isActive={isActive('/matrix')} />
        <NavItem to="/assistant" icon={<Bot />} label="Helping Hand" isActive={isActive('/assistant')} />
        <NavItem to="/yourself" icon={<User />} label="See Yourself" isActive={isActive('/yourself')} />
      </ul>
    </nav>
  );
}

function NavItem({ to, icon, label, isActive }: { 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean 
}) {
  return (
    <li>
      <Link
        href={to}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors
          ${isActive 
            ? 'text-amber-500' 
            : 'text-gray-400 hover:bg-neutral-800'}`}
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </Link>
    </li>
  );
}