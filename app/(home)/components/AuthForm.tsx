"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButton";
import { ResponseError } from "@/types";

interface Props {}

interface LoginForm {
  email: string;
  password: string;
}

type Variant = "LOGIN" | "REGISTER";
type LoginType = "credentials" | "google" | "github";

const AuthForm: React.FC<Props> = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session.status, router]);

  const toggleVariant = () => {
    reset();
    if (variant === "LOGIN") {
      setVariant("REGISTER");
      return;
    }

    setVariant("LOGIN");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);

      if (variant === "REGISTER") {
        const response = await axios.post("/api/register", data);
      }
      await handlerLoginAction("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      const {
        response: { data },
      } = error as ResponseError;

      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  const handlerLoginAction = async (
    action: LoginType,
    loginForm?: LoginForm
  ) => {
    const data = loginForm ?? {};
    const loginResult = await signIn(action, {
      ...data,
      redirect: false,
    });

    if (loginResult?.ok) {
      router.push("/conversations");
      return;
    }

    toast.error("Invalid Credentials");
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div>
            <Button
              label={variant === "REGISTER" ? "회원가입" : "로그인"}
              disabled={isLoading}
              type="submit"
            />
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">소셜 로그인</span>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => handlerLoginAction("github")}
            />

            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => handlerLoginAction("google")}
            />
          </div>
          <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
            <div>
              {variant === "REGISTER"
                ? "이미 계정이 있나요?"
                : "메신저를 처음 사용하시나요?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "REGISTER" ? "로그인하기" : "계정 만들기"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
