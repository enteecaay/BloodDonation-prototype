
export type Role = 'guest' | 'member' | 'staff' | 'admin';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: Role;
  photoURL?: string | null;
  // Mock field for admin user management page
  lastLogin?: string; 
  accountStatus?: 'active' | 'suspended';
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

export interface BloodUnit {
  id: string;
  hospitalId: string; // Could be a staff ID if one staff manages one hospital's units
  hospitalName: string;
  bloodType: string;
  quantity: number; // in units (e.g., pints)
  lastUpdated: string; // ISO date string
  status?: 'available' | 'low' | 'critical'; // Optional status
}


export const bloodTypes: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
