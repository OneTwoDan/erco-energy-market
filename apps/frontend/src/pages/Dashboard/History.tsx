import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  BoltIcon,
  DollarSignIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react";
import loadingGif from "@/assets/loading.gif";

type Offer = {
  id: string;
  sellerId: string;
  quantity: number;
  pricePerKwh: number;
  startDate: string;
  endDate: string;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
  seller: {
    id: string;
    name: string;
  };
};

type RawTransactionFromAPI = {
  id: string;
  buyerId: string;
  offerId: string;
  transactionDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  offer: Offer;
  buyer?: {
    id: string;
    name: string;
  };
};

type Transaction = {
  id: string;
  type: "buy" | "sell";
  offerId: string;
  quantity: number;
  pricePerKwh: number;
  date: string;
  counterpartName: string;
};

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [purchasesRes, salesRes] = await Promise.all([
          fetch("http://localhost:3001/api/transactions/purchases", { headers }),
          fetch("http://localhost:3001/api/transactions/sales", { headers }),
        ]);

        if (!purchasesRes.ok || !salesRes.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const purchasesData: RawTransactionFromAPI[] = await purchasesRes.json();
        const salesData: RawTransactionFromAPI[] = await salesRes.json();

        const mappedPurchases: Transaction[] = purchasesData.map((t) => ({
          id: t.id,
          type: "buy",
          offerId: t.offerId,
          quantity: t.offer.quantity,
          pricePerKwh: t.offer.pricePerKwh,
          date: t.transactionDate,
          counterpartName: t.offer.seller.name,
        }));

        const mappedSales: Transaction[] = salesData.map((t) => ({
          id: t.id,
          type: "sell",
          offerId: t.offerId,
          quantity: t.offer.quantity,
          pricePerKwh: t.offer.pricePerKwh,
          date: t.transactionDate,
          counterpartName: t.buyer?.name || "Unknown",
        }));

        const allTransactions = [...mappedPurchases, ...mappedSales].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(allTransactions);
      } catch (err) {
        console.error("Error fetching transactions", err);
        toast.error("Error loading transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-[#f9fdf3] min-h-screen p-6">
      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {loading ? (
          <div className="col-span-2 flex justify-center">
            <img src={loadingGif} alt="Loading..." />
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-center col-span-2">No transactions found.</p>
        ) : (
          transactions.map((tx) => {
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
                    {tx.counterpartName}
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
          })
        )}
      </div>
    </div>
  );
}