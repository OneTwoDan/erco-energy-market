import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OfferCard } from "@/components/cards/OfferCard";
import loadingGif from '@/assets/loading.gif';

interface Offer {
  id: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
  pricePerKwh: number;
  startDate: string;
  endDate: string;
}

const ActiveOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleBuy = async (offerId: string, sellerId: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('No authentication token found, please login.');
      return;
    }

    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const buyerId = payload.id;

    if (buyerId === sellerId) {
      toast.error('You cannot buy your own offer.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          buyerId,
          offerId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to purchase offer');
      }

      toast.success('Offer purchased successfully');

      setLoading(true);
      await fetchOffers();

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Unknown error');
      }
    }
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
          onBuy={() => handleBuy(offer.id, offer.sellerId)}
        />
      ))}
    </div>
  );
};

export default ActiveOffers;