import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';

function UploadTabButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.uploadWrap}
      onPress={() => router.push('/analyze')}
      activeOpacity={0.75}
    >
      <View style={styles.uploadBtn}>
        <Ionicons name="add" size={26} color="#000000" />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#4a4a4a',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#1c1c1c',
          borderTopWidth: 0.5,
          height: 56,
          paddingBottom: 4,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analyses"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          tabBarButton: () => <UploadTabButton />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  uploadWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtn: {
    width: 46,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#888888',
  },
});
