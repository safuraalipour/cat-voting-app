import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Heart, ArrowBigUp, ArrowBigDown } from 'lucide-react-native';
import { catApi } from '../api/catApi';
import { Cat } from '../types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 24) / 2;

export const CatCard = ({ cat }: { cat: Cat }) => {
  const [score, setScore] = useState(0); 
  const [isFav, setIsFav] = useState(false);
  const [favId, setFavId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: allVotes } = await catApi.getVotes(cat.id);
        
        const thisCatVotes = allVotes.filter((vote: any) => vote.image_id === cat.id);
        
        const calculatedScore = thisCatVotes.reduce((acc: number, vote: any) => 
          acc + (vote.value === 1 ? 1 : -1), 0
        );
        setScore(calculatedScore);

        const { data: allFavs } = await catApi.getFavourites(cat.id);
        
        const thisCatFavs = allFavs.filter((fav: any) => fav.image_id === cat.id);
        if (thisCatFavs && thisCatFavs.length > 0) {
          setIsFav(true);
          setFavId(thisCatFavs[0].id);
        }
      } catch (error) {
        console.error('Error fetching stats for cat:', cat.id);
      }
    };

    fetchStats();
  }, [cat.id]);

  const handleVote = async (value: number) => {
    try {
      await catApi.vote(cat.id, value);
      setScore(prev => prev + (value === 1 ? 1 : -1));
    } catch (error) {
      console.error('Vote failed', error);
    }
  };

  const toggleFavourite = async () => {
    try {
      if (!isFav) {
        const { data } = await catApi.favourite(cat.id);
        setFavId(data.id);
        setIsFav(true);
      } else if (favId) {
        await catApi.unfavourite(favId);
        setFavId(null);
        setIsFav(false);
      }
    } catch (error) {
      console.error('Action failed', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={cat.url} style={styles.image} contentFit="cover" transition={300} />
      
      <View style={styles.info}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        
        <View style={styles.actions}>
          <View style={styles.votes}>
            <TouchableOpacity onPress={() => handleVote(1)}>
              <ArrowBigUp size={24} color="#4CAF50" fill={score > 0 ? "#4CAF50" : "none"} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleVote(0)}>
              <ArrowBigDown size={24} color="#F44336" fill={score < 0 ? "#F44336" : "none"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={toggleFavourite}>
            <Heart 
              size={24} 
              color={isFav ? "#E91E63" : "#666"} 
              fill={isFav ? "#E91E63" : "none"} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: cardWidth,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  image: { width: '100%', height: cardWidth },
  info: { padding: 12 },
  scoreText: { fontWeight: 'bold', marginBottom: 8, fontSize: 14, color: '#333' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  votes: { flexDirection: 'row', gap: 12 }
});