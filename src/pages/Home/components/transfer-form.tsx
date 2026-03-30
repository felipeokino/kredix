import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import useWalletStore from '../../../store/wallet.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { transferSchema, type TransferFormData } from '../../../validators/transfer/transfer.validator';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loading } from '../../../components/custom/loading';
import { currencyMask } from '../../../utils/masks';
import queryClient from '../../../utils/query';
export const TransferForm = ({ callback }: { callback?: () => void }) => {
  const form = useForm({
    defaultValues: {
      recipient: '',
      amount: '',
    },
    resolver: zodResolver(transferSchema)
  });
  const { transfer } = useWalletStore();

  const transferMigrate = useMutation<void, Error, TransferFormData>({
    mutationFn: async (data) => {
      return transfer(data.amount, data.recipient);
    },
    onSuccess: () => {
      form.reset();
      toast.success('Transfer successful');
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      if (callback) {
        callback();
      }
    },
    onError: (error) => {
      toast.error(`Transfer failed: ${error.message}`);
    }
  });
  const onSubmit = (data: TransferFormData) => {
    transferMigrate.mutate(data);
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="form-recipient">Recipient</FieldLabel>
              <Input
                id="form-recipient"
                type="text" 
                placeholder="Recipient's address" 
                className="w-full p-2 rounded bg-neutral-700 text-kredix-text" 
                {...form.register('recipient')} 
                />
            </Field>
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel>Amount</FieldLabel>
              <Input 
                type="text" 
                placeholder="Amount to transfer" 
                className="w-full p-2 rounded bg-neutral-700 text-kredix-text" 
                {...form.register('amount')}

                value={currencyMask(form.watch('amount'))}

               />
            </Field>
          </FieldSet>
        </FieldGroup>
        <Button className="mt-4 flex items-center gap-2" type="submit" disabled={transferMigrate.isPending}>
          {transferMigrate.isPending ? 'Transferring...' : 'Transfer'}
          {transferMigrate.isPending && <Loading />}
        </Button>
      </form>
    </div>
  );
};