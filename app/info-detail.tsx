import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { aboutHtml, builderHtml, versionHtml } from '@/content';

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
          <Ionicons name="chevron-back" size={20} color="#f0c040" />
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
    backgroundColor: '#0a0a0a',
  },
  navBar: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#0a0a0a',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(123, 47, 190, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: '#1a0533',
  },
});
