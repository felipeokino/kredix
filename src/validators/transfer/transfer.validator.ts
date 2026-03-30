import {z} from 'zod';
import { parseCurrency } from '../../utils/number';

export const transferSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  amount: z.string().min(1, 'Amount is required').refine((value) => {
    const num = parseCurrency(value);
  
    return !isNaN(num) && num > 0;
  }, 'Amount must be a positive number').transform((value) => parseCurrency(value)),
});

export type TransferFormData = z.infer<typeof transferSchema>;