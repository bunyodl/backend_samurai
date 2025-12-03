export interface Venue {
  id: number;
  name: string;
  location: VenueLocation;
  capacity: number;
}

export interface VenueLocation {
  city: string;
  country: string;
}
