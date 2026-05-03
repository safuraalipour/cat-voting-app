import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useCats } from '../src/hooks/useCats';
import { CatCard } from '../src/components/CatCard';

export default function FeedScreen() {
  const { data: catList, isLoading, isError } = useCats();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading feed</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={catList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CatCard cat={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  list: {
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  }
});