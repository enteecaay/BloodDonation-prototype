
import EmergencyClientPage from "./components/EmergencyClientPage";

export default function EmergencyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Urgent Blood Requests
        </h1>
        <p className="text-lg text-foreground/80 mb-10 text-center">
          If you are a staff member, you can post an urgent need for blood. 
          All logged-in users can view active requests to see if they can help.
        </p>
        <EmergencyClientPage />
      </div>
    </div>
  );
}
