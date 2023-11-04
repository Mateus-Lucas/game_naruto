import 'react-native-gesture-handler'
import { PaperProvider } from "react-native-paper";
import TabRoutes from './src/routes/TabRoutes';
import Jogo from './src/screens/Jogo';
import InicioJogo from './src/screens/InicioJogo';

export default function App() {
  return (
    <PaperProvider>
      <TabRoutes/>
    </PaperProvider>
  );
}