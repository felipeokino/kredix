import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Loading } from "../../components/custom/loading";
import { Button } from "../../components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import useAuthStore from "../../store/auth.store";
import { loginSchema } from "../../validators/auth/auth.validator";

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema)
  })
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const handleSubmit: SubmitHandler<{ email: string; password: string }> = (data) => {
    if (!form.formState.isValid) {
      console.error("Form validation failed:", form.formState.errors);
      return;
    }
    try {
      login(data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const isInvalid = !!form.formState.errors.email || !!form.formState.errors.password;

  return (
    <div className="p-20 flex flex-col gap-4 h-full max-xl:p-10 transition-transform">
      <div className="flex flex-col items-start">
        <span className="text-secondary text-lg">Authentication</span>
        <h2 className="text-kredix-text text-4xl whitespace-nowrap">Secure Access</h2>
      </div>
      <form className="flex flex-col gap-4 my-auto" onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          {isInvalid && <span className="text-red-500 text-sm">Please verify your email and password and try again.</span>}
        </div>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel className="text-kredix-text" required>Email</FieldLabel>
              <Input type="email" placeholder="email@example.com" aria-invalid={!!form.formState.errors.email} {...form.register("email")} />
            </Field>
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel className="text-kredix-text" required>Password</FieldLabel>
              <Input type="password" placeholder="Type your password" aria-invalid={!!form.formState.errors.password} {...form.register("password")} />
            </Field>
          </FieldSet>
        </FieldGroup>
        <Button type="submit" className="w-full mt-6" disabled={form.formState.isSubmitting}>Login{form.formState.isSubmitting && <Loading />}</Button>
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