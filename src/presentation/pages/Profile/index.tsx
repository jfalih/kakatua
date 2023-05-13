import React, {useCallback, useState} from 'react';
import Container from '../../components/organisms/Container';
import Text from '../../components/atoms/Text';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import Divider from '../../components/atoms/Layout/Divider';
import {Image} from 'react-native-svg';
import Icon from '../../components/atoms/Icon';
import { Pressable } from 'react-native';
import Button from '../../components/atoms/Button';

const Profile = () => {
  const {pallate, spacing} = useTheme();

  return (
    <Container
      scrollable
      backgroundColor={pallate.whiteout['02']}
      spacing={spacing.standard}
      padding={{
        paddingVertical: spacing.large,
        paddingHorizontal: spacing.extraLarge,
      }}>
      <Text type="title" weight="01">
        Profile
      </Text>
      <VStack spacing={16}>
        <Divider color={pallate.whiteout['04']} thickness={1} />
        <HStack justify="space-between" items="center">
          <Text type="title" weight="05">
            Chat
          </Text>
          <Icon name="IconMessage" size={20} color={pallate.blackout['05']} />
        </HStack>
        <HStack justify="space-between" items="center">
          <Text type="title" weight="05">
            Notifications
          </Text>
          <Icon name="IconBell" size={20} color={pallate.blackout['05']} />
        </HStack>
        <HStack justify="space-between" items="center">
          <Text type="title" weight="05">
            Delete Account
          </Text>
          <Icon name="IconTrash" size={20} color={pallate.blackout['05']} />
        </HStack>
        <HStack justify="space-between" items="center">
          <Text type="title" weight="05">
            Log out
          </Text>
          <Icon name="IconLogout" size={20} color={pallate.blackout['05']} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Profile;
