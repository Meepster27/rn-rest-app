import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchMovieDetails, getPosterUrl } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { movieId } = route.params as { movieId: number };
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        if (mounted) setMovie(data);
      } catch (err) {
        console.error('Failed loading movie details', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [movieId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!movie) return <View style={styles.center}><Text>Movie not found</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: getPosterUrl(movie.poster_path, 'w500') || undefined }} style={styles.poster} />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.meta}>{movie.release_date} • {movie.runtime ? movie.runtime + ' min' : ''}</Text>
        {movie.genres?.length ? (
          <Text style={styles.genres}>
            {movie.genres.map((g: any) => g.name).join(', ')}
          </Text>
        ) : null}
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  poster: { width: '100%', height: 440, borderRadius: 8, backgroundColor: '#eee' },
  content: { marginTop: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  meta: { color: '#666', marginTop: 6 },
  genres: { marginTop: 8, color: '#444' },
  overview: { marginTop: 12, lineHeight: 20, color: '#222' },
});
