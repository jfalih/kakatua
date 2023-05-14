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
import {Logo, LogoApple, LogoFacebook, LogoGoogle} from '../../../../assets';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Register = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
  const {handleUser} = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: {isSubmitting},
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      confirm_password: '',
    },
  });

  const handleRegister = handleSubmit(async data => {
    try {
      await auth().createUserWithEmailAndPassword(data.email, data.password);
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: data.fullname,
        });
        await user?.sendEmailVerification();
        reset();
        Toast.show({
          type: 'success',
          text1: 'Yey, berhasil nih!',
          text2: 'Kamu berhasil mendaftarkan akun, silahkan login ya..!',
        });
        if (!user?.emailVerified) {
          navigation.navigate('EmailVerification');
        }
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  });

  const handleLogin = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
    } catch (e) {
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
      spacing={spacing.medium}
      backgroundColor={pallate.whiteout['01']}
      padding={{
        paddingVertical: spacing.large,
        paddingHorizontal: spacing.extraLarge,
      }}>
      <Logo height={40} width={120} />
      <VStack
        padding={{
          paddingTop: spacing.large,
        }}
        spacing={spacing.small}>
        <Text
          type="title"
          color={pallate.blackout['05']}
          weight="01"
          text="Daftar"
        />
        <Text type="body" color={pallate.blackout['01']} weight="01">
          Ayo buat akun mu, dan rasakan pengalaman berwisata keliling dunia
          bersama kami.
        </Text>
      </VStack>
      <VStack spacing={spacing.standard}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Diisi dulu ya, nama lengkap kamu biar kenal.',
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              icon={{
                name: 'IconUser',
                color: pallate.blackout['05'],
                size: 20,
              }}
              editable={!isSubmitting}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Nama Lengkap"
              error={error?.message}
            />
          )}
          name="fullname"
        />
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
                color: pallate.blackout['05'],
                size: 20,
              }}
              editable={!isSubmitting}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
              message: 'Diisi dulu ya, password kamu.',
            },
            minLength: {
              value: 6,
              message: 'Minimal panjangnya 6, biar aman..',
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              icon={{
                name: 'IconLock',
                color: pallate.blackout['05'],
                size: 20,
              }}
              editable={!isSubmitting}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              textContentType="oneTimeCode"
              placeholder="Password"
              error={error?.message}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Diisi dulu ya, konfirmasi password kamu.',
            },
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'Konfirmasi password kamu gak cocok nih..';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              icon={{
                name: 'IconLock',
                color: pallate.blackout['05'],
                size: 20,
              }}
              editable={!isSubmitting}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              textContentType="oneTimeCode"
              placeholder="Konfirmasi Password"
              error={error?.message}
            />
          )}
          name="confirm_password"
        />
      </VStack>
      <Button
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={handleRegister}
        self="stretch"
        backgroundColor={pallate.yellow['03']}
        borderRadius={12}
        height={55}
        items="center"
        justify="center"
        text={{
          type: 'button',
          weight: '02',
          text: 'Register',
          color: pallate.blackout['05'],
        }}
      />
      <VStack spacing={spacing.large}>
        <HStack spacing={spacing.standard} width={'100%'} items="center">
          <Flex height={1} fill backgroundColor={pallate.whiteout['03']} />
          <Text color={pallate.whiteout['04']} text={'Atau daftar dengan'} />
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
          <Text>Already have an account?</Text>
          <Pressable onPress={handleLogin}>
            <Text underline>Login</Text>
          </Pressable>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Register;
