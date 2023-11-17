import 'react-native-gesture-handler'
import { PaperProvider } from "react-native-paper";
import TabRoutes from './src/routes/TabRoutes';
import Jogo from './src/screens/Jogo';
import InicioJogo from './src/screens/InicioJogo';
import Aldeias from './src/screens/Aldeias';
import Personagens from './src/screens/Personagens';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Personagens />
      </NavigationContainer>
    </PaperProvider>
  );
}