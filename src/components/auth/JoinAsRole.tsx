"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChangeEvent, useState } from "react";
import { FormState, type SignUpCredentials } from "@/types/auth";
import { toast } from "sonner";
import { delay } from "@/lib/delay";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import InputField from "@/components/form/InputField";
import ORLine from "@/components/form/ORLine";
import FooterTxt from "@/components/form/FooterTxt";
import WithGoogleBtn from "@/components/form/WithGoogleBtn";
import FormHeader from "@/components/form/FormHeader";
import SubmitBtn from "../form/SubmitBtn";

export default function SignupPage({ role }: { role?: "student" | "teacher" }) {
  return (
    <div className="mx-auto max-w-md  mt-28 min-h-screen px-4 md:px-0">
      <Card className="shadow-sm rounded-sm  bg-transparent border-2">
        <FormHeader title="Join Us" subTitle="Enter your details to sign up" />

        <CardContent>
          <WithGoogleBtn />

          <ORLine />
          <MainForm role={role} />
          <FooterTxt isFromLogin={false} />
        </CardContent>
      </Card>
    </div>
  );
}

function MainForm({ role }: { role?: "student" | "teacher" }) {
  const btnText =
    role === "teacher" ? "Sign up as Teacher" : "Sign up as Student";
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<SignUpCredentials>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        fetch("/api/signup", {
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
        const { message } = await response.json();
        toast.error(message || "Something went wrong.");
        return;
      }

      const { message, user } = await response.json();

      // update user info in the store
      dispatch(setUser(user));

      // signup success
      setStatus("SUCCESS");
      toast.success(message || "Signup successful!");

      requestFormReset();

      // redirect
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
        label="Name"
        type="text"
        name="name"
        placeholder="Jon Doe"
        value={formData.name}
        onChange={(e) => updateForm(e)}
      />
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
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        className="pr-10"
        value={formData.confirmPassword}
        onChange={(e) => updateForm(e)}
      />
      <SubmitBtn
        className="mt-7"
        isLoading={status == "LOADING"}
        text={status == "LOADING" ? "Loading..." : btnText || "Sign Up"}
      />
    </form>
  );
}

const trimeData = (data: SignUpCredentials): SignUpCredentials => {
  return {
    name: data.name?.trim(),
    email: data.email?.trim(),
    password: data.password?.trim(),
    confirmPassword: data.confirmPassword?.trim(),
  };
};
