import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchList, getPosterUrl } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';

type Props = NativeStackScreenProps<RootStackParamList, 'FamilyLove' | 'DramaLoveStories' | 'ComedyLoveStories'>;

export default function ListScreen({ navigation, route }: Props) {
  const { listId, title } = route.params;
  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data: any = await fetchList(listId);
        // TMDB user lists return 'items'; public endpoints return 'results'
        const listItems = data?.items ?? data?.results ?? [];
        if (mounted) setItems(listItems);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? 'Failed to load list');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [listId]);

  function renderItem({ item }: { item: any }) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Detail', { movieId: item.id })}>
        <Image source={{ uri: getPosterUrl(item.poster_path || item.poster, 'w185') || undefined }} style={styles.poster} />
        <View style={styles.meta}>
          <Text style={styles.title}>{item.title || item.name}</Text>
          <Text numberOfLines={2} style={styles.overview}>{item.overview || item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={(m) => String(m.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: '700', padding: 12 },
  row: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  poster: { width: 80, height: 120, borderRadius: 6, backgroundColor: '#eee' },
  meta: { marginLeft: 12, flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  overview: { color: '#666', marginTop: 6 },
});
