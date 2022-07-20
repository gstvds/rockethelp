import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { SignInView } from './src/views/SignInView';
import { HomeView } from './src/views/HomeView';
import { RegisterView } from './src/views/RegisterView';
import { Loading } from './src/components/Loading';

import { theme } from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? <RegisterView /> : <Loading />}
    </NativeBaseProvider>
  );
}
