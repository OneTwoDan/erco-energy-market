import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  BoltIcon,
  DollarSignIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react";

type Transaction = {
  id: string;
  type: "buy" | "sell";
  offerId: string;
  quantity: number;
  pricePerKwh: number;
  date: string;
};

const mockTransactions: Transaction[] = [
  {
    id: "t1",
    type: "buy",
    offerId: "1",
    quantity: 1000,
    pricePerKwh: 0.15,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "t2",
    type: "sell",
    offerId: "2",
    quantity: 500,
    pricePerKwh: 0.18,
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "t3",
    type: "buy",
    offerId: "3",
    quantity: 1000,
    pricePerKwh: 0.15,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "t4",
    type: "sell",
    offerId: "4",
    quantity: 500,
    pricePerKwh: 0.18,
    date: new Date(Date.now() - 172800000).toISOString(),
  },
];

export default function History() {
  return (
    <div className="bg-[#f9fdf3] min-h-screen p-6">
      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {mockTransactions.map((tx) => {
          const isBuy = tx.type === "buy";
          const icon = isBuy ? (
            <ArrowDownIcon className="h-5 w-5 text-[#05b305]" />
          ) : (
            <ArrowUpIcon className="h-5 w-5 text-[#e9e60d]" />
          );

          return (
            <Card
              key={tx.id}
              className="rounded-3xl border border-[#a7da01] shadow-sm hover:shadow-md transition duration-200 bg-white"
            >
              <CardHeader className="flex items-center justify-between pb-3 border-b border-[#a7da01]">
                <div className="flex items-center gap-2">
                  {icon}
                  <span
                    className={`text-base font-semibold ${
                      isBuy ? "text-[#05b305]" : "text-[#e9e60d]"
                    }`}
                  >
                    {isBuy ? "Purchase" : "Sale"}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 rounded-md text-[#161616]"
                >
                  Offer ID: {tx.offerId}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#161616]">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 font-medium">
                    <BoltIcon className="h-4 w-4" />
                    Quantity
                  </span>
                  <span>{tx.quantity} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 font-medium">
                    <DollarSignIcon className="h-4 w-4" />
                    Price
                  </span>
                  <span>${tx.pricePerKwh.toFixed(2)} / kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 font-medium">
                    <CalendarIcon className="h-4 w-4" />
                    Date
                  </span>
                  <span className="text-right">
                    {new Date(tx.date).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}