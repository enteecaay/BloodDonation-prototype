
import DonorRegistrationForm from "./components/DonorRegistrationForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Donor Profile & Registration
        </h1>
        <p className="text-lg text-foreground/80 mb-8 text-center">
          Your decision to donate blood can make a monumental difference. Fill out or update your donor details below.
        </p>
        <DonorRegistrationForm />
      </div>
    </div>
  );
}
