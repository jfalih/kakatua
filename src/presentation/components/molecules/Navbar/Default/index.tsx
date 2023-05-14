import React, {useCallback, useRef} from 'react';
import {AvatarAnimated, AvatarProps} from '../../../atoms/Avatar';
import {
  HStack,
  HStackAnimated,
  VStackAnimated,
} from '../../../atoms/Layout/Stack';
import {
  FadeInDown,
  FadeInRight,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text from '../../../atoms/Text';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import {useWindowDimensions} from 'react-native';
import Flex, {FlexProps} from '../../../atoms/Layout/Flex';
import {useScroll} from '../../../../../services/context/Scroll/Scroll.context';
import Pressable from '../../../atoms/Pressable';
import Icon from '../../../atoms/Icon';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../../../services/context/Auth/Auth.context';

export interface DefaultProps extends FlexProps {
  avatarSource: AvatarProps['source'];
  name: string;
}

const Default = (props: DefaultProps) => {
  const {name, avatarSource, ...rest} = props;
  const {spacing, pallate} = useTheme();
  const ref = useRef();
  const {width} = useWindowDimensions();
  const {contentOffset} = useScroll();
  const {user, handleUser} = useAuth();
  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        contentOffset?.y.value > 200 ? 1 : 0,
        [0, 1],
        ['transparent', '#fff'],
      ),
    };
  }, [contentOffset]);

  const animatedSearchStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        contentOffset?.y.value > 200 ? 1 : 0,
        [0, 1],
        [pallate.whiteout['01'], pallate.whiteout['02']],
      ),
    };
  }, [contentOffset]);

  const handleLogout = useCallback(() => {
    if (user) {
      auth()
        .signOut()
        .then(() => {
          handleUser(null);
        });
    } else {
      navigation.navigate('Auth', {screen: 'Login'});
    }
  }, [handleUser, navigation, user]);

  return (
    <VStackAnimated
      style={animatedStyle}
      padding={{
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.medium,
      }}
      width={width}
      spacing={spacing.medium}
      {...rest}>
      <HStackAnimated items="center" spacing={spacing.standard}>
        {user ? (
          <HStack items="center" spacing={spacing.standard} fill>
            <AvatarAnimated
              size="medium"
              source={{
                uri:
                  user?.photoURL ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
              }}
              rounded
              entering={FadeInRight.duration(1500)}
            />
            <VStackAnimated
              fill
              entering={FadeInDown.duration(1500).delay(200)}>
              <Text type="subtitles" weight="appBar" text="Selamat datang 👋" />
              <Text type="title" weight="05" text={name} />
            </VStackAnimated>
            <Pressable onPress={handleLogout} self="center">
              <Icon size={24} color={pallate.blackout['05']} name="IconBell" />
            </Pressable>
            <Pressable onPress={handleLogout} self="center">
              <Icon
                size={24}
                color={pallate.blackout['05']}
                name="IconMessage"
              />
            </Pressable>
          </HStack>
        ) : (
          <Flex fill></Flex>
        )}
      </HStackAnimated>
    </VStackAnimated>
  );
};

export default React.memo(Default);
