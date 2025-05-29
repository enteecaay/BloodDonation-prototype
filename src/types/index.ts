
export type Role = 'guest' | 'member' | 'staff' | 'admin';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: Role;
  photoURL?: string | null;
}

// Keep existing types
export interface Donor {
  id: string; // This could be the AuthUser uid or a separate ID
  userId: string; // Link to AuthUser uid
  name: string; // May be redundant if using AuthUser.displayName
  email: string; // May be redundant
  phone: string;
  bloodType: string;
  location: string;
  availability: string[];
  // Potentially add lastDonationDate, etc.
}

export interface BloodDrive {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  organizedBy?: string; // staff/admin ID
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string; // Could be staff/admin name or ID
  authorId?: string;
  publishDate: string;
  imageUrl?: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface EmergencyRequest {
  id:string;
  patientName: string;
  bloodType: string;
  hospital: string;
  contactPerson: string;
  contactNumber: string;
  message: string;
  status: 'active' | 'fulfilled' | 'closed';
  requestedAt: string;
  requestedBy?: string; // staff ID
}

export const bloodTypes: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Consider adding a type for Blood Units later
// export interface BloodUnit {
//   hospitalId: string;
//   bloodType: string;
//   quantity: number;
//   lastUpdated: string;
// }
