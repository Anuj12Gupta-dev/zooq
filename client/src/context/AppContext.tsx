import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { authservice } from '../main';
import type { AppContextType, Location, User } from '../types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [location, setLocation] = useState<Location | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [city, setCity] = useState<string>("Fetching Location");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      setLoading(true);

      const { data } = await axios.get(`${authservice}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.user) {
        setUser(data.user);
        setIsAuth(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
  if (!navigator.geolocation) {
    console.log("first")
    setLoadingLocation(false);
    setCity("Geolocation not supported");
    return;
  }

  setLoadingLocation(true);
  let cancelled = false;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      console.log("second")
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "User-Agent": "your-app-name/1.0"
            }
          }
        );

        const data = await res.json();
        if (cancelled) return;

        setLocation({
          latitude,
          longitude,
          formattedAddress: data.display_name || "current location",
        });

        const address = data.address || {};
        setCity(
          address.city ||
          address.town ||
          address.village ||
          "current location"
        );

      } catch (err) {
        if (cancelled) return;

        setLocation({ latitude, longitude, formattedAddress: "current location" });
        setCity("Failed to load city");
      } finally {
        if (!cancelled) setLoadingLocation(false);
      }
    },
    () => {
      // Geolocation error (permission denied, timeout, etc.)
      if (!cancelled) {
        setLoadingLocation(false);
        setCity("Location permission denied");
      }
    }
  );

  return () => {
    cancelled = true;
  };
}, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        isAuth,
        setIsAuth,
        setLoading,
        setUser,
        location,
        loadingLocation,
        city
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppData must be used within AppProvider');
  }
  return context;
};