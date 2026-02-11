export type UserRole = "student" | "professor" | "admin";

export interface BaseProfile {
  fullName: string;
  phone: string;
  idFile: File | null;
}

export interface StudentProfile extends BaseProfile {
  rollNumber: string;
  course: string;
  year: string;
  section: string;
}
