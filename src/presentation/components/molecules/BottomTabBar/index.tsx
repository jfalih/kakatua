import React from 'react';
import {HStack, VStack} from '../../atoms/Layout/Stack';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import {Dimensions} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const BottomTabBar = props => {
  const {state, descriptors, theme, navigation} = props;
  const {pallate, spacing} = theme;
  const {width} = Dimensions.get('window');

  return (
    <VStack
      position={{
        bottom: 10,
        left: spacing.standard,
      }}>
      <HStack
        style={{
          display:
            getFocusedRouteNameFromRoute(props) == 'Scan' ? 'none' : 'flex',
          shadowColor: pallate.blackout['03'],
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 1.51,
          elevation: 2,
        }}
        padding={spacing.standard}
        borderRadius={50}
        items="center"
        width={width - spacing.standard * 2}
        backgroundColor={pallate.blackout['05']}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const {
            tabBarIcon,
            tabBarTestID,
            tabBarAccessibilityLabel,
            tabBarLabel,
            title,
          } = options || {};

          const label =
            tabBarLabel !== undefined
              ? tabBarLabel
              : title !== undefined
              ? title
              : route.name;
          const isFocused = state.index === index;

          const iconComp = () => {
            if (typeof tabBarIcon === 'undefined') {
              return null;
            }

            return tabBarIcon({
              focused: isFocused,
              color: isFocused
                ? pallate.whiteout['01']
                : pallate.blackout['01'],
              size: 26,
            });
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (tabBarLabel === 'QR') {
            return (
              <Pressable
                key={route.key}
                margin={{
                  marginHorizontal: spacing.small,
                }}
                height={44}
                width={44}
                items="center"
                justify="center"
                borderRadius={22}
                onPress={onPress}
                onLongPress={onLongPress}
                backgroundColor={pallate.yellow['03']}>
                {tabBarIcon({
                  focused: isFocused,
                  color: pallate.blackout['05'],
                  size: 26,
                })}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              fill
              height={40}
              direction="column"
              items="center"
              justify="center"
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={tabBarAccessibilityLabel}
              testID={tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              {iconComp()}
            </Pressable>
          );
        })}
      </HStack>
    </VStack>
  );
};
export default BottomTabBar;
