"use client";
import "./login.scss";
import { TextInput, Checkbox, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { TextField, Button, Card } from "@mui/material";

interface FormData {
    username: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const handleLogin = async (data: FormData) => {
        await signIn("credentials", {
            username: data.username,
            password: data.password,
        });
    };

    return (
        <Card sx={{ maxWidth: 275, padding: 10 }}>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex h-auto max-w-full flex-col gap-4"
            >
                {/* <Image priority src={logo} alt="Logo" /> */}
                <h1 className="text-3xl text-black font-bold">Sign In</h1>

                <TextField id="username" fullWidth={true} placeholder="Type your username..." label="Username" type="text" variant="standard" {...register("username")} required />

                <TextField id="password" {...register("password")} fullWidth={true} label="Password" placeholder="Type your password..." type="password" variant="standard" required />

                <div style={{ margin: '20px 0' }}>
                    <Checkbox />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button
                    fullWidth={true}
                    variant="contained"
                    type="submit"
                >
                    Sign in
                </Button>
            </form>
        </Card>
    );
};

export default LoginForm;