import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar as PaperProgressBar } from 'react-native-paper';

const ProgressBar = ({ progress, color }) => {
  return (
    <View>
      <PaperProgressBar
        progress={progress} // Valor da progressão (um número entre 0 e 1)
        color={color} // Cor da barra de progresso
      />
      <Text>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};

export default ProgressBar;
