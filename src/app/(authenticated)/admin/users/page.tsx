
import UserManagementClient from "./components/UserManagementClient";

export default function ManageUsersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          User Account Management
        </h1>
        <p className="text-lg text-foreground/80 mb-10 text-center">
          View and manage user accounts, roles, and activity on the platform.
        </p>
        <UserManagementClient />
      </div>
    </div>
  );
}
