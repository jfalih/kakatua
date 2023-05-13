import React, {useCallback} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Input from '../../../components/atoms/Input';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import Button from '../../../components/atoms/Button';
import Pressable from '../../../components/atoms/Pressable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/routes';
import auth from '@react-native-firebase/auth';
import {Controller, useForm} from 'react-hook-form';
import {useAuth} from '../../../../services/context/Auth/Auth.context';
import Toast from 'react-native-toast-message';
import {Flex} from '../../../components/atoms/Layout';
import {LogoApple, LogoFacebook, LogoGoogle} from '../../../../assets';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
  const {handleUser} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = handleSubmit(async data => {
    try {
      const res = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      if (res.user.emailVerified) {
        handleUser(res.user);
        navigation.navigate('BottomNavigation');
      } else {
        navigation.navigate('Auth', {screen: 'EmailVerification'});
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  });

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      console.log(user);
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  }, []);

  const handleFacebookLogin = useCallback(async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const user = auth().signInWithCredential(facebookCredential);
      console.log(user);
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  }, []);

  return (
    <Container
      fill
      navbar={{
        type: 'back',
      }}
      spacing={spacing.medium}
      backgroundColor={pallate.whiteout['01']}
      padding={{
        paddingHorizontal: spacing.extraLarge,
      }}>
      <VStack spacing={spacing.small}>
        <Text
          type="title"
          color={pallate.blackout['05']}
          weight="01"
          text="Masuk"
        />
        <Text type="body" color={pallate.blackout['01']} weight="01">
          Selamat datang 👋
        </Text>
      </VStack>
      <VStack spacing={spacing.standard}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Diisi dulu ya, alamat email kamu.',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Hmm, sepertinya ini bukan alamat email',
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              icon={{
                name: 'IconAt',
                color: pallate.blackout['01'],
                size: 20,
              }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              editable={!isSubmitting}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Alamat Email"
              error={error?.message}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Diisi dulu ya, alamat email kamu.',
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              icon={{
                name: 'IconLock',
                color: pallate.blackout['01'],
                size: 20,
              }}
              editable={!isSubmitting}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              placeholder="Password"
              error={error?.message}
            />
          )}
          name="password"
        />
      </VStack>
      <Button
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={handleLogin}
        self="stretch"
        backgroundColor={pallate.yellow['03']}
        borderRadius={12}
        height={55}
        items="center"
        justify="center"
        text={{
          type: 'button',
          weight: '02',
          text: 'Masuk',
          color: pallate.blackout['05'],
        }}
      />
      <VStack spacing={spacing.large}>
        <HStack spacing={spacing.standard} width={'100%'} items="center">
          <Flex height={1} fill backgroundColor={pallate.whiteout['03']} />
          <Text color={pallate.whiteout['04']} text={'Atau masuk dengan'} />
          <Flex height={1} fill backgroundColor={pallate.whiteout['03']} />
        </HStack>
        <HStack justify="space-between">
          <Pressable
            onPress={handleGoogleLogin}
            items="center"
            justify="center"
            width={80}
            height={58}
            borderWidth={1}
            borderRadius={8}
            borderColor={pallate.whiteout['02']}>
            <LogoGoogle />
          </Pressable>
          <Pressable
            items="center"
            justify="center"
            width={80}
            height={58}
            borderWidth={1}
            borderRadius={8}
            borderColor={pallate.whiteout['02']}>
            <LogoApple />
          </Pressable>
          <Pressable
            onPress={handleFacebookLogin}
            items="center"
            justify="center"
            width={80}
            height={58}
            borderWidth={1}
            borderRadius={8}
            borderColor={pallate.whiteout['02']}>
            <LogoFacebook />
          </Pressable>
        </HStack>
        <HStack self="center" spacing={spacing.tiny}>
          <Text>Kamu belum memiliki akun?</Text>
          <Pressable onPress={handleRegister}>
            <Text underline>Daftar</Text>
          </Pressable>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Login;
