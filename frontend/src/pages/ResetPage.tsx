 import { useState, useEffect } from "react";
            import { useParams, useNavigate } from "react-router-dom";
            import { Input } from "@/components/ui/input";
            import { Button } from "@/components/ui/button";
            import AuthLayout from "@/components/layouts/AuthLayout";
            import Spinner from "@/components/ui/Spinner";
            import { motion, AnimatePresence } from "framer-motion";
            import { toast } from "sonner";
            import zxcvbn from "zxcvbn";
            
            export default function ResetPage() {
              const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
              const [error, setError] = useState("");
              const [loading, setLoading] = useState(false);
              const [tokenValid, setTokenValid] = useState(true);
              const [passwordStrength, setPasswordStrength] = useState(0);
              const [showStrength, setShowStrength] = useState(false);
              const { token } = useParams();
              const navigate = useNavigate();
            
              useEffect(() => {
                if (token) {
                  fetch(`http://localhost:5000/validate-reset/${token}`)
                    .then((res) => {
                      if (!res.ok) throw new Error("Invalid or expired reset token");
                    })
                    .catch(() => setTokenValid(false));
                }
              }, [token]);
            
              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                setForm((prev) => ({ ...prev, [name]: value }));
            
                if (name === "newPassword") {
                  setShowStrength(value.length > 0);
                  const score = zxcvbn(value).score;
                  setPasswordStrength(score);
                }
              };
            
              const getStrengthColor = () =>
                ["#ccc", "#f87171", "#facc15", "#4ade80", "#22c55e"][passwordStrength];
            
              const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setError("");
            
                if (form.newPassword !== form.confirmPassword) {
                  return setError("Passwords do not match.");
                }
            
                try {
                  setLoading(true);
                  const res = await fetch("http://localhost:5000/reset", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, token }),
                  });
            
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || "Reset failed");
            
                  toast.success("Password reset successful!");
                  navigate("/login");
                } catch (err: unknown) {
                  setError(err instanceof Error ? err.message : "Something went wrong");
                } finally {
                  setLoading(false);
                }
              };
            
           

  return (
    <AuthLayout>
      {!tokenValid ? (
        <>
        <div className="text-center space-y-2 mb-6">
            <h3 className="text-3xl font-bold  text-red-500">Invalid or expired reset link</h3>
            <p className="text-muted-foreground text-sm">Please check link or request a new password reset.</p>
          </div>

        <div className="text-center space-y-4">
          <Button onClick={() => navigate("/forgot")} className="underline">Go to Forgot Password</Button>
        </div>
        </>
      ) : (
        <>
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-3xl font-bold">Set a New Password</h3>
            <p className="text-muted-foreground text-sm">Passwords must match and be at least 6 characters.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              required
            />

             {/* Password Strength Meter */}
                                    <AnimatePresence>
                                      {showStrength && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "0.25rem" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="bg-zinc-200 rounded overflow-hidden"
                                        >
                                          <div
                                            style={{
                                              width: `${(passwordStrength + 1) * 20}%`,
                                              backgroundColor: getStrengthColor(),
                                            }}
                                            className="h-full transition-all duration-300"
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                        
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Reset Password"}
            </Button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
