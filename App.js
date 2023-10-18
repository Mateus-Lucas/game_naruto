import 'react-native-gesture-handler'
import { PaperProvider } from "react-native-paper";
import TabRoutes from './src/routes/TabRoutes';

export default function App() {
  return (
    <PaperProvider>
      <TabRoutes/>
    </PaperProvider>
  );
}