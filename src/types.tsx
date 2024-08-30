export interface Location {
    lat: number;
    lng: number;
  }
  
  export interface Profile {
    id: number;
    name: string;
    photo: string;
    description: string;
    location: Location;
  }
  