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

import { AnimatedPressable } from '@/components/animated-pressable';
import { CtaButton } from '@/components/cta-button';
import {
  C, F, loadLocal,
  scoreColor, setupDatabase,
} from '@/lib/analysis';
import { analysisStore } from '@/store/analysisStore';

const NatyamAILogo   = require('@/assets/images/natyam-logo-white.png');
const AnanyaPortrait = require('@/assets/images/ananya-portrait.webp');
const { width } = Dimensions.get('window');
const TILE = 96;

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
  const recent = history.slice(0, 8);

  const openResult = (item: any) => {
    analysisStore.set({
      result: item.result, score: item.score,
      thumbnail: item.thumbnail, created_at: item.created_at,
    });
    router.push('/result');
  };

  return (
    <View style={styles.root}>
      {/* Big faded background logo watermark */}
      <View style={styles.bgLogoWrap} pointerEvents="none">
        <Image source={NatyamAILogo} style={styles.bgLogo} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.logoText}>NatyamAI</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={C.maroon} />
          </TouchableOpacity>
        </View>

        {/* ── About the creator ── */}
        <AnimatedPressable onPress={() => router.push('/info-detail?page=builder')} style={styles.creatorCard}>
          <Image source={AnanyaPortrait} style={styles.creatorPhoto} />
          <View style={styles.creatorText}>
            <Text style={styles.creatorName}>Ananya Sharma</Text>
            <Text style={styles.creatorRole}>Bharatanatyam dancer & creator of NatyamAI</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={C.muted} />
        </AnimatedPressable>

        {/* ── Prominent brand logo ── */}
        <View style={styles.brandLogoWrap}>
          <Image source={NatyamAILogo} style={styles.brandLogo} resizeMode="contain" />
        </View>

        {/* ── Purpose ── */}
        <View style={styles.purposeSection}>
          <Text style={styles.purposeTitle}>An AI Dance Coach in Your Pocket</Text>
          <Text style={styles.purposeText}>
            NatyamAI gives Bharatanatyam students instant, encouraging feedback on
            their <Text style={styles.hl}>posture &amp; mudra</Text>,{' '}
            <Text style={styles.hl}>abhinaya</Text> and <Text style={styles.hl}>laya</Text> —
            built by a dancer, for dancers. No login, no cloud — every video and
            analysis stays private on your own phone.
          </Text>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsCard}>
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

        <CtaButton
          label="New Analysis"
          icon="add-circle-outline"
          onPress={() => router.push('/analyze')}
          style={styles.analyzeBtn}
        />

        {/* ── Recent analyses (compact strip) ── */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Analyses</Text>
            {total > 0 && (
              <TouchableOpacity onPress={() => router.push('/(tabs)/analyses')}>
                <Text style={styles.seeAllLink}>See all →</Text>
              </TouchableOpacity>
            )}
          </View>

          {total > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentStrip}
            >
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
                        <Ionicons name="film-outline" size={20} color={C.border} />
                      </View>
                  }
                  <View style={styles.scoreBadge}>
                    <Text style={[styles.scoreNum, { color: scoreColor(item.score) }]}>
                      {item.score}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="videocam-outline" size={40} color={C.border} />
              <Text style={styles.emptySub}>Your analyses will appear here</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scrollContent: { flexGrow: 1 },

  bgLogoWrap: {
    position: 'absolute', top: -60, right: -140,
  },
  bgLogo: {
    width: width * 1.1, height: width * 1.1,
    opacity: 0.07,
  },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 58, paddingHorizontal: 16, paddingBottom: 14,
  },
  logoText: { fontSize: 28, fontFamily: F.serifBold, color: C.maroon, letterSpacing: 0.5 },
  iconBtn:  { padding: 4 },

  // Creator card
  creatorCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 16, marginBottom: 20,
    backgroundColor: C.card, borderRadius: 18, padding: 12,
    borderWidth: 1, borderColor: C.goldSoft,
  },
  creatorPhoto: {
    width: 56, height: 56, borderRadius: 28,
    borderWidth: 2, borderColor: C.gold,
  },
  creatorText: { flex: 1 },
  creatorName: { fontSize: 16, fontFamily: F.serifBold, color: C.text },
  creatorRole: { fontSize: 12, color: C.muted, marginTop: 2 },

  // Prominent brand logo
  brandLogoWrap: {
    alignItems: 'center', marginBottom: 22, paddingHorizontal: 40,
  },
  brandLogo: {
    width: 220, height: 220, borderRadius: 24,
    shadowColor: C.maroonDeep, shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 6,
  },

  // Purpose
  purposeSection: { paddingHorizontal: 16, marginBottom: 20 },
  purposeTitle: { fontSize: 21, fontFamily: F.serifBold, color: C.maroon, marginBottom: 8 },
  purposeText:  { fontSize: 14, color: C.text, lineHeight: 21 },
  hl: { color: C.goldText, fontWeight: '700' },

  // Stats
  statsCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginBottom: 16,
    backgroundColor: C.card2, borderRadius: 16, paddingVertical: 16,
    borderWidth: 1, borderColor: C.border,
  },
  statItem:    { flex: 1, alignItems: 'center', gap: 3 },
  statNum:     { fontSize: 22, fontFamily: F.serifBold, color: C.text },
  statLbl:     { fontSize: 11, color: C.muted, fontWeight: '500' },
  statDivider: { width: 1, height: 30, backgroundColor: C.border },

  analyzeBtn: { marginHorizontal: 16, marginBottom: 28, alignSelf: 'stretch' },

  // Recent strip (~bottom portion)
  recentSection: {
    borderTopWidth: 1, borderTopColor: C.border,
    paddingTop: 16, paddingBottom: 24,
  },
  recentHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginBottom: 10,
  },
  recentTitle: { fontSize: 13, fontWeight: '700', color: C.muted, letterSpacing: 1, textTransform: 'uppercase' },
  seeAllLink:  { fontSize: 13, color: C.goldText, fontWeight: '600' },

  recentStrip: { paddingHorizontal: 16, gap: 8 },
  tile:      { width: TILE, height: TILE, position: 'relative', borderRadius: 10, overflow: 'hidden' },
  tileImg:   { width: TILE, height: TILE },
  tileEmpty: { backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center' },
  scoreBadge: {
    position: 'absolute', bottom: 5, left: 5,
    backgroundColor: 'rgba(20,10,8,0.75)', borderRadius: 5,
    paddingHorizontal: 5, paddingVertical: 2,
  },
  scoreNum: { fontSize: 11, fontWeight: '800' },

  emptyState: { alignItems: 'center', paddingVertical: 18, gap: 8 },
  emptySub:   { fontSize: 13, color: C.muted },
});
