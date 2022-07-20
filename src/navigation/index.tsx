import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.routes';
import { SignInView } from '../views/SignInView';
import { useAuth } from '../hooks/useAuth';

export function CoreNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <SignInView />}
    </NavigationContainer>
  );
}
