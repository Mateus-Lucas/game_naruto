import { NavigationContainer } from '@react-navigation/native';
import Personagens from '../screens/Personagens';
import Aldeias from '../screens/Aldeias';
import InicioJogo from '../screens/InicioJogo';
import { createStackNavigator } from '@react-navigation/stack'
import Jogo from '../screens/Jogo';
import Aldeia from '../screens/Aldeia';
import Home from '../screens/Home';

export default function Router() {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false, // Oculta o cabeçalho por padrão
                }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Jogo' component={Jogo} />
                <Stack.Screen name='Personagens' component={Personagens} />
                <Stack.Screen name='Personagem' component={Personagem} />
                <Stack.Screen name='Aldeias' component={Aldeias} />
                <Stack.Screen name='InicioJogo' component={InicioJogo} />
                <Stack.Screen name='Aldeia' component={Aldeia} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


