import React, {useCallback} from 'react';
import {useAuth} from '../../../services/context/Auth/Auth.context';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Avatar from '../../components/atoms/Avatar';
import Image from '../../components/atoms/Image';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import Text from '../../components/atoms/Text';
import Container from '../../components/organisms/Container';
import Divider from '../../components/atoms/Layout/Divider';
import Pressable from '../../components/atoms/Pressable';
import Icon from '../../components/atoms/Icon';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const Profile = ({navigation}) => {
  const {spacing, pallate} = useTheme();
  const {user, handleUser} = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await auth().signOut();
      handleUser(undefined);
      navigation.navigate('Auth');
      Toast.show({
        type: 'success',
        text1: 'Yey, berhasil nih!',
        text2: 'Kamu berhasil keluar dari akun!',
      });
    } catch (e) {}
  }, [handleUser, navigation]);
  return (
    <Container spacing={spacing.large} padding={spacing.extraLarge}>
      <Text type="title" weight="01">
        Profile
      </Text>
      <VStack spacing={spacing.large}>
        <HStack spacing={spacing.standard} items="center">
          <Avatar
            borderRadius={30}
            size="large"
            source={{
              uri: user?.photoURL,
            }}
          />
          <VStack>
            <Text>Selamat datang 👋</Text>
            <Text type="title" weight="05">
              {user?.displayName}
            </Text>
          </VStack>
        </HStack>
        <Divider thickness={1} color={pallate.whiteout['04']} />
      </VStack>
      <VStack>
        <Pressable onPress={handleLogout}>
          <HStack fill items="center" justify="space-between">
            <Text type="title" weight="04">
              Logout
            </Text>
            <Icon name="IconLogout" size={24} color={pallate.blackout['05']} />
          </HStack>
        </Pressable>
      </VStack>
    </Container>
  );
};

export default Profile;
