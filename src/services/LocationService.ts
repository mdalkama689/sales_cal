import { Location } from '../types';

class LocationService {
  async getUserLocation(): Promise<Location | null> {
    try {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser.');
        return null;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      console.log('Location coordinates obtained:', position.coords);
      
      return await new Promise<Location>((resolve) => {
        setTimeout(() => {
          resolve({ 
            state: 'Maharashtra'
          });
        }, 1000);
      });
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  async getLocationByZipCode(zipCode: string): Promise<Location | null> {
    try {
      return await new Promise<Location>((resolve) => {
        setTimeout(() => {
          const zipMappings: Record<string, Location> = {
            '400001': { state: 'Maharashtra', city: 'Mumbai', zipCode: '400001' },
            '110001': { state: 'Delhi', city: 'New Delhi', zipCode: '110001' },
            '600001': { state: 'Tamil Nadu', city: 'Chennai', zipCode: '600001' },
            '700001': { state: 'West Bengal', city: 'Kolkata', zipCode: '700001' },
            '560001': { state: 'Karnataka', city: 'Bangalore', zipCode: '560001' }
          };

          resolve(zipMappings[zipCode] || { state: 'Maharashtra', zipCode });
        }, 500);
      });
    } catch (error) {
      console.error('Error getting location by ZIP code:', error);
      return null;
    }
  }
}

export default new LocationService();