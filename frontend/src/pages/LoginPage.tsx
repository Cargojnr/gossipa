import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "@/components/ui/Spinner";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import OtpInput from "../components/OtpInput";


type LoginResponse = {
  needsVerification?: boolean;
  redirect?: string;
  error?: string;
};

function isLoginResponse(obj: unknown): obj is LoginResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    ("needsVerification" in obj || "redirect" in obj || "error" in obj)
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<"login" | "verify">("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "verify" && codeRef.current) {
      codeRef.current.focus();
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: unknown = await res.json();

      if (!res.ok) {
        const errorMsg = isLoginResponse(data) && data.error
          ? data.error
          : "Unexpected login response";

        throw new Error(errorMsg);
      }

      if (!isLoginResponse(data)) {
        throw new Error("Malformed login response");
      }

      if (data.needsVerification) {
        setStep("verify");
      } else if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        throw new Error("Unexpected login response");
      }


    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log(code)

    try {
      const res = await fetch("http://localhost:5000/verify-code", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data: unknown = await res.json();

      if (!res.ok) {
        const errorMsg =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as Record<string, unknown>).error)
            : "Verification failed";
        throw new Error(errorMsg);
      }

      if (!isLoginResponse(data)) {
        throw new Error("Malformed verification response");
      }

      if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        throw new Error("Verification failed");
      }

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Verification failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  return (

    <AuthLayout> {/* 👈 wrap in AuthLayout */}


      <AnimatePresence mode="wait">
        {step === "login" ? (
          <>
            <div className="text-center lg:text-left space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground">Welcome back Gossipa ✨</h3>
              <p className="text-muted-foreground text-sm">Login to your account</p>
            </div>
            <motion.form
              key="login"
              onSubmit={handleLogin}
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <Input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner /> : "Next"}
              </Button>
            </motion.form>
          </>
        ) : (
          <>
            <div className="text-center lg:text-left space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground">Check your email 📬</h3>
              <p className="text-muted-foreground text-sm">
                            Enter the 6-digit code we sent to your inbox
                          </p>
            </div>
            <motion.form
              key="verify"
              onSubmit={handleVerify}
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-xl font-semibold text-center">
                Enter Verification Code
              </h1>
              <OtpInput
                            onComplete={(value) => setCode(value)}
                            onChange={(value) => setCode(value)}
                            length={6}
                            autoFocus
                          />


              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner /> : "Verify"}
              </Button>
            </motion.form>
          </>
        )}
      </AnimatePresence>

    </AuthLayout>

  );
}
