
import DonationReminderForm from "./components/DonationReminderForm";

export default function ReminderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Personalized Donation Reminder
        </h1>
        <p className="text-lg text-foreground/80 mb-8 text-center">
          Generate a personalized email and SMS notification to prompt a previous donor to donate again, considering their last donation date.
        </p>
        <DonationReminderForm />
      </div>
    </div>
  );
}
