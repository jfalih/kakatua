import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {Box, Flex} from '../Layout';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Icon, {IconProps} from '../Icon';
import {FlexAnimated, FlexProps} from '../Layout/Flex';
import {
  FadeInDown,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {VStackAnimated} from '../Layout/Stack';
import Text from '../Text';

type InputType = TextInputProps & FlexProps;

interface SearchBarProps extends InputType {
  icon?: IconProps;
  error?: string;
  leading?: JSX.Element;
  trailing?: JSX.Element;
}

const Input = React.memo(
  React.forwardRef((props: SearchBarProps, ref) => {
    const {pallate, typography, spacing} = useTheme();
    const {
      leading,
      trailing,
      placeholder = 'Cari yang kamu mau disini..',
      value,
      error,
      icon,
      backgroundColor,
      ...rest
    } = props;

    const animatedSearchStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          error ? 1 : 0,
          [0, 1],
          [backgroundColor || pallate.whiteout['02'], pallate.red['01']],
        ),
      };
    }, [error]);

    return (
      <VStackAnimated
        entering={FadeInDown.duration(1500).delay(300)}
        spacing={spacing.tiny}>
        <Flex position={{set: 'relative'}}>
          <FlexAnimated
            fill
            style={animatedSearchStyle}
            borderRadius={12}
            padding={{
              paddingLeft:
                leading || icon
                  ? spacing.standard + (icon?.size || 14) + spacing.standard
                  : spacing.large,
              paddingRight: trailing && spacing.large * 2,
            }}
            height={50}
            as={
              <TextInput
                style={{
                  ...typography.subtitles['01'],
                }}
                value={value}
                numberOfLines={1}
                placeholderTextColor={pallate.whiteout['05']}
                placeholder={placeholder}
              />
            }
            {...rest}
          />
          {(leading || icon) && (
            <Box
              backgroundColor={'transparent'}
              position={{
                left: spacing.standard,
                top: icon && 50 / 2 - (icon.size || 14) / 2,
              }}>
              {icon ? (
                <Icon name={icon.name} size={icon.size} color={icon.color} />
              ) : (
                leading
              )}
            </Box>
          )}
          {trailing && (
            <Box
              as={trailing}
              position={{
                right: spacing.standard,
                top: 42 / 2 - 18 / 2,
              }}
            />
          )}
        </Flex>
        {error && (
          <Text type="body" weight="02" color={pallate.red['03']}>
            {error}
          </Text>
        )}
      </VStackAnimated>
    );
  }),
);

export default Input;
