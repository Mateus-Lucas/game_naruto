import 'react-native-gesture-handler'
import { PaperProvider } from "react-native-paper";
import TabRoutes from './src/routes/TabRoutes';
import Jogo from './src/screens/Jogo';

export default function App() {
  return (
    <PaperProvider>
      <Jogo/>
    </PaperProvider>
  );
}