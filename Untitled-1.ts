cat > src/screens/HomeScreen.tsx <<'EOF'
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import { fetchPopularMovies, getPosterUrl } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    try {
      setRefreshing(true);
      const data: any = await fetchPopularMovies();
      // service may return either an array or an object with results
      const items = Array.isArray(data) ? data : data?.results ?? [];
      setMovies(items);
    } catch (err) {
      console.error('Failed loading movies', err);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function renderItem({ item }: { item: any }) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('Detail', { movieId: item.id })}
      >
        <Image
          source={{ uri: getPosterUrl(item.poster_path, 'w185') || undefined }}
          style={styles.poster}
        />
        <View style={styles.meta}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={3} style={styles.overview}>
            {item.overview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(m) => String(m.id)}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  poster: { width: 80, height: 120, borderRadius: 6, backgroundColor: '#eee' },
  meta: { marginLeft: 12, flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  overview: { color: '#666', marginTop: 6 },
});
EOF