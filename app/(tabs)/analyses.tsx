import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { C, F, loadLocal, scoreColor, setupDatabase } from '@/lib/analysis';
import { analysisStore } from '@/store/analysisStore';

const { width } = Dimensions.get('window');
const TILE = Math.floor((width - 2) / 3);

export default function AnalysesScreen() {
  const router    = useRouter();

  const [history,    setHistory]    = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = useCallback(() => {
    setHistory(loadLocal());
  }, []);

  // Reload every time this tab regains focus (see index.tsx for why).
  useFocusEffect(
    useCallback(() => {
      setupDatabase();
      loadHistory();
      setLoading(false);
    }, [loadHistory])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    loadHistory();
    setRefreshing(false);
  };

  const openResult = (item: any) => {
    analysisStore.set({
      result:     item.result,
      score:      item.score,
      thumbnail:  item.thumbnail,
      created_at: item.created_at,
    });
    router.push('/result');
  };

  const renderTile = ({ item }: { item: any }) => {
    const color = scoreColor(item.score);
    return (
      <TouchableOpacity
        style={styles.tile}
        onPress={() => openResult(item)}
        activeOpacity={0.88}
      >
        {item.thumbnail
          ? <Image source={{ uri: item.thumbnail }} style={styles.tileImg} />
          : <View style={[styles.tileImg, styles.tileEmpty]}>
              <Ionicons name="film-outline" size={22} color={C.border} />
            </View>
        }
        <View style={styles.scoreBadge}>
          <Text style={[styles.scoreNum, { color }]}>{item.score}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analyses</Text>
        {history.length > 0 && (
          <Text style={styles.countTxt}>{history.length}</Text>
        )}
      </View>

      {/* ── Grid toggle bar ── */}
      <View style={styles.toggleBar}>
        <View style={styles.toggleActive}>
          <Ionicons name="grid" size={18} color={C.maroon} />
        </View>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={C.gold} />
        </View>
      ) : history.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="videocam-outline" size={56} color={C.border} />
          <Text style={styles.emptyTitle}>No analyses yet</Text>
          <Text style={styles.emptySub}>Tap + to analyze your first dance video</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/analyze')}>
            <Text style={styles.emptyBtnTxt}>+ New Analysis</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          numColumns={3}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderTile}
          columnWrapperStyle={{ gap: 1 }}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={C.gold}
            />
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingTop: 60, paddingHorizontal: 16, paddingBottom: 12,
  },
  headerTitle: { fontSize: 24, fontFamily: F.serifBold, color: C.maroon },
  countTxt:    { fontSize: 14, color: C.muted, fontWeight: '500' },

  toggleBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5, borderTopColor: C.border,
    borderBottomWidth: 0.5, borderBottomColor: C.border,
    height: 44, alignItems: 'center',
    marginBottom: 1,
  },
  toggleActive: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderBottomWidth: 1.5, borderBottomColor: C.maroon, height: '100%',
  },

  centered:   { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 18, fontFamily: F.serifBold, color: C.text },
  emptySub:   { fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 21 },
  emptyBtn:   {
    backgroundColor: C.gold, borderRadius: 30,
    paddingVertical: 12, paddingHorizontal: 26, marginTop: 4,
  },
  emptyBtnTxt: { fontSize: 13, fontWeight: '700', color: C.maroonDeep, letterSpacing: 0.5 },

  tile:      { width: TILE, height: TILE, position: 'relative' },
  tileImg:   { width: TILE, height: TILE },
  tileEmpty: { backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center' },
  scoreBadge: {
    position: 'absolute', bottom: 6, left: 6,
    backgroundColor: 'rgba(20,10,8,0.75)', borderRadius: 5,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  scoreNum: { fontSize: 12, fontWeight: '800' },
});
