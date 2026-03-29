import { Button } from "../../components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../components/ui/field";
import { Input } from "../../components/ui/input";

export default function Login() {
  return (
    <div className="p-20 flex flex-col gap-4 h-full">
      <div className="flex flex-col items-start">
        <span className="text-secondary text-lg">Authentication</span>
        <h2 className="text-kredix-text text-4xl">Secure Access</h2>
      </div>
      <form className="flex flex-col gap-4 mt-20">
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel className="text-kredix-text" required>Email</FieldLabel>
              <Input type="email" placeholder="email@example.com" required />
            </Field>
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel className="text-kredix-text" required>Password</FieldLabel>
              <Input type="password" placeholder="Type your password" required />
            </Field>
          </FieldSet>
        </FieldGroup>
        <Button type="submit" className="w-full mt-6">Login</Button>
      </form>
      <div>
        <span className="text-kredix-text text-sm">Don't have an account?</span>
        <a href="/auth/signup" className="text-secondary text-sm ml-1">Sign up</a>
      </div>
      <div>
        <span className="text-kredix-text text-sm">Forgot your password?</span>
        <a href="/auth/forgot-password" className="text-secondary text-sm ml-1">Reset it</a>
      </div>
      {/* This element is for footer links for now using span */}
      <div className="flex justify-between uppercase mt-auto gap-2 flex-wrap">
        <span className="text-kredix-text text-sm">Privacy Policy</span>
        <span className="text-kredix-text text-sm">Compliance</span>
        <span className="text-kredix-text text-sm">Terms of Service</span>
      </div>
    </div>
  )
}