import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { fetchMovieDetails, getPosterUrl } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';
import { formatDate } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ navigation, route }: Props) {
  const { movieId } = route.params as { movieId: number };
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        if (mounted) {
          setMovie(data);
          navigation.setOptions({ title: data.title ?? 'Movie Details' });
        }
      } catch (err: any) {
        if (mounted) setError(err?.message ?? 'Failed to load movie details');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [movieId]);

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} />;
  if (!movie) return <ErrorView message="Movie not found" />;

  const releaseDate = movie.release_date ? formatDate(movie.release_date) : '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: getPosterUrl(movie.poster_path, 'w500') || undefined }} style={styles.poster} />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.meta}>
          {releaseDate}{movie.runtime ? ` • ${movie.runtime} min` : ''}
        </Text>
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
  poster: { width: '100%', height: 440, borderRadius: 8, backgroundColor: '#eee' },
  content: { marginTop: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  meta: { color: '#666', marginTop: 6 },
  genres: { marginTop: 8, color: '#444' },
  overview: { marginTop: 12, lineHeight: 20, color: '#222' },
});
