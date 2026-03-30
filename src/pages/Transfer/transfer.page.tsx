import { useQuery } from '@tanstack/react-query';
import { Card } from "../../components/custom/card";
import useWalletStore from "../../store/wallet.store";
import { formatCurrency } from "../../utils/number";
import { History } from "./components/history";
import { TransferForm } from "./components/transfer-form";
import { Balance } from './components/balance';

export default function Transfer() {


  return (
    <div className="flex w-full gap-6 p-6">
      <section className="flex flex-col gap-6 w-full">
        <Card>
         <Balance />
        </Card>
        <Card>
          <History />
        </Card>
      </section>
      <section className="w-full">
        <Card>
          <TransferForm />
        </Card>
      </section>
    </div>
  );
}
