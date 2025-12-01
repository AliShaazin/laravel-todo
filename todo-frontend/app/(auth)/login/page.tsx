import Login from "@/components/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (token) {
    redirect("/");
  }
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <section className="h-[50vh] w-[50vh] border rounded-xl border-gray-600 p-10 flex flex-col">
        <Login />
      </section>
    </section>
  );
};

export default LoginPage;
