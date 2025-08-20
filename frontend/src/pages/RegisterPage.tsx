import { useState } from "react";
import { motion} from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AvatarCarousel from "@/components/AvatarCarousel";
import AuthLayout from "@/components/layouts/AuthLayout";
import Spinner from "@/components/ui/Spinner";
import { toast } from "sonner";


export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [selectedAvatar, setSelectedAvatar] = useState("dog.jpg");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const formData = {
      username: form.username,
      email: form.email,
      password: form.password,
      avatar: './img/avatars/thumbs/' + selectedAvatar // assuming this is the avatar/color value
    };
  
    try {
      const res = await fetch("https://gossipa.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if you're using cookies/sessions
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
     console.log(res)
      }


      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
 if (res.redirected) {
        window.location.href = res.url;
      } else {
        throw new Error("Unexpected login response");
      }
  
      const data = await res.json();
      if (data.message) {
        alert(data.message); // handle errors like duplicate usernames
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration Failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <AuthLayout>
      {/* Left Panel */}
      <div className="text-center lg:text-left space-y-6">
        <Lock className="h-12 w-12 text-primary mx-auto lg:mx-0" />
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Become A Gossipa</h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Your privacy is our priority. <br className="hidden sm:inline" /> Get heard, remain unknown.
        </p>
        <div className="mt-4 sm:mt-6 max-w-[280px] sm:max-w-full mx-auto overflow-x-auto overflow-y-hidden">
          <AvatarCarousel
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        </div>
      </div>
  <>
{/* Form Panel */}
<motion.form
key="register"
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -30 }}
  transition={{ delay: 0.2, duration: 0.6 }}
  className="space-y-6"
>
  <div className="space-y-2">
    <label htmlFor="username" className="text-sm sm:text-base font-medium">
      Username
    </label>
    <Input
      id="username"
      name="username"
      type="text"
      placeholder="Enter your username"
      value={form.username}
      onChange={handleChange}
      required
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="email" className="text-sm sm:text-base font-medium">
      Email
    </label>
    <Input
      id="email"
      name="email"
      type="email"
      placeholder="Enter your email"
      value={form.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="password" className="text-sm sm:text-base font-medium">
      Password
    </label>
    <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a Password"
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
              

  </div>

 
  <Button type="submit" className="w-full text-base sm:text-lg font-semibold"  disabled={loading}>
     {loading ? <Spinner /> : "Sign Up"}
  </Button>

  <p className="text-xs sm:text-sm text-center text-muted-foreground mt-4">
    Forgot password?{" "}
    <Link to="/forgot" className="text-primary font-medium hover:underline">
      Reset Password
    </Link>
  </p>
</motion.form>
</>
    </AuthLayout>
  );
}
