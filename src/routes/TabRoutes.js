import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Personagens from '../screens/Personagens';
import Jogo from '../screens/Jogo';
import Clans from '../screens/Clans';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            initialRouteName='Clans'
            screenOptions={{
                headerShown: false
            }}
        >

            <Tab.Screen
                name='Personagens'
                component={Personagens}
                options={{
                    tabBarLabel: 'Usuários',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='people-outline' color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name='Clans'
                component={Clans}
                options={{
                    tabBarLabel: 'Clans',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='newspaper-outline' color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name='Jogo'
                component={Jogo}
                options={{
                    tabBarLabel: 'Citações',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='book-outline' color={color} size={size} />
                    }
                }}
            />

        </Tab.Navigator>
    )
}