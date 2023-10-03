"use client";
import { TextInput, Checkbox, Button, Label, Card } from "flowbite-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";

import logo from "../../../public/vectors/logo.svg";

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const handleLogin = async (data: FormData) => {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
        });
    };

    return (
        <Card className="max-w-[534px] w-full h-auto border-none shadow-none p-12">
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex h-auto max-w-full flex-col gap-4"
            >
                <Image priority src={logo} alt="Logo" />
                <h1 className="text-3xl text-black font-bold">Admin sign in</h1>

                <div>
                    <Label className="block mb-2" htmlFor="email" value="Email" />

                    <TextInput
                        placeholder="name@flowbite.com"
                        {...register("email")}
                        type="email"
                        required
                    />
                </div>
                <div>
                    <Label className="block mb-2" htmlFor="password" value="Password" />
                    <TextInput {...register("password")} type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                >
                    Sign in
                </Button>
            </form>
        </Card>
    );
};

export default LoginForm;