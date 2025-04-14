import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import * as Notifications from 'expo-notifications';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      scheduleDailyNotifications();
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

async function scheduleDailyNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  const times = [0, 3, 6, 12, 15, 18];
  
  for (const hour of times) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🇨🇩 Message de Fierté RDC",
        body: "Découvrez un nouveau message inspirant sur la RDC!",
      },
      trigger: {
        hour: hour,
        minute: 0,
        repeats: true,
      },
    });
  }
}