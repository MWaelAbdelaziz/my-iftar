import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClient';
import qs from 'qs';

export type ApiRequest = {
  latitude: number;
  longitude: number;
  method: number;
  shafaq: string;
  tune: number[];
  calendarMethod: string;
};

type ApiStatus = {
  code: number;
  status: string;
};

export type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
};

// TODO: For v2
type ApiResponse = ApiStatus & {
  data: {
    timings: Timings;
    date: {
      readable: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
          days: number;
        };
        year: string;
      };
    };
  };
};

export const useGetPrayerTimes = (
  enabled: boolean,
  date: string,
  queries: ApiRequest
) => {
  return useQuery<Timings, Error>({
    queryKey: [queries, date],
    queryFn: async () => {
      const queryString = qs.stringify(queries, { arrayFormat: 'comma' });
      const response = await apiClient.get(`/timings/${date}?${queryString}`);
      return response.data.data.timings;
    },
    enabled,
    retry: false,
  });
};
