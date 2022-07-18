import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { SignIn } from './src/views/SignInView';

export default function App() {
  return (
    <NativeBaseProvider>
      <SignIn />
    </NativeBaseProvider>
  );
}
