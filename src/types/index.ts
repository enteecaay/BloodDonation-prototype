
export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  location: string;
  availability: string[];
}

export interface BloodDrive {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  imageUrl?: string;
  tags?: string[];
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
}

export const bloodTypes: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
