import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Heart, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { Cat } from '../types';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32) / 2;  

export const CatCard = ({ cat }: { cat: Cat }) => {
  const [score, setScore] = useState(0);
  const [isFav, setIsFav] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={cat.url}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        
        <View style={styles.actionRow}>
          <View style={styles.voteBox}>
            <TouchableOpacity onPress={() => setScore(s => s + 1)} style={styles.iconBtn}>
              <ThumbsUp size={18} color={score > 0 ? "#4CAF50" : "#666"} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setScore(s => s - 1)} style={styles.iconBtn}>
              <ThumbsDown size={18} color={score < 0 ? "#F44336" : "#666"} />
            </TouchableOpacity>
          </View>

          {/* لایک/فاوورایت (Requirement 3) */}
          <TouchableOpacity onPress={() => setIsFav(!isFav)} style={styles.iconBtn}>
            <Heart size={20} color={isFav ? "#E91E63" : "#666"} fill={isFav ? "#E91E63" : "none"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 4, 
    width: cardWidth,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: cardWidth, // تصویر به صورت مربع در گرید
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteBox: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    padding: 4,
  }
});