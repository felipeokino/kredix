import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../../components/custom/card';
import { Dashboard } from '../../components/custom/dashboard';
import { DrawerComponent } from '../../components/custom/drawer';
import { Balance } from './components/balance';
import { History } from './components/history';
import { TransferForm } from './components/transfer-form';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex w-full gap-6 max-md:flex-col">
        <Card>
          <Balance />
        </Card>
        <DrawerComponent trigger={(
          <Card onClick={handleOpenModal} className='w-1/3 max-md:w-full bg-primary cursor-pointer flex flex-col items-start justify-between'>
            <div className='size-10 bg-accent rounded-md flex items-center justify-center'>
              <SendHorizonal className='text-primary' />
            </div>
            <span className='text-kredix-text'>Transfer</span>
            <p className='text-xs text-kredix-text pl-2'>Move your funds quickly and securely</p>
          </Card>
        )} title="Transfer Funds" isOpen={isModalOpen} onClose={handleCloseModal}>
          <TransferForm callback={handleCloseModal} />
        </DrawerComponent>

      </div>
      <div className="flex w-full gap-6 max-lg:flex-col">
        <Card className='lg:max-w-3/5'>
          <Dashboard />
        </Card>
        <Card className='w-full flex flex-col items-start justify-between max-md:w-full'>
          <History />
        </Card>
      </div>

    </div>
  );
}