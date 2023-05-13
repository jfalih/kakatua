import React from 'react';
import {ThemeProvider} from './Theme/Theme.provider';
import RootNavigation from '../../navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './Auth/Auth.provider';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const queryClient = new QueryClient();

const Provider = () => {
  GoogleSignin.configure({
    webClientId:
      '343487870638-3egvlfdn044n0vu6lhhdu3e80h0balkl.apps.googleusercontent.com',
    offlineAccess: true,
  });
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootNavigation />
            <Toast topOffset={50} />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default Provider;
