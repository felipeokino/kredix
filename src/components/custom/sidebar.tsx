import LogoFull from '@/assets/logo-full.png';
import { LayoutDashboard, LogOut, Menu, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { cn } from '../../lib/utils';
import useAuthStore from "../../store/auth.store";
import { Button } from '../ui/button';
import { Divider } from '../ui/divider';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';

type SidebarItemProps = {
  label: string;
  active?: boolean;
  icon?: React.ComponentType;
} & React.ComponentPropsWithoutRef<'a'>;
const SidebarItem = ({ label, href, active, icon: Icon, ...props }: SidebarItemProps) => (
  <Link {...props} to={href || '#'} data-active={active} className={cn('w-full py-2 px-4 text-left text-kredix-text hover:text-white flex gap-2', {
    'bg-primary/20 border-r-3 border-accent font-semibold transition-all text-accent bg-linear-90 from-primary/30 to-neutral-900 rounded-l-sm': active,
  })} >
    {Icon && <Icon  />}
    {label}
  </Link>
);

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const path = useLocation();
  const activePage = path.pathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleNavigation = () => {
    setDrawerOpen(false);
  }

  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div className="mb-6">
        <img src={LogoFull} alt="Kredix Logo" className="w-full" />
      </div>
      <Divider />
      <nav>
        <ul className="space-y-4 flex flex-col">
          <SidebarItem 
            label="Dashboard" 
            href="/" 
            active={activePage === '/'} 
            icon={LayoutDashboard} 
            onClick={isMobile ? handleNavigation : undefined} 
          />
          <SidebarItem 
            label="Admin" 
            href="/admin" 
            active={activePage === '/admin'} 
            icon={TrashIcon} 
            onClick={isMobile ? handleNavigation : undefined} 
          />
        </ul>
      </nav>
      <section className="mt-auto pt-4 border-neutral-700 flex flex-col gap-4">
        <Divider />
        <div className='flex items-center gap-4 bg-secondary/20 p-2 rounded-md'>
          <div className='size-8 rounded-full bg-accent flex items-center justify-center'>
            <span className='text-md text-white font-bold'>{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <p className="text-kredix-text text-sm">{user?.name}</p>
        </div>
        <Button variant={'destructive'} className='hover:cursor-pointer' onClick={logout}>
          Logout <LogOut />
        </Button>
      </section>
    </>
  );

  return (
    <>
      <div className="min-w-64 max-w-64 bg-neutral-800/20 h-screen p-4 border flex flex-col max-lg:hidden">
        <SidebarContent />
      </div>
      <div className='w-full bg-neutral-800/20 h-16 p-4 border flex items-center justify-between lg:hidden'>
        <div>
          <img src={LogoFull} alt="Kredix Logo" className="w-24" />
        </div>
        <Drawer direction='left' open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild><Menu className='text-kredix-text' size={32} /></DrawerTrigger>
          <DrawerContent className='bg-neutral-900 text-kredix-text p-4'>
            <SidebarContent isMobile />
          </DrawerContent>
        </Drawer>
        
      </div>
    </>
  );
}