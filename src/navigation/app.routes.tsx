import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeView } from '../views/HomeView';
import { DetailsView } from '../views/DetailsView';
import { RegisterView } from '../views/RegisterView';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeView" component={HomeView} />
      <Screen name="DetailsView" component={DetailsView} />
      <Screen name="RegisterView" component={RegisterView} />
    </Navigator>
  );
}
