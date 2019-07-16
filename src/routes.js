import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/Main';
import Teste from './pages/Teste';

const Routes = createAppContainer(createSwitchNavigator({ Teste, Main }, {initialRouteName: 'Main'}));

export default Routes;
