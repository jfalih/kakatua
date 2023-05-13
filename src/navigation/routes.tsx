import Detail from '../presentation/pages/Detail';
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
  {
    key: 'routes-2',
    name: 'Detail',
    component: Detail,
  },
];

export default routes;
