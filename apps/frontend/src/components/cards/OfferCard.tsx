import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BoltIcon, CalendarIcon, DollarSignIcon } from "lucide-react";

interface OfferCardProps {
  sellerName: string;
  quantity: number;
  pricePerKwh: number;
  startDate: string;
  endDate: string;
  onBuy: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  sellerName,
  quantity,
  pricePerKwh,
  startDate,
  endDate,
  onBuy,
}) => {
  const now = new Date();
  const isExpired = new Date(endDate) < now;

  return (
    <Card className="rounded-3xl shadow-sm hover:shadow-md transition duration-200 bg-white border border-[#a7da01]">
      <CardHeader className="flex items-center justify-between pb-3 border-b border-[#a7da01]">
        <div className="flex items-center gap-2">
          <BoltIcon
            className={`h-5 w-5 ${isExpired ? "text-[#e9e60d]" : "text-[#05b305]"}`}
          />
          <CardTitle className="text-base font-semibold text-[#161616]">
            {sellerName}
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className={`text-xs px-2 py-1 rounded-md ${
            isExpired
              ? "border-[#e9e60d] text-[#e9e60d]"
              : "border-[#05b305] text-[#05b305]"
          }`}
        >
          {isExpired ? "Expired" : "Available"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-[#161616]">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 font-medium">
            <DollarSignIcon className="h-4 w-4" />
            Price
          </span>
          <span className="font-semibold">${pricePerKwh.toFixed(2)} / kWh</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 font-medium">
            <BoltIcon className="h-4 w-4" />
            Quantity
          </span>
          <span>{quantity} kWh</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 font-medium">
            <CalendarIcon className="h-4 w-4" />
            Window
          </span>
          <div className="text-right text-sm">
            <div>{new Date(startDate).toLocaleString()}</div>
            <div className="text-xs text-[#a7da01]">
              Ends at {new Date(endDate).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <Button
          className={`w-full mt-4 ${
            isExpired
              ? "bg-[#e9e60d] text-[#161616] cursor-not-allowed opacity-60"
              : "bg-[#05b305] hover:bg-[#a7da01] text-white"
          }`}
          onClick={onBuy}
          disabled={isExpired}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};