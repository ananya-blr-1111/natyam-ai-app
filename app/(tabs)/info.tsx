import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { C, F } from '@/lib/analysis';

const NatyamAILogo = require('@/assets/images/natyam-logo-black.png');

type InfoItem = {
  id: 'about' | 'builder' | 'version';
  icon: any;
  label: string;
  sub: string;
};

const INFO_ITEMS: InfoItem[] = [
  { id: 'about',   icon: 'information-circle-outline', label: 'About This App',   sub: 'What is NatyamAI and how it works' },
  { id: 'builder', icon: 'person-circle-outline',      label: 'Meet the Builder', sub: 'The dancer behind the app' },
  { id: 'version', icon: 'layers-outline',             label: 'Version & Info',   sub: "What's new and legal info" },
];

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Profile cover (maroon hero band, matching natyam.dance) ── */}
        <View style={styles.cover}>
          <View style={styles.coverGradient} />
          <Image source={NatyamAILogo} style={styles.coverLogo} resizeMode="cover" />
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color={C.gold} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileEmail}>Bharatanatyam Student</Text>
              <Text style={styles.profileSub}>Analyses saved on this device</Text>
            </View>
          </View>
        </View>

        {/* ── My Analyses pill ── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.myAnalysesBtn}
            onPress={() => router.push('/(tabs)/analyses')}
            activeOpacity={0.85}
          >
            <Ionicons name="bar-chart-outline" size={18} color={C.maroonDeep} />
            <Text style={styles.myAnalysesBtnTxt}>My Analyses</Text>
            <Ionicons name="chevron-forward" size={16} color={C.maroonDeep} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* ── Information menu ── */}
        <Text style={styles.sectionLabel}>INFORMATION</Text>
        <View style={styles.menuGroup}>
          {INFO_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuRow,
                i === 0 && styles.menuRowFirst,
                i === INFO_ITEMS.length - 1 && styles.menuRowLast,
                i > 0 && styles.menuRowBorder,
              ]}
              onPress={() => router.push(`/info-detail?page=${item.id}`)}
              activeOpacity={0.75}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={20} color={C.maroon} />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={C.border} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>NatyamAI · Version 1.0.0</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 48 },

  // Cover — maroon gradient hero band, same feel as the natyam.dance headers
  cover: {
    height: 220, position: 'relative',
    justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 20,
    marginBottom: 24, overflow: 'hidden',
  },
  coverGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.maroon,
  },
  coverLogo: {
    position: 'absolute', top: 52, left: 20,
    width: 64, height: 64, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(227,194,122,0.4)',
  },
  avatarWrap: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar:     {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: C.maroonDeep, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: C.gold,
  },
  profileInfo:   {},
  profileEmail:  { fontSize: 15, fontWeight: '700', color: '#fff' },
  profileSub:    { fontSize: 12, color: C.goldSoft, marginTop: 2 },

  section: { paddingHorizontal: 20, marginBottom: 28 },

  myAnalysesBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.gold, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 18,
    shadowColor: C.gold, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  myAnalysesBtnTxt: { fontSize: 16, fontWeight: '700', color: C.maroonDeep },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: C.muted,
    letterSpacing: 1.5, marginBottom: 8, marginHorizontal: 20,
  },
  menuGroup: { marginHorizontal: 20 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: C.card, paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: C.border, borderTopWidth: 0,
  },
  menuRowFirst: { borderTopWidth: 1, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  menuRowLast:  { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  menuRowBorder: { borderTopWidth: 1, borderTopColor: C.border },
  menuIcon:  {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.goldFaint, alignItems: 'center', justifyContent: 'center',
  },
  menuText:  { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: C.text },
  menuSub:   { fontSize: 12, color: C.muted, marginTop: 2 },

  version: { textAlign: 'center', color: C.muted, fontSize: 12, marginTop: 36 },
});
