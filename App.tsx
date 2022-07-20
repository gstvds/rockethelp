import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';
import { CoreNavigator } from './src/navigation';

import { theme } from './src/styles/theme';
import { AuthProvider } from './src/hooks/useAuth';
import { OrderProvider } from './src/hooks/useOrder';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AuthProvider>
        <OrderProvider>
          {fontsLoaded ? <CoreNavigator /> : <Loading />}
        </OrderProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
