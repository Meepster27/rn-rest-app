import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { TMDB_LISTS } from '../data/tmdbLists';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  function renderItem({ item }: { item: any }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('List', { listId: item.id, title: item.title })}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={TMDB_LISTS}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f7',
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: '700' },
});
