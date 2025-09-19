"use client";

import { Card, CardContent } from "@/components/ui/card";
import WithGoogleBtn from "@/components/form/WithGoogleBtn";

import { ChangeEvent, useState } from "react";
import { FormState, LoginCredentials } from "@/types/auth";
import { toast } from "sonner";
import { delay } from "@/lib/delay";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { resetLogoutState, setUser } from "@/redux/features/auth/authSlice";

import InputField from "@/components/form/InputField";
import ORLine from "@/components/form/ORLine";
import FormHeader from "@/components/form/FormHeader";
import FooterTxt from "@/components/form/FooterTxt";
import SubmitBtn from "@/components/form/SubmitBtn";
import { ShineBorder } from "../ui/shine-border";
import Background from "../marketing/ui/Background";

export default function LoginPage() {
  return (
    <div className="flex  min-h-screen  w-full  justify-start p-6 md:p-10 z-50 items-center bg-background">
      <Background />

      <div className="mx-auto max-w-lg w-full ">
        {/* <Background /> */}

        <Card className=" shadow-md border-1  rounded-lg bg-transparent  relative overflow-hidden ">
          <ShineBorder duration={20} shineColor="#ff008078" />
          <FormHeader
            title="Welcome"
            subTitle="Enter your credentials to continue"
          />

          <CardContent>
            <MainForm />

            <ORLine />

            <WithGoogleBtn />
            <FooterTxt isFromLogin />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MainForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<FormState>("IDLE");

  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const requestFormReset = () => {
    setFormData({
      email: "",
      password: "",
    });
    setStatus("IDLE");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimedData = trimeData(formData);

    // try to login
    try {
      setStatus("LOADING");
      const [response] = await Promise.all([
        fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(trimedData),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        delay(500),
      ]);

      if (!response.ok) {
        setStatus("ERROR");
        const { error } = await response.json();
        toast.error(error.message || "Something went wrong.");
        return;
      }

      const { message, user } = await response.json();

      // update user info in the store
      dispatch(setUser(user));

      // login success
      setStatus("SUCCESS");
      toast.success(message || "Login successful!");
      requestFormReset();
      // previous logout state reset
      dispatch(resetLogoutState());
      router.push("/dashboard");
    } catch (e) {
      setStatus("ERROR");
      toast.error("Something went wrong, please try again later.");
      console.log(e);
    }
  }
  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="example@gmail.com"
        value={formData.email}
        onChange={(e) => updateForm(e)}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        className="pr-10"
        value={formData.password}
        onChange={(e) => updateForm(e)}
        isFromLogin
      />

      <SubmitBtn
        text="Login"
        className="mt-8"
        isLoading={status === "LOADING"}
      />
    </form>
  );
}

const trimeData = (data: LoginCredentials): LoginCredentials => {
  return {
    email: data.email?.trim(),
    password: data.password?.trim(),
  };
};
