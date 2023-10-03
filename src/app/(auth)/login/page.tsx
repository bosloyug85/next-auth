import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";

export const metadata = {
    title: "Login - S&I Cleaning",
};

const Login = async () => {
    const data = await getServerSession(authOptions);

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            {JSON.stringify(data)}
            <LoginForm />
        </div>
    );
};

export default Login;