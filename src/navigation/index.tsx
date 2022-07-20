import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.routes';
import { SignInView } from '../views/SignInView';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/Loading';

export function CoreNavigator() {
  const { loading, user } = useAuth();

  if (loading) return <Loading />

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <SignInView />}
    </NavigationContainer>
  );
}
