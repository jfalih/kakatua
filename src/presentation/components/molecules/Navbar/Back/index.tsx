import React from 'react';
import Icon from '../../../atoms/Icon';
import {HStackAnimated, VStackProps} from '../../../atoms/Layout/Stack';
import Pressable from '../../../atoms/Pressable';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import {useNavigation} from '@react-navigation/native';
import Text from '../../../atoms/Text';
import {
  FadeInDown,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useScroll} from '../../../../../services/context/Scroll/Scroll.context';

export interface BackProps extends VStackProps {
  title?: string;
  trailing?: React.ReactNode;
}

const Back: React.FC<BackProps> = props => {
  const {title, trailing, style, ...rest} = props;
  const navigation = useNavigation();
  const {spacing, pallate} = useTheme();
  const {contentOffset} = useScroll();
  return (
    <HStackAnimated
      entering={FadeInDown.duration(1200)}
      items="center"
      backgroundColor={pallate.whiteout['01']}
      padding={{
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.standard,
      }}
      spacing={spacing.small}
      justify="space-between"
      {...rest}>
      <Pressable
        self="center"
        onPress={() => navigation.goBack()}
        width={50}
        height={32}>
        <Icon size={24} color={pallate.blackout['05']} name="IconChevronLeft" />
      </Pressable>
      <Text type="title" weight="05">
        {title}
      </Text>
      {trailing}
    </HStackAnimated>
  );
};

export default Back;
