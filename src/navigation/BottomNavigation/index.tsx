/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '../../presentation/components/molecules/BottomTabBar';
import {useTheme} from '../../services/context/Theme/Theme.context';
import Icon from '../../presentation/components/atoms/Icon';
import Container from '../../presentation/components/organisms/Container';
import Home from '../../presentation/pages/Home';
import Search from '../../presentation/pages/Search';
import Ticket from '../../presentation/pages/Ticket';
import Scan from '../../presentation/pages/Scan';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} theme={theme} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconSmartHome" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconSearch" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'QR',
          tabBarIcon: ({color, size}) => (
            <Icon name="IconScan" color={color} size={size} />
          ),
        }}
        name="Scan"
        component={Scan}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconTicket" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Ticket"
        component={Ticket}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconUser" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="User"
        component={() => <Container />}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
