import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import routes, {RoutesItemType} from './routes';
import RNBootSplash from 'react-native-bootsplash';
import {useAuth} from '../services/context/Auth/Auth.context';
import AuthNavigation from './AuthNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user} = useAuth();
  return (
    <NavigationContainer
      onReady={() => {
        RNBootSplash.hide();
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
          gestureDirection: 'horizontal',
        }}>
        {!user || !user?.emailVerified ? (
          <Stack.Screen
            key={'routes-999'}
            name={'Auth'}
            component={AuthNavigation}
          />
        ) : (
          routes?.map((res: RoutesItemType, _) => (
            <Stack.Screen
              key={res.key}
              name={res.name}
              options={res.options}
              component={res.component}
            />
          ))
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
