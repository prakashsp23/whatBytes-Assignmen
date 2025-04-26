'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Award, Briefcase, Menu, X, ChartNoAxesColumn, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-card fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200  ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Image src={'/logo.jpg'} alt="WhatBytes" width={40} height={40} />
              </div>
              <h1 className="text-xl font-bold">WhatBytes</h1>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-4 p-4">
          <NavItem 
            href="/dashboard" 
            icon={<ChartNoAxesColumn  size={20}/>} 
            label="Dashboard" 
            isActive={pathname === '/dashboard'} 
          />
          <NavItem 
            href="/skill-test" 
            icon={<Award size={20} />} 
            label="Skill Test" 
            isActive={pathname.includes('/skill-test')} 
          />
          <NavItem 
            href="/internship" 
            icon={<StickyNote size={20} />} 
            label="Internship" 
            isActive={pathname === '/internship'} 
          />
        </nav>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-full px-3 py-2 text-lg font-medium transition-colors",
        isActive 
          ? "bg-accent text-blue-600 " 
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}