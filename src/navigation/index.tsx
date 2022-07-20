import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from 'phosphor-react-native';

import { AppNavigator } from './app.routes';

export function CoreNavigator() {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <SignIn /> */}
    </NavigationContainer>
  );
}
