"use client";

import { FiArrowRight, FiRefreshCw } from "react-icons/fi";
import OtpInput from "@/components/form/OtpInput";
import { cn } from "@/lib/utils";
import { FormState } from "@/types/auth";

interface OtpFormProps {
  otp: string[];
  activeInput: number;
  isResendDisabled: boolean;
  countdown: number;
  isOtpComplete: boolean;
  handleChange: (value: string, index: number) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleResendOtp: () => void;
  setActiveInput: (index: number) => void;
  inputRefs: (HTMLInputElement | null)[];
  FormState?: FormState;
}

export default function OtpForm({
  otp,
  activeInput,
  isResendDisabled,
  countdown,
  isOtpComplete,
  handleChange,
  handleKeyDown,
  handlePaste,
  handleSubmit,
  handleResendOtp,
  setActiveInput,
  inputRefs,
  FormState = "IDLE",
}: OtpFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center gap-2">
        {otp.map((digit, index) => (
          <OtpInput
            key={index}
            ref={(el) => {
              if (inputRefs) inputRefs[index] = el;
            }}
            value={digit}
            onChange={(value) => handleChange(value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => setActiveInput(index)}
            isActive={activeInput === index}
            hasValue={!!digit}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!isOtpComplete || FormState === "LOADING"}
        className={cn(
          "flex w-full items-center justify-center rounded-md py-3 text-sm font-semibold text-white shadow-md transition-all",
          isOtpComplete
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            : "bg-gray-300 cursor-not-allowed"
        )}
      >
        {FormState === "LOADING" ? "Loading..." : "Verify Account"}
        {isOtpComplete && <FiArrowRight className="ml-2 size-5" />}
      </button>

      <div className="text-center text-sm text-gray-500">
        {isResendDisabled ? (
          <p>
            Didn&apos;t receive code? Resend in{" "}
            <span className="font-medium text-indigo-600">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            className="flex items-center justify-center gap-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none mx-auto"
          >
            <FiRefreshCw className="h-4 w-4 mr-1.5" />
            Resend verification code
          </button>
        )}
      </div>
    </form>
  );
}
