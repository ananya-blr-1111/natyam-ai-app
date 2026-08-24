import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CtaButton } from '@/components/cta-button';
import {
  C, F, analyzeWithClaude, extractFrames, extractScore, saveLocal,
} from '@/lib/analysis';
import { analysisStore } from '@/store/analysisStore';

export default function AnalyzeScreen() {
  const router    = useRouter();

  const [videoUri,  setVideoUri]  = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const pickVideo = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow access to your video library.');
      return;
    }
    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: false,
      quality: 1,
    });
    if (!picked.canceled) {
      setVideoUri(picked.assets[0].uri);
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(picked.assets[0].uri, { time: 1000 });
        setThumbnail(uri);
      } catch { setThumbnail(null); }
    }
  };

  const analyze = async () => {
    if (!videoUri) return;
    setAnalyzing(true);
    try {
      const frames = await extractFrames(videoUri);
      if (!frames.length) {
        Alert.alert('Error', 'Could not extract frames from video.');
        return;
      }
      const result = await analyzeWithClaude(frames);
      const score  = extractScore(result);
      const now    = new Date().toISOString();

      saveLocal(score, thumbnail ?? '', result);

      analysisStore.set({ result, score, thumbnail, created_at: now });
      router.replace('/result');
    } catch (e: any) {
      Alert.alert('Analysis Failed', e?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Nav bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={C.maroon} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>New Analysis</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Upload / preview zone */}
        {!thumbnail ? (
          <TouchableOpacity style={styles.uploadZone} onPress={pickVideo} activeOpacity={0.85}>
            <View style={styles.uploadIconRing}>
              <Ionicons name="cloud-upload-outline" size={48} color={C.gold} />
            </View>
            <Text style={styles.uploadTitle}>Upload Dance Video</Text>
            <Text style={styles.uploadSub}>
              Choose a practice clip or performance from your library —{'\n'}
              your AI coach will watch it and give you feedback in moments
            </Text>
            <View style={styles.uploadHint}>
              <Ionicons name="film-outline" size={13} color={C.muted} />
              <Text style={styles.uploadHintTxt}>MP4 · MOV · Best in good lighting</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.previewCard}>
            <Image source={{ uri: thumbnail }} style={styles.previewThumb} />
            <View style={styles.previewBar}>
              <View style={styles.previewReady}>
                <Ionicons name="checkmark-circle" size={18} color={C.green} />
                <Text style={styles.previewReadyTxt}>Video Ready</Text>
              </View>
              <TouchableOpacity style={styles.changeBtn} onPress={pickVideo}>
                <Ionicons name="swap-horizontal-outline" size={14} color={C.maroon} />
                <Text style={styles.changeBtnTxt}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Action */}
        {!analyzing && (
          <CtaButton
            label={videoUri ? 'Analyse My Dance' : 'Select Video'}
            icon={videoUri ? 'scan-outline' : 'folder-open-outline'}
            variant={videoUri ? 'primary' : 'outline'}
            onPress={videoUri ? analyze : pickVideo}
            style={styles.actionBtn}
          />
        )}

        {/* Loading */}
        {analyzing && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={C.gold} />
            <Text style={styles.loadingTxt}>Analysing your performance...</Text>
            <Text style={styles.loadingSubTxt}>Extracting frames  ·  Consulting your AI coach</Text>
          </View>
        )}

        {/* How we analyse */}
        <View style={styles.analyseCard}>
          <Text style={styles.analyseTitle}>How NatyamAI Analyses Your Dance</Text>
          <Text style={styles.analyseIntro}>
            We sample a handful of frames from your video and have Claude AI —
            trained to look at your performance the way a teacher would — study
            them for:
          </Text>
          {[
            { icon: 'body-outline',            title: 'Posture & Mudra', desc: "Body alignment, stance and hand gestures against correct form" },
            { icon: 'happy-outline',           title: 'Abhinaya',        desc: 'Facial expression and how clearly your emotion (bhava) comes across' },
            { icon: 'pulse-outline',           title: 'Laya',            desc: 'Rhythmic precision and timing, and where footwork drifts off-beat' },
            { icon: 'sparkles-outline',        title: 'Personalised Feedback', desc: 'A score, what’s working, and your top 3 things to practise next' },
          ].map((row, i) => (
            <View key={i} style={styles.analyseRow}>
              <View style={styles.analyseIconBox}>
                <Ionicons name={row.icon as any} size={17} color={C.maroon} />
              </View>
              <View style={styles.analyseRowText}>
                <Text style={styles.analyseRowTitle}>{row.title}</Text>
                <Text style={styles.analyseRowDesc}>{row.desc}</Text>
              </View>
            </View>
          ))}
          <View style={styles.privacyNote}>
            <Ionicons name="lock-closed-outline" size={13} color={C.muted} />
            <Text style={styles.privacyNoteTxt}>
              Only a few still frames are sent securely for analysis — your video
              itself never leaves your phone, and results are saved only on your device.
            </Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>For best results</Text>
          {[
            'Full body visible in frame',
            'Good lighting, clear background',
            'Minimum 5 seconds of performance',
            'Shoot in portrait mode',
            'Face the camera as much as possible',
            'Avoid busy or moving backgrounds',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={C.maroon} />
              <Text style={styles.tipTxt}>{tip}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: C.bg },
  navBar:  {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
  },
  backBtn:  {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { fontSize: 18, fontFamily: F.serifBold, color: C.maroon },

  content: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 8 },

  uploadZone: {
    borderWidth: 1.5, borderColor: C.gold, borderStyle: 'dashed',
    borderRadius: 24, paddingVertical: 48, paddingHorizontal: 24,
    alignItems: 'center', backgroundColor: C.card2, marginBottom: 20,
  },
  uploadIconRing: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: C.goldFaint, borderWidth: 1.5, borderColor: C.gold,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  uploadTitle:   { fontSize: 20, fontFamily: F.serifBold, color: C.text, marginBottom: 8 },
  uploadSub:     { fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  uploadHint:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  uploadHintTxt: { fontSize: 12, color: C.muted },

  previewCard: {
    borderRadius: 20, overflow: 'hidden',
    borderWidth: 1, borderColor: C.border, marginBottom: 20,
  },
  previewThumb:     { width: '100%', height: 220 },
  previewBar:       {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.card,
  },
  previewReady:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  previewReadyTxt: { color: C.green, fontSize: 14, fontWeight: '600' },
  changeBtn:       { flexDirection: 'row', alignItems: 'center', gap: 4 },
  changeBtnTxt:    { color: C.maroon, fontSize: 13, fontWeight: '600' },

  actionBtn: { marginBottom: 28, alignSelf: 'stretch' },

  loadingBox:    { alignItems: 'center', paddingVertical: 32, marginBottom: 20 },
  loadingTxt:    { color: C.maroon, fontSize: 16, fontFamily: F.serifBold, marginTop: 14 },
  loadingSubTxt: { color: C.muted, fontSize: 13, marginTop: 6 },

  analyseCard: {
    backgroundColor: C.card, borderRadius: 18, padding: 18,
    borderWidth: 1, borderColor: C.goldSoft, marginBottom: 20,
  },
  analyseTitle: { fontSize: 17, fontFamily: F.serifBold, color: C.maroon, marginBottom: 8 },
  analyseIntro: { fontSize: 13, color: C.muted, lineHeight: 19, marginBottom: 16 },
  analyseRow:   { flexDirection: 'row', gap: 12, marginBottom: 14 },
  analyseIconBox: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: C.goldFaint, alignItems: 'center', justifyContent: 'center',
  },
  analyseRowText:  { flex: 1 },
  analyseRowTitle: { fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 2 },
  analyseRowDesc:  { fontSize: 12.5, color: C.muted, lineHeight: 18 },
  privacyNote: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-start',
    borderTopWidth: 1, borderTopColor: C.border, paddingTop: 14, marginTop: 2,
  },
  privacyNoteTxt: { flex: 1, fontSize: 12, color: C.muted, lineHeight: 17 },

  tipsCard:  {
    backgroundColor: C.card, borderRadius: 16, padding: 18,
    borderWidth: 1, borderColor: C.border,
  },
  tipsTitle: { color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.2, marginBottom: 14, textTransform: 'uppercase' },
  tipRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  tipTxt:    { color: C.text, fontSize: 14 },
});
