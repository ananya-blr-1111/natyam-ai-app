import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CtaButton } from '@/components/cta-button';
import {
  C, F, loadLocal,
  scoreColor, setupDatabase,
} from '@/lib/analysis';
import { analysisStore } from '@/store/analysisStore';

const NatyamAILogo = require('@/assets/images/natyam-logo-white.png');
const { width } = Dimensions.get('window');
const TILE = Math.floor((width - 2) / 3);

export default function HomeScreen() {
  const router    = useRouter();

  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = useCallback(() => {
    setHistory(loadLocal());
  }, []);

  // Reload every time this tab regains focus, not just on first mount —
  // otherwise a freshly-saved analysis never shows up here after returning
  // from the analyze/result flow, since expo-router keeps tabs mounted.
  useFocusEffect(
    useCallback(() => {
      setupDatabase();
      loadHistory();
    }, [loadHistory])
  );

  const total  = history.length;
  const avg    = total ? Math.round(history.reduce((s, h) => s + h.score, 0) / total) : 0;
  const best   = total ? Math.max(...history.map(h => h.score)) : 0;
  const recent = history.slice(0, 6);

  const openResult = (item: any) => {
    analysisStore.set({
      result: item.result, score: item.score,
      thumbnail: item.thumbnail, created_at: item.created_at,
    });
    router.push('/result');
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.logoText}>NatyamAI</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={C.maroon} />
          </TouchableOpacity>
        </View>

        {/* ── Profile strip (Instagram-style) ── */}
        <View style={styles.profileStrip}>
          <View style={styles.avatarRing}>
            <Image source={NatyamAILogo} style={styles.avatar} resizeMode="cover" />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{total}</Text>
              <Text style={styles.statLbl}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, total > 0 && { color: scoreColor(avg) }]}>{avg}</Text>
              <Text style={styles.statLbl}>Avg Score</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, total > 0 && { color: C.green }]}>{best}</Text>
              <Text style={styles.statLbl}>Best</Text>
            </View>
          </View>
        </View>

        {/* ── Bio ── */}
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Bharatanatyam AI Coach</Text>
          <Text style={styles.bioText}>AI feedback on your posture, mudra, abhinaya & rhythm</Text>
          <CtaButton
            label="New Analysis"
            icon="add-circle-outline"
            onPress={() => router.push('/analyze')}
            style={styles.analyzeBtn}
          />
        </View>

        {/* ── Grid toggle bar ── */}
        <View style={styles.toggleBar}>
          <View style={styles.toggleActive}>
            <Ionicons name="grid-outline" size={20} color={C.maroon} />
          </View>
          <TouchableOpacity
            style={styles.toggleInactive}
            onPress={() => router.push('/(tabs)/analyses')}
          >
            <Ionicons name="list-outline" size={22} color={C.muted} />
          </TouchableOpacity>
        </View>

        {/* ── Grid content ── */}
        {total > 0 ? (
          <>
            {recent.length > 3 && (
              <View style={styles.seeAllRow}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/analyses')}>
                  <Text style={styles.seeAllLink}>See all {total} analyses →</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.grid}>
              {recent.map((item, idx) => (
                <TouchableOpacity
                  key={item.id ?? idx}
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
                    <Text style={[styles.scoreNum, { color: scoreColor(item.score) }]}>
                      {item.score}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="videocam-outline" size={56} color={C.border} />
            <Text style={styles.emptyTitle}>No analyses yet</Text>
            <Text style={styles.emptySub}>Tap the + below to upload your first dance video</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 58, paddingHorizontal: 16, paddingBottom: 10,
  },
  logoText: { fontSize: 28, fontFamily: F.serifBold, color: C.maroon, letterSpacing: 0.5 },
  iconBtn:  { padding: 4 },

  // Profile strip
  profileStrip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 16,
  },
  avatarRing: {
    width: 84, height: 84, borderRadius: 42,
    padding: 2,
    borderWidth: 2, borderColor: C.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: { width: 76, height: 76, borderRadius: 38 },
  statsRow: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-around',
  },
  statItem:    { alignItems: 'center', gap: 3 },
  statNum:     { fontSize: 22, fontFamily: F.serifBold, color: C.text },
  statLbl:     { fontSize: 11, color: C.muted, fontWeight: '500' },
  statDivider: { width: 1, height: 30, backgroundColor: C.border },

  // Bio
  bioSection: { paddingHorizontal: 16, paddingBottom: 18, gap: 3 },
  bioTitle:   { fontSize: 15, fontWeight: '700', color: C.text },
  bioText:    { fontSize: 13, color: C.muted, fontStyle: 'italic', lineHeight: 19, marginBottom: 4 },
  analyzeBtn: { alignSelf: 'flex-start', height: 40, paddingHorizontal: 20, marginTop: 8 },

  // Toggle bar (like Instagram's grid/tag toggle)
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
  toggleInactive: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    height: '100%',
  },

  seeAllRow: {
    paddingHorizontal: 16, paddingVertical: 10,
    alignItems: 'flex-end',
  },
  seeAllLink: { fontSize: 13, color: C.goldText, fontWeight: '600' },

  // Instagram grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
  },
  tile:      { width: TILE, height: TILE, position: 'relative' },
  tileImg:   { width: TILE, height: TILE },
  tileEmpty: { backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center' },
  scoreBadge: {
    position: 'absolute', bottom: 6, left: 6,
    backgroundColor: 'rgba(20,10,8,0.75)', borderRadius: 5,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  scoreNum: { fontSize: 13, fontWeight: '800' },

  // Empty state
  emptyState: {
    alignItems: 'center', paddingTop: 60, paddingBottom: 48, gap: 12,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 18, fontFamily: F.serifBold, color: C.text },
  emptySub:   { fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 21 },
});
