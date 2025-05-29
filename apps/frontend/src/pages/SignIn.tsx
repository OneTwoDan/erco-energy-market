import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import ERCO from "@/assets/ERCO.png";
import { toast } from "sonner";
import loadingGif from "@/assets/loading.gif";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed");
      }

      const data = await response.json();

      const token = data.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Logged in successfully, welcome!");

      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9fdf3]">
      <Card className="w-full max-w-md shadow-lg border border-[#a7da01] rounded-3xl">
        <CardHeader className="flex flex-col items-center gap-4 pb-4 border-b border-[#a7da01]">
          <img src={ERCO} alt="ERCP Logo" className="w-24 object-contain" />
          <h1 className="text-3xl font-bold text-[#05b305]">Sign In</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="email" className="text-[#161616] font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#a7da01] focus:border-[#05b305] focus:ring-[#05b305]"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-[#161616] font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#a7da01] focus:border-[#05b305] focus:ring-[#05b305]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#05b305] hover:bg-[#a7da01] text-white font-semibold flex justify-center items-center gap-2"
            >
              {loading ? (
                <img src={loadingGif} alt="Loading..." className="h-6 w-6" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          <p className="text-sm text-center mt-6 text-[#161616]">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#05b305] hover:text-[#a7da01] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;