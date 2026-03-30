import { Button } from '../../components/ui/button';
import useWalletStore from "../../store/wallet.store";

export default function Transfer() {
  const { reset } = useWalletStore();

  return (
    <div className="flex w-full gap-6 p-6">
      <Button onClick={reset}>Reset Account</Button>
    </div>
  );
}
