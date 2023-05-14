import City from '../presentation/pages/City';
import Detail from '../presentation/pages/Detail';
import Invoice from '../presentation/pages/Invoice';
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
    name: 'City',
    component: City,
  },
  {
    key: 'routes-3',
    name: 'Detail',
    component: Detail,
  },
  {
    key: 'routes-4',
    name: 'Invoice',
    component: Invoice,
  },
];

export default routes;
