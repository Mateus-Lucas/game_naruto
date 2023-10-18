import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Personagens from '../screens/Personagens';
import Jogo from '../screens/Jogo';
import Aldeias from '../screens/Aldeias';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <NavigationContainer>

            <Tab.Navigator
                initialRouteName='Aldeias'
                screenOptions={{
                    headerShown: false
                }}
            >

                <Tab.Screen
                    name='Personagens'
                    component={Personagens}
                    options={{
                        tabBarLabel: 'Personagens',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name='people-outline' color={color} size={size} />
                        }
                    }}
                />

                <Tab.Screen
                    name='Aldeias'
                    component={Aldeias}
                    options={{
                        tabBarLabel: 'Aldeias',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name='globe-outline' color={color} size={size} />
                        }
                    }}
                />

                <Tab.Screen
                    name='Jogo'
                    component={Jogo}
                    options={{
                        tabBarLabel: 'Jogo',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name='game-controller-outline' color={color} size={size} />
                        }
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}