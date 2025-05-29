import { OfferCard } from "@/components/cards/OfferCard";

const mockOffers = [
  {
    id: "1",
    sellerName: "Alice Energy",
    quantity: 500,
    pricePerKwh: 0.12,
    startDate: "2025-05-29T10:00:00Z",
    endDate: "2025-05-29T20:00:00Z",
  },
  {
    id: "2",
    sellerName: "GreenSpark Co.",
    quantity: 200,
    pricePerKwh: 0.08,
    startDate: "2025-05-30T08:00:00Z",
    endDate: "2025-05-30T18:00:00Z",
  },
  {
    id: "3",
    sellerName: "Voltify Ltd.",
    quantity: 1000,
    pricePerKwh: 0.15,
    startDate: "2025-05-28T06:00:00Z",
    endDate: "2025-05-28T12:00:00Z",
  },
  {
    id: "4",
    sellerName: "SunFlow Inc.",
    quantity: 750,
    pricePerKwh: 0.10,
    startDate: "2025-05-29T14:00:00Z",
    endDate: "2025-05-30T02:00:00Z",
  },
  {
    id: "5",
    sellerName: "EcoWatts",
    quantity: 320,
    pricePerKwh: 0.09,
    startDate: "2025-05-29T09:00:00Z",
    endDate: "2025-05-29T21:00:00Z",
  },
  {
    id: "6",
    sellerName: "BrightFuture",
    quantity: 150,
    pricePerKwh: 0.11,
    startDate: "2025-05-29T12:00:00Z",
    endDate: "2025-05-29T23:00:00Z",
  },
];

const ActiveOffers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onBuy={() => console.log(`Buying offer ${offer.id}`)}
        />
      ))}
    </div>
  );
};

export default ActiveOffers;