import React from 'react';
import {ThemeProvider} from './Theme/Theme.provider';
import RootNavigation from '../../navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './Auth/Auth.provider';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const Provider = () => {
  GoogleSignin.configure({
    webClientId:
      '343487870638-3egvlfdn044n0vu6lhhdu3e80h0balkl.apps.googleusercontent.com',
    offlineAccess: true,
  });
  Settings.setAppID('219966484113905');
  Settings.initializeSDK();
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <RootNavigation />
              <Toast topOffset={50} />
            </GestureHandlerRootView>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default Provider;
