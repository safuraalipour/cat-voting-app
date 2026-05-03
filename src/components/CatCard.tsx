import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Heart } from 'lucide-react-native';
import { Cat } from '../types';

const { width } = Dimensions.get('window');

export const CatCard = ({ cat }: { cat: Cat }) => {

  const [score, setScore] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={cat.url}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.actions}>
        <View style={styles.voteContainer}>
          <TouchableOpacity onPress={() => setScore(i => i + 1)} style={styles.button}>
            <ThumbsUp color={score > 0 ? "#4CAF50" : "#333"} size={28} />
          </TouchableOpacity>
          
          <Text style={styles.score}>{score}</Text>
          
          <TouchableOpacity onPress={() => setScore(i => i - 1)} style={styles.button}>
            <ThumbsDown color={score < 0 ? "#F44336" : "#333"} size={28} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.button}>
          <Heart 
            color={isFavorite ? "#E91E63" : "#333"} 
            fill={isFavorite ? "#E91E63" : "transparent"} 
            size={28} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: width * 0.8, 
    backgroundColor: '#f0f0f0',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  button: {
    padding: 4,
  }
});