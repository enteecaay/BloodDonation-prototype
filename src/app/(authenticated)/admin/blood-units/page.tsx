
import BloodUnitManagementClient from "./components/BloodUnitManagementClient";

export default function ManageBloodUnitsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Blood Unit Inventory Management
        </h1>
        <p className="text-lg text-foreground/80 mb-10 text-center">
          View and monitor blood unit stock levels across all affiliated hospitals.
        </p>
        <BloodUnitManagementClient />
      </div>
    </div>
  );
}
