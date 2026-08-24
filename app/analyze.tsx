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

import {
  C, analyzeWithClaude, extractFrames, extractScore, saveLocal,
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
          <Ionicons name="arrow-back" size={20} color={C.text} />
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
              Select a Bharatnatyam performance{'\n'}video from your library
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
                <Ionicons name="swap-horizontal-outline" size={14} color={C.purpleLight} />
                <Text style={styles.changeBtnTxt}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Action */}
        {!analyzing && (
          <TouchableOpacity
            style={[styles.actionBtn, !videoUri && styles.actionBtnOutline]}
            onPress={videoUri ? analyze : pickVideo}
            activeOpacity={0.85}
          >
            <Ionicons
              name={videoUri ? 'scan-outline' : 'folder-open-outline'}
              size={20}
              color={videoUri ? C.bg : C.gold}
            />
            <Text style={[styles.actionBtnTxt, !videoUri && { color: C.gold }]}>
              {videoUri ? 'Analyze Posture' : 'Select Video'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Loading */}
        {analyzing && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={C.gold} />
            <Text style={styles.loadingTxt}>Analyzing your performance...</Text>
            <Text style={styles.loadingSubTxt}>Extracting frames  ·  Consulting AI teacher</Text>
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>For best results</Text>
          {[
            'Full body visible in frame',
            'Good lighting, clear background',
            'Minimum 5 seconds of performance',
            'Shoot in portrait mode',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={C.purple} />
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
    backgroundColor: C.card, alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { fontSize: 17, fontWeight: '700', color: C.text },

  content: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 8 },

  uploadZone: {
    borderWidth: 1.5, borderColor: C.purple + '60', borderStyle: 'dashed',
    borderRadius: 24, paddingVertical: 48, paddingHorizontal: 24,
    alignItems: 'center', backgroundColor: C.purpleFaint, marginBottom: 20,
  },
  uploadIconRing: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: C.goldFaint, borderWidth: 1.5, borderColor: C.gold + '40',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  uploadTitle:   { fontSize: 20, fontWeight: '700', color: C.text, marginBottom: 8 },
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
  changeBtnTxt:    { color: C.purpleLight, fontSize: 13 },

  actionBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: C.gold, borderRadius: 16, height: 56,
    borderBottomWidth: 4, borderBottomColor: C.goldDark,
    shadowColor: C.goldDark, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 8,
    marginBottom: 28,
  },
  actionBtnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5, borderColor: C.gold, borderBottomWidth: 1.5,
    shadowOpacity: 0, elevation: 0,
  },
  actionBtnTxt: { fontSize: 17, fontWeight: '800', color: C.bg },

  loadingBox:    { alignItems: 'center', paddingVertical: 32, marginBottom: 20 },
  loadingTxt:    { color: C.gold, fontSize: 16, fontWeight: '700', marginTop: 14 },
  loadingSubTxt: { color: C.muted, fontSize: 13, marginTop: 6 },

  tipsCard:  {
    backgroundColor: C.card, borderRadius: 16, padding: 18,
    borderWidth: 1, borderColor: C.border,
  },
  tipsTitle: { color: C.textSub, fontSize: 12, fontWeight: '700', letterSpacing: 1.2, marginBottom: 14 },
  tipRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  tipTxt:    { color: C.textSub, fontSize: 14 },
});
