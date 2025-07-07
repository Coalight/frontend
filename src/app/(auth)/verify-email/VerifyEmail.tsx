"use client";

import { useState, useRef, useEffect } from "react";
import OtpHeader from "@/components/form/OtpHeader";
import OtpForm from "@/components/form/OtpForm";
import OtpFooter from "@/components/form/OtpFooter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { verifyUser } from "@/redux/features/auth/authSlice";
// import { useRouter } from "next/navigation";
import { sendCodeToEmail } from "@/lib/sent-verification-code";
import { FormState } from "@/types/auth";

const OTP_LENGTH: number = 6;
const OTP_RESEND_TIMEOUT = 30; // seconds

export default function OtpVerification() {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(OTP_RESEND_TIMEOUT);
  const [FormState, setFormState] = useState<FormState>("IDLE");

  const email = useAppSelector((state) => state.auth.user?.email) || "";

  // array of input elements
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < OTP_LENGTH - 1) {
        setActiveInput(index + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text/plain")
      .slice(0, OTP_LENGTH);
    if (/^[a-zA-Z0-9]+$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < OTP_LENGTH) newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      setActiveInput(Math.min(pasteData.length, OTP_LENGTH - 1));
    }
  };

  const handleResendOtp = async () => {
    const res = await sendCodeToEmail(email);
    if (res.success) {
      toast.success(res.message);

      setIsResendDisabled(true);
      setCountdown(30);
    } else {
      toast.error(res.message);
    }
  };

  // Focus the first input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
  }, []);

  // Focus input when activeInput changes
  useEffect(() => {
    inputRefs.current[activeInput]?.focus();
  }, [activeInput]);

  // Countdown for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  // Only send code on first ever mount (not on refresh)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem("otp-initial-sent")
    ) {
      handleResendOtp();
      window.sessionStorage.setItem("otp-initial-sent", "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOtpComplete = otp.join("").length === OTP_LENGTH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length != OTP_LENGTH)
      return toast.error("Please enter a complete OTP.");

    try {
      setFormState("LOADING");
      const response = await fetch("/api/verify-email/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: enteredOtp }),
      });

      if (!response.ok) {
        setFormState("ERROR");
        const { message } = await response.json();
        toast.error(message);

        setOtp(Array(OTP_LENGTH).fill(""));
        setActiveInput(0);

        return;
      }

      const { message } = await response.json();

      // updaate user info in the store
      dispatch(verifyUser());
      toast.success(message);
      setOtp(Array(OTP_LENGTH).fill(""));
      setFormState("SUCCESS");
      // Redirect
      // router.push("/dashboard");
    } catch (error) {
      setFormState("ERROR");
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying the OTP.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-md bg-white p-8 shadow-lg">
      <OtpHeader email={email} />
      <OtpForm
        otp={otp}
        activeInput={activeInput}
        isResendDisabled={isResendDisabled}
        countdown={countdown}
        isOtpComplete={isOtpComplete}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handlePaste={handlePaste}
        handleSubmit={handleSubmit}
        handleResendOtp={handleResendOtp}
        setActiveInput={setActiveInput}
        inputRefs={inputRefs.current}
        FormState={FormState}
      />
      <OtpFooter />
    </div>
  );
}
