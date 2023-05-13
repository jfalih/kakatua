import BottomNavigation from './BottomNavigation';

export type RootStackParamList = {
  Login: undefined;
  EmailVerification: undefined;
  Register: undefined;
  Home: undefined;
  BottomNavigation: undefined;
};

const routes = [
  {
    key: 'routes-1',
    name: 'BottomNavigation',
    component: BottomNavigation,
  },
];

export default routes;
