import LogoFull from '@/assets/logo-full.png';
import { LayoutDashboard, LogOut, TrashIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '../../lib/utils';
import useAuthStore from "../../store/auth.store";
import { Button } from '../ui/button';
import { Divider } from '../ui/divider';

const SidebarItem = ({ label, href, active, icon: Icon }: { label: string; href: string; active?: boolean; icon?: React.ComponentType }) => (
  <Link to={href} data-active={active} className={cn('w-full py-2 px-4 text-left text-kredix-text hover:text-white flex gap-2', {
    'bg-primary/20 border-r-3 border-accent font-semibold transition-all text-accent bg-linear-90 from-primary/30 to-neutral-900 rounded-l-sm': active,
  })}>
    {Icon && <Icon  />}
    {label}
  </Link>
);

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const path = useLocation();
  const activePage = path.pathname;

  return (
    <div className="w-64 bg-neutral-800/20 h-screen p-4 border flex flex-col">
      <div className="mb-6">
        <img src={LogoFull} alt="Kredix Logo" className="w-full" />
      </div>
      <Divider />
      <nav>
        <ul className="space-y-4 flex flex-col">
          <SidebarItem label="Dashboard" href="/" active={activePage === '/'} icon={LayoutDashboard} />
          <SidebarItem label="Transfer" href="/transfer" active={activePage === '/transfer'} icon={TrashIcon} />
        </ul>
      </nav>
      <section className="mt-auto pt-4 border-neutral-700 flex flex-col gap-4">
        <Divider />
        <div className='flex items-center gap-4 bg-secondary/20 p-2 rounded-md'>
          <div className='size-8 rounded-full bg-accent flex items-center justify-center'>
            <span className='text-md text-white font-bold'>{user?.name.charAt(0).toUpperCase()}</span>
          </div>
          <p className="text-kredix-text text-sm">{user?.name}</p>
        </div>
        <Button variant={'destructive'} className='hover:cursor-pointer' onClick={logout}>Logout <LogOut /></Button>
      </section>
    </div>
  );
}