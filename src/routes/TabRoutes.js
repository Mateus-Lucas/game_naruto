import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Personagens from '../screens/Personagens';
import Aldeias from '../screens/Aldeias';
import InicioJogo from '../screens/InicioJogo';
import { createStackNavigator } from '@react-navigation/stack'
import Jogo from '../screens/Jogo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack() {
    return (
        <Stack.Navigator initialRouteName='InicioJogo' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='InicioJogo' component={InicioJogo} />
            <Stack.Screen
                name='Jogo'
                component={Jogo}
                options={{ tabBarVisible: false }} 
            />
        </Stack.Navigator>
    );
}

export default function TabRoutes() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Aldeias' screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name='Personagens'
                    component={Personagens}
                    options={{
                        tabBarLabel: 'Personagens',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='people-outline' color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name='Aldeias'
                    component={Aldeias}
                    options={{
                        tabBarLabel: 'Aldeias',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='globe-outline' color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name='Jogo'
                    component={MainStack} // Use o MainStack como componente da aba Jogo
                    options={{
                        tabBarLabel: 'Jogo',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='game-controller-outline' color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}