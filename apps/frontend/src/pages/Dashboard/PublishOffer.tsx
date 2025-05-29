import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublishOffer() {
  const [quantity, setQuantity] = useState("");
  const [pricePerKwh, setPricePerKwh] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Publish offer: ${quantity} kWh at $${pricePerKwh}/kWh from ${startDate} to ${endDate}`
    );
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#f9fdf3] px-6 py-12">
      <Card className="w-full max-w-md rounded-3xl border border-[#a7da01] bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-3 border-b border-[#a7da01]">
          <CardTitle className="text-xl font-extrabold text-[#05b305] text-center tracking-wide">
            Publish New Offer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="quantity"
                className="mb-2 block text-[#161616] font-semibold tracking-wide"
              >
                Quantity (kWh)
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="rounded-lg border-[#a7da01] focus:border-[#05b305] focus:ring-2 focus:ring-[#05b305] transition"
              />
            </div>

            <div>
              <Label
                htmlFor="pricePerKwh"
                className="mb-2 block text-[#161616] font-semibold tracking-wide"
              >
                Price per kWh ($)
              </Label>
              <Input
                id="pricePerKwh"
                type="number"
                min="0"
                step="0.01"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(e.target.value)}
                required
                className="rounded-lg border-[#a7da01] focus:border-[#05b305] focus:ring-2 focus:ring-[#05b305] transition"
              />
            </div>

            <div>
              <Label
                htmlFor="startDate"
                className="mb-2 block text-[#161616] font-semibold tracking-wide"
              >
                Start Date
              </Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="rounded-lg border-[#a7da01] focus:border-[#05b305] focus:ring-2 focus:ring-[#05b305] transition"
              />
            </div>

            <div>
              <Label
                htmlFor="endDate"
                className="mb-2 block text-[#161616] font-semibold tracking-wide"
              >
                End Date
              </Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="rounded-lg border-[#a7da01] focus:border-[#05b305] focus:ring-2 focus:ring-[#05b305] transition"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-[#05b305] text-white font-bold
                hover:bg-[#a7da01] hover:text-[#161616] transition-colors duration-300 shadow-md"
            >
              Publish Offer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}