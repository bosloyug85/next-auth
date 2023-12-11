import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import "./login-screen.scss";

export const metadata = {
    title: "Login - S&I Cleaning",
};

const Login = async () => {
    const data = await getServerSession(authOptions);

    return (
        <div className="login-screen">
            <h1>Welcome guest!</h1>
        </div>
    );
};

export default Login;