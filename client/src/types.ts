export type Role = 'customer' | 'rider' | 'seller';

export interface User {
    id : string ;
    name : string ;
    email : string ;
    image : string ;
    role : string ;
}

export interface Location {
    latitude : number ;
    longitude : number ;
    formattedAddress : string ;
}   

export interface AppContextType {
  user: User | null ;
  loading: boolean;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  location : Location | null ;
  loadingLocation : boolean ;
  city : string ;
}
