import { useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"

export const TransferForm = () => {
  const { } = useForm()

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4">
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="form-recipient">Recipient</FieldLabel>
              <Input id="form-recipient" type="text" placeholder="Recipient's address" className="w-full p-2 rounded bg-neutral-700 text-kredix-text" />
            </Field>
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel>Amount</FieldLabel>
              <Input type="number" placeholder="Amount to transfer" className="w-full p-2 rounded bg-neutral-700 text-kredix-text" />
            </Field>
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel>Message</FieldLabel>
              <Input type="text" placeholder="Optional message" className="w-full p-2 rounded bg-neutral-700 text-kredix-text" />
            </Field>
          </FieldSet>
        </FieldGroup>
        <Button className="mt-4">Transfer</Button>
      </form>
    </div>
  )
}