import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { aboutHtml, builderHtml, versionHtml } from '@/content';
import { C } from '@/lib/analysis';

const PAGE_TITLES: Record<string, string> = {
  about: 'About This App',
  builder: 'Meet the Builder',
  version: 'Version & Info',
};

const PAGE_CONTENT: Record<string, string> = {
  about: aboutHtml,
  builder: builderHtml,
  version: versionHtml,
};

export default function InfoDetailScreen() {
  const { page } = useLocalSearchParams<{ page: string }>();
  const router = useRouter();
  const html = PAGE_CONTENT[page ?? 'about'] ?? aboutHtml;

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={C.maroon} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ html }}
        style={styles.webview}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  navBar: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: C.bg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: C.bg,
  },
});
