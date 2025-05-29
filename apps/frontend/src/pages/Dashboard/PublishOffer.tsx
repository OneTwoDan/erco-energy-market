import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import loadingGif from '@/assets/loading.gif';

interface DecodedToken {
  id: string;
  [key: string]: unknown;
}

export default function PublishOffer() {
  const [quantity, setQuantity] = useState<string>("");
  const [pricePerKwh, setPricePerKwh] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const startDateISO = new Date().toISOString();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minEndDate = tomorrow.toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!quantity.trim()) {
      toast.error("Quantity is required.");
      setLoading(false);
      return;
    }

    if (Number(quantity) <= 0) {
      toast.error("Quantity must be greater than zero.");
      setLoading(false);
      return;
    }

    if (!pricePerKwh.trim()) {
      toast.error("Price per kWh is required.");
      setLoading(false);
      return;
    }

    if (Number(pricePerKwh) <= 0) {
      toast.error("Price per kWh must be greater than zero.");
      setLoading(false);
      return;
    }

    if (!endDate) {
      toast.error("Please select a valid end date.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not found. Please log in.");
      setLoading(false);
      return;
    }

    let sellerId: string;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      sellerId = decoded.id;
      if (!sellerId) throw new Error("Invalid token: id missing");
    } catch {
      toast.error("Invalid or expired token. Please log in again.");
      setLoading(false);
      return;
    }

    const offerData = {
      sellerId,
      quantity: Number(quantity),
      pricePerKwh: Number(pricePerKwh),
      startDate: startDateISO,
      endDate: new Date(endDate).toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to publish offer");
      }

      await response.json();
      toast.success("Offer published successfully!");

      setQuantity("");
      setPricePerKwh("");
      setEndDate("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "An unexpected error occurred.");
        console.error(err);
      } else {
        toast.error("An unexpected error occurred.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#f9fdf3] px-6 py-12">
      <Card className="w-full max-w-md rounded-3xl border border-[#a7da01] bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3 border-b border-[#a7da01]">
          <CardTitle className="text-xl font-extrabold text-[#05b305] text-center tracking-wide">
            Publish an offer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <Label htmlFor="quantity">Quantity (kWh)</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="pricePerKwh">Price per kWh ($)</Label>
              <Input
                id="pricePerKwh"
                type="number"
                min="0"
                step="0.01"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                min={minEndDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#05b305] text-white font-bold
                hover:bg-[#a7da01] hover:text-[#161616] transition-colors duration-300 shadow-md flex justify-center items-center"
            >
              {loading ? (
                <img
                  src={loadingGif}
                  alt="Loading..."
                  className="h-6 w-6"
                />
              ) : (
                "Publish Offer"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}