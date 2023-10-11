import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from './TabRoutes';

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Inicio'>
                <Drawer.Screen name='Inicio' component={TabRoutes} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}