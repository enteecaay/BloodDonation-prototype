
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AuthUser } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit3, ShieldAlert, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";


// Extended dumpUsers for more variety, ideally this comes from a shared mock data source
const DUMMY_PASSWORD = "password";
const dumpUsers: AuthUser[] = [
  { uid: "member-001", email: "member@example.com", displayName: "John Member", role: "member", photoURL: "https://placehold.co/100x100.png?text=JM", lastLogin: "2024-07-28T10:00:00Z", accountStatus: "active" },
  { uid: "staff-001", email: "staff@example.com", displayName: "Sarah Staff", role: "staff", photoURL: "https://placehold.co/100x100.png?text=SS", lastLogin: "2024-07-29T14:30:00Z", accountStatus: "active" },
  { uid: "admin-001", email: "admin@example.com", displayName: "Alex Admin", role: "admin", photoURL: "https://placehold.co/100x100.png?text=AA", lastLogin: "2024-07-30T09:15:00Z", accountStatus: "active" },
  { uid: "member-002", email: "jane.donor@example.com", displayName: "Jane Donor", role: "member", photoURL: "https://placehold.co/100x100.png?text=JD", lastLogin: "2024-07-25T18:45:00Z", accountStatus: "active" },
  { uid: "member-003", email: "peter.lee@example.com", displayName: "Peter Lee", role: "member", photoURL: "https://placehold.co/100x100.png?text=PL", lastLogin: "2024-07-22T11:20:00Z", accountStatus: "suspended" },
  { uid: "staff-002", email: "hospital.contact@example.com", displayName: "City General Hospital", role: "staff", photoURL: "https://placehold.co/100x100.png?text=CGH", lastLogin: "2024-07-29T08:00:00Z", accountStatus: "active" },
];


export default function UserManagementClient() {
  const { user: adminUser, role, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AuthUser[]>(dumpUsers); // Using dumpUsers as mock data

  useEffect(() => {
    if (!loading && (role !== 'admin' || !adminUser)) {
      router.push('/login?redirect=/admin/users');
    }
  }, [adminUser, role, loading, router]);

  if (loading || role !== 'admin' || !adminUser) {
    return <div className="text-center py-10">Loading user data or unauthorized access...</div>;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "N/A";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleViewHistory = (userId: string) => {
    alert(`Viewing donation history for user ID: ${userId} (Not Implemented)`);
    // In a real app, navigate to a detailed history page or show a modal
  };
  
  const handleEditUser = (userId: string) => {
    alert(`Editing user ID: ${userId} (Not Implemented)`);
    // Navigate to an edit user page or open an edit modal
  };

  const handleChangeRole = (userId: string, newRole: Role) => {
     setUsers(prevUsers => prevUsers.map(u => u.uid === userId ? {...u, role: newRole} : u));
     alert(`Role for user ID: ${userId} changed to ${newRole} (Mock Update)`);
  };
   const handleToggleStatus = (userId: string) => {
     setUsers(prevUsers => prevUsers.map(u => u.uid === userId ? {...u, accountStatus: u.accountStatus === 'active' ? 'suspended' : 'active'} : u));
     alert(`Account status for user ID: ${userId} toggled (Mock Update)`);
  };


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <UserCog size={28} className="text-primary" /> All User Accounts
        </CardTitle>
        <CardDescription>
          Total Users: {users.length}. Manage roles, view activity, and donation history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.uid}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src={u.photoURL || undefined} alt={u.displayName || "User"} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {getInitials(u.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{u.displayName || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">UID: {u.uid}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Badge variant={u.role === 'admin' ? 'destructive' : u.role === 'staff' ? 'secondary' : 'outline'} className="capitalize">
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                   <Badge variant={u.accountStatus === 'active' ? 'default' : 'destructive'} className="bg-green-500 hover:bg-green-600 data-[variant=destructive]:bg-red-500 data-[variant=destructive]:hover:bg-red-600 text-white capitalize">
                    {u.accountStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewHistory(u.uid)}>
                        <Eye className="mr-2 h-4 w-4" /> View Donation History
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(u.uid)}>
                        <Edit3 className="mr-2 h-4 w-4" /> Edit User Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                      {(['member', 'staff', 'admin'] as Role[]).map(r => (
                        u.role !== r && <DropdownMenuItem key={r} onClick={() => handleChangeRole(u.uid, r)}>
                           Set as {r.charAt(0).toUpperCase() + r.slice(1)}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                       <DropdownMenuItem onClick={() => handleToggleStatus(u.uid)} className={u.accountStatus === 'active' ? 'text-destructive focus:text-destructive' : 'text-green-600 focus:text-green-700'}>
                        {u.accountStatus === 'active' ? 'Suspend Account' : 'Activate Account'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         {users.length === 0 && <p className="text-center text-muted-foreground py-8">No users found.</p>}
      </CardContent>
    </Card>
  );
}
