// components/pages/ForgotPasswordPage.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "../components/layouts/AuthLayout";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/forgot", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Check your email for a reset link");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center space-y-4">
                      <h2 className="text-2xl font-bold">Enter Your Email</h2>
                      <p className="text-muted-foreground text-red-500">Please your account email to request new password.</p>
                    </div>
      <div className="w-full max-w space-y-6">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          onClick={handleForgot}
          disabled={loading || !email}
          className="w-full"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        </div>
    </AuthLayout>
  );
}
