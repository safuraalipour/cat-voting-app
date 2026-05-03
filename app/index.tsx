import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useMyUploadedCats } from '../src/hooks/useCats';
import { CatCard } from '../src/components/CatCard';

export default function HomeScreen() {
  const { data, isLoading } = useMyUploadedCats();

  if (isLoading) return <ActivityIndicator style={{flex: 1}} size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        key={2} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatCard cat={item} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No cats yet. Upload one!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  list: { padding: 8 },
  row: { justifyContent: 'space-between', marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 50, color: '#666' }
});