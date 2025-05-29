import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import ERCO from "@/assets/ERCO.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9fdf3]">
      <Card className="w-full max-w-md shadow-lg border border-[#a7da01] rounded-3xl">
        <CardHeader className="flex flex-col items-center gap-4 pb-4 border-b border-[#a7da01]">
          <img src={ERCO} alt="ERCP Logo" className="w-24 object-contain" />
          <h1 className="text-3xl font-bold text-[#05b305]">Sign In</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-[#161616] font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
                className="border-[#a7da01] focus:border-[#05b305] focus:ring-[#05b305]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#05b305] hover:bg-[#a7da01] text-white font-semibold"
            >
              Log In
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