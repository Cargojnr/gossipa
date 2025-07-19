import { useRef, useEffect } from "react";

type OtpInputProps = {
  length?: number;
  onComplete: (code: string) => void;
  onChange?: (code: string) => void;
  autoFocus?: boolean;
  className?: string;
};

export default function OtpInput({
  length = 6,
  onComplete,
  onChange,
  autoFocus = false,
  className = "",
}: OtpInputProps) {
  const inputs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (autoFocus) {
      inputs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d$/.test(val)) return;

    inputs.current[i].value = val;
    if (i < length - 1) inputs.current[i + 1]?.focus();

    const code = inputs.current.map((input) => input.value).join("");

    if (onChange) onChange(code);
    if (code.length === length) onComplete(code);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputs.current[i].value && i > 0) {
      inputs.current[i - 1].focus();
    }
  };

  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el!)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-10 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-primary text-red-500"
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
