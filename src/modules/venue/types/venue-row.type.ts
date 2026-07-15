export interface VenueRow {
  id: string;
  name: string;
  location: string;
  timezone: string;
  capacity: number;
  created_at: Date;
  updated_at: Date | null;
}
