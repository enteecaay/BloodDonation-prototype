
import DonorRegistrationForm from "./components/DonorRegistrationForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Become a Lifesaver: Register as a Donor
        </h1>
        <p className="text-lg text-foreground/80 mb-8 text-center">
          Your decision to donate blood can make a monumental difference. Fill out the form below to join our network of heroes.
        </p>
        <DonorRegistrationForm />
      </div>
    </div>
  );
}
