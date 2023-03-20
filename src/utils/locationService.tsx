const LocationService = () => {
  let subscribers: any[] = [];
  let location = {
    latitude: 0,
    longitude: 0,
  };

  return {
    subscribe: (sub: any) => subscribers.push(sub),
    setLocation: (coords: { latitude: number; longitude: number }) => {
      location = coords;
      subscribers.forEach((sub) => sub(location));
    },
    getLocation: () => location,
  };
};

export const locationService = LocationService();
