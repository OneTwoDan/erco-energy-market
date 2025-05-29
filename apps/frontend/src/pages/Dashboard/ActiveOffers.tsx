import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OfferCard } from "@/components/cards/OfferCard";
import loadingGif from '@/assets/loading.gif';

interface Offer {
  id: string;
  sellerName: string;
  quantity: number;
  pricePerKwh: number;
  startDate: string;
  endDate: string;
}

const ActiveOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/offers/active");
        if (!res.ok) throw new Error("Failed to load offers");
        const data = await res.json();
        setOffers(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleBuy = () => {
    toast.success('Offer purchased successfully');
  };

  if (loading) return (
    <div className="flex justify-center items-center">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onBuy={() => handleBuy()}
        />
      ))}
    </div>
  );
};

export default ActiveOffers;