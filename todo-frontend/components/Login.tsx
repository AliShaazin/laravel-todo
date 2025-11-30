"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { handleLogin } from "@/actions/actions";
import { LoginFormState } from "@/lib/types";
import { handleRegister } from "@/actions/actions";
const Login = () => {
  const [loginFormState, loginFormAction, isLoginPending] = useActionState(
    handleLogin,
    {
      email: "",
      password: "",
    }
  );
  const [registerFormState, registerFormAction, isRegisterPending] =
    useActionState(handleRegister, {
      username: "",
      email: "",
      password: "",
    });

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="login" className="w-full h-full">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form
            action={loginFormAction}
            className="flex flex-col gap-4 w-full h-full"
          >
            <SmallHeading title="Login" />
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                id="login-email"
                name="login-email"
                type="email"
                placeholder="Email"
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="login-password"
                name="login-password"
                type="password"
                placeholder="Password"
              />
            </InputContainer>
            <SubmitButton isPending={isLoginPending} title="Login" />
            {renderLoginError(loginFormState)}
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form
            action={registerFormAction}
            className="flex flex-col gap-4 w-full h-full"
          >
            <SmallHeading title="Register" />
            <InputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                id="register-username"
                name="register-username"
                type="text"
                placeholder="Username"
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                id="register-email"
                name="register-email"
                type="email"
                placeholder="Email"
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="register-password"
                name="register-password"
                type="password"
                placeholder="Password"
              />
            </InputContainer>
            <SubmitButton isPending={isRegisterPending} title="Register" />
            {renderLoginError(registerFormState)}
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-1 w-full">{children}</div>;
};

const SmallHeading = ({ title }: { title: string }) => {
  return (
    <h2 className="text-xl font-bold uppercase tracking-widest">{title}</h2>
  );
};

const renderLoginError = (formState: LoginFormState) => {
  const errorMessage = formState.error?.email || formState.error?.password;
  if (!errorMessage) return null;
  return <div className="text-red-500 text-sm">{errorMessage}</div>;
};

const SubmitButton = ({
  isPending,
  title,
}: {
  isPending: boolean;
  title: string;
}) => {
  return (
    <Button type="submit" className="cursor-pointer" disabled={isPending}>
      {isPending ? "Submitting..." : title}
    </Button>
  );
};
