
import DonorSearchClient from "./components/DonorSearchClient";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Find a Blood Donor
        </h1>
        <p className="text-lg text-foreground/80 mb-8 text-center">
          Search our database for available blood donors by blood type and location. Every connection can be a lifeline.
        </p>
        <DonorSearchClient />
      </div>
    </div>
  );
}
