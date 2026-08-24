import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  C, formatDate, parseSection, parseSummary, scoreColor, scoreLabel,
} from '@/lib/analysis';
import { analysisStore } from '@/store/analysisStore';

const Logo = require('@/assets/images/NatyamAIlogo.png');

// ─── Collapsible section ──────────────────────────────────────────────────────
function Section({ title, icon, color, items, numbered }: {
  title: string; icon: any; color: string; items: string[]; numbered?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.secWrap}>
      <TouchableOpacity style={styles.secHeader} onPress={() => setOpen(v => !v)} activeOpacity={0.8}>
        <View style={styles.secLeft}>
          <View style={[styles.secIconBox, { backgroundColor: color + '18' }]}>
            <Ionicons name={icon} size={15} color={color} />
          </View>
          <Text style={[styles.secTitle, { color }]}>{title}</Text>
          <View style={[styles.secBadge, { backgroundColor: color + '22' }]}>
            <Text style={[styles.secBadgeTxt, { color }]}>{items.length}</Text>
          </View>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={15} color={C.muted} />
      </TouchableOpacity>
      {open && (
        <View style={styles.secBody}>
          {items.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletMark, { color }]}>{numbered ? `${i + 1}.` : '•'}</Text>
              <Text style={styles.bulletTxt}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function ResultScreen() {
  const router = useRouter();
  const data   = analysisStore.get();

  if (!data) {
    return (
      <View style={styles.emptyRoot}>
        <Text style={styles.emptyTxt}>No result to display.</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.emptyLink}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { result, score, thumbnail, created_at } = data;
  const issues       = parseSection(result, 'POSTURE ISSUES');
  const strengths    = parseSection(result, 'DOING WELL');
  const improvements = parseSection(result, 'TOP 3 IMPROVEMENTS');
  const summary      = parseSummary(result);
  const color        = scoreColor(score);

  const doShare = () =>
    Share.share({ message: `My Bharatnatyam Posture Score: ${score}/100\n\n${result}` });

  return (
    <View style={styles.root}>
      {/* Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Analysis Result</Text>
        <TouchableOpacity style={styles.backBtn} onPress={doShare}>
          <Ionicons name="share-outline" size={20} color={C.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Share card (screenshot-friendly) ── */}
        <View style={styles.shareCard}>
          <View style={styles.shareCardTop}>
            <Image source={Logo} style={styles.shareCardLogo} resizeMode="contain" />
            <Text style={styles.shareCardDate}>{formatDate(created_at)}</Text>
          </View>

          {thumbnail
            ? <Image source={{ uri: thumbnail }} style={styles.shareThumb} />
            : null
          }

          {/* Score + stats */}
          <View style={styles.scoreRow}>
            <View style={[styles.scoreBadge, { borderColor: color }]}>
              <Text style={[styles.scoreBig, { color }]}>{score}</Text>
              <Text style={styles.scoreOf}>/100</Text>
            </View>
            <View style={styles.scoreRight}>
              <Text style={[styles.scoreWord, { color }]}>{scoreLabel(score)}</Text>
              <View style={styles.statRow}>
                <View style={styles.statPill}>
                  <Ionicons name="alert-circle-outline" size={12} color={C.red} />
                  <Text style={[styles.statNum, { color: C.red }]}>{issues.length}</Text>
                  <Text style={styles.statLbl}>Issues</Text>
                </View>
                <View style={styles.statPill}>
                  <Ionicons name="checkmark-circle-outline" size={12} color={C.green} />
                  <Text style={[styles.statNum, { color: C.green }]}>{strengths.length}</Text>
                  <Text style={styles.statLbl}>Strengths</Text>
                </View>
                <View style={styles.statPill}>
                  <Ionicons name="arrow-up-circle-outline" size={12} color={C.gold} />
                  <Text style={[styles.statNum, { color: C.gold }]}>{improvements.length}</Text>
                  <Text style={styles.statLbl}>Tips</Text>
                </View>
              </View>
            </View>
          </View>

          {summary ? (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTxt}>{summary}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.shareBtn} onPress={doShare} activeOpacity={0.85}>
            <Ionicons name="share-social-outline" size={16} color={C.bg} />
            <Text style={styles.shareBtnTxt}>Share Result</Text>
          </TouchableOpacity>
        </View>

        {/* ── Expandable breakdown ── */}
        <Text style={styles.breakdownLabel}>DETAILED BREAKDOWN</Text>

        {issues.length > 0 && (
          <Section title="Posture Issues" icon="alert-circle-outline" color={C.red} items={issues} />
        )}
        {strengths.length > 0 && (
          <Section title="Doing Well" icon="checkmark-circle-outline" color={C.green} items={strengths} />
        )}
        {improvements.length > 0 && (
          <Section title="Top Improvements" icon="arrow-up-circle-outline" color={C.gold} items={improvements} numbered />
        )}

        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => { analysisStore.clear(); router.push('/analyze'); }}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={18} color={C.gold} />
          <Text style={styles.newBtnTxt}>New Analysis</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: C.bg },
  emptyRoot: { flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTxt:  { color: C.muted, fontSize: 16 },
  emptyLink: { color: C.gold, fontSize: 15, fontWeight: '700' },

  navBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
  },
  backBtn:  {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.card, alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { fontSize: 17, fontWeight: '700', color: C.text },

  content: { paddingHorizontal: 16, paddingBottom: 60, paddingTop: 8 },

  shareCard: {
    backgroundColor: C.card, borderRadius: 24,
    borderWidth: 1, borderColor: C.border, padding: 20, marginBottom: 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12 },
      android: { elevation: 8 },
    }),
  },
  shareCardTop:  {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  shareCardLogo: { width: 120, height: 36 },
  shareCardDate: { fontSize: 11, color: C.muted },
  shareThumb:    { width: '100%', height: 160, borderRadius: 14, marginBottom: 16 },

  scoreRow:  { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 16 },
  scoreBadge: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 3,
    alignItems: 'center', justifyContent: 'center',
  },
  scoreBig:  { fontSize: 38, fontWeight: '900', lineHeight: 44 },
  scoreOf:   { fontSize: 11, color: C.muted, marginTop: 2 },
  scoreRight: { flex: 1 },
  scoreWord:  { fontSize: 17, fontWeight: '700', marginBottom: 10 },

  statRow:  { flexDirection: 'row', gap: 6 },
  statPill: {
    flex: 1, backgroundColor: C.card2, borderRadius: 10,
    paddingVertical: 7, alignItems: 'center', gap: 2,
    borderWidth: 1, borderColor: C.border,
  },
  statNum: { fontSize: 15, fontWeight: '800' },
  statLbl: { fontSize: 9, color: C.muted, fontWeight: '600', textTransform: 'uppercase' },

  summaryBox: {
    backgroundColor: C.card2, borderRadius: 12, padding: 14,
    borderLeftWidth: 3, borderLeftColor: C.purple, marginBottom: 16,
  },
  summaryTxt: { color: C.text, fontSize: 14, lineHeight: 22 },

  shareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: C.gold, borderRadius: 14, height: 48,
    borderBottomWidth: 3, borderBottomColor: C.goldDark,
  },
  shareBtnTxt: { fontSize: 15, fontWeight: '800', color: C.bg },

  breakdownLabel: {
    fontSize: 11, fontWeight: '700', color: C.muted,
    letterSpacing: 1.5, marginBottom: 12, marginLeft: 4,
  },

  secWrap:   { backgroundColor: C.card, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  secHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  secLeft:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  secIconBox: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  secTitle:  { fontSize: 14, fontWeight: '700' },
  secBadge:  { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  secBadgeTxt: { fontSize: 12, fontWeight: '700' },
  secBody:   { paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: C.border },

  bulletRow:  { flexDirection: 'row', paddingTop: 10, gap: 8 },
  bulletMark: { fontSize: 14, fontWeight: '700', marginTop: 1, minWidth: 18 },
  bulletTxt:  { flex: 1, color: C.text, fontSize: 14, lineHeight: 22 },

  newBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: C.card, borderRadius: 14, height: 52,
    borderWidth: 1, borderColor: C.border, marginTop: 16,
  },
  newBtnTxt: { fontSize: 15, fontWeight: '700', color: C.gold },
});
