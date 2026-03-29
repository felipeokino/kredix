import { Card } from "../../components/custom/card";
import useWalletStore from "../../store/wallet.store";
import { formatCurrency } from "../../utils/number";
import { History } from "./components/history";
import { TransferForm } from "./components/transfer-form";

export default function Transfer() {
  const { getBalance } = useWalletStore();


  return (
    <div className="flex w-full gap-6 p-6">
      <section className="flex flex-col gap-6 w-full">
        <Card>
          <div className="flex flex-col w-full items-start gap-4">
            <span className="text-sm text-kredix-text font-semibold mb-4 uppercase">Current Balance</span>
            <p className="text-kredix-text">
              R$
              <span className="text-[70px] text-kredix-text font-semibold mb-4">{formatCurrency(getBalance())}</span>
            </p>
          </div>
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
