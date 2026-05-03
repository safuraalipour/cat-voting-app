import { apiClient } from './client';

export const catApi = {
  favourite: (imageId: string) => 
    apiClient.post('/favourites', { image_id: imageId, sub_id: 'user_123' }),
  
  unfavourite: (favouriteId: number) => 
    apiClient.delete(`/favourites/${favouriteId}`),

  vote: (imageId: string, value: number) => 
    apiClient.post('/votes', { image_id: imageId, sub_id: 'user_123', value }),

  getVotes: (imageId: string) => 
    apiClient.get(`/votes?image_id=${imageId}`),
    
  getFavourites: (imageId: string) => 
    apiClient.get(`/favourites?image_id=${imageId}&sub_id=user_123`)
};