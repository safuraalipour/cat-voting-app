import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { Cat } from '../types'

export const useCats = () => {
    return useQuery({
    queryKey: ['cats'],
    queryFn: async () => {
        const response = await apiClient.get<Cat[]>('/images/search?limit=20');
        return response.data;
    }
});
}