export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'organizer' | 'attendee';
