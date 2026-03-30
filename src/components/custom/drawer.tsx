import { useIsMobile } from '../../hooks/useIsMobile';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer';

export const DrawerComponent = ({ children, trigger, title, isOpen, onClose }: { children: React.ReactNode, trigger: React.ReactNode, title: string; isOpen: boolean, onClose: () => void }) => {
  const isMobile = useIsMobile()

  const handleInteractOutside = (event: Event) => {
    const confirmClose = window.confirm("Are you sure you want to cancel?");

    if (!confirmClose) {
      event.preventDefault();
    } else {
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='bg-kredix-bg p-6 h-screen' onInteractOutside={handleInteractOutside}>
        <DrawerTitle className='text-kredix-text text-2xl mb-8!'>{title}</DrawerTitle>
        {children}
      </DrawerContent>
    </Drawer>
  );
};