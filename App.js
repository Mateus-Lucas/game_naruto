import 'react-native-gesture-handler'
import { PaperProvider } from "react-native-paper";
import Routes from './src/routes/Routes';
import { useEffect, useState } from 'react';

export default function App() {

  const [sound, setSound] = useState();

  useEffect(() => {
    playSound();

    return () => {
      if (sound) {
        console.log('Parando som');
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./src/audio/musicaFundo.mpeg'),
      {
        isLooping: true, 
      }
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  return (
    <PaperProvider>
      <Routes/>
    </PaperProvider>
  );
}