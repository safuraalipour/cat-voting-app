import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { Cat } from '../types'

export const useMyUploadedCats = () => {
    return useQuery({
      queryKey: ['my-uploads'],
      queryFn: async () => {
        const response = await apiClient.get<Cat[]>('/images/?limit=10&order=DESC');
        return response.data;
      },
    });
};