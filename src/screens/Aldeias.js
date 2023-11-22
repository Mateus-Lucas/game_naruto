import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card, Button, Paragraph, Title, Text } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import ApiAldeias from '../services/ApiAldeias';
import ApiPersonagens from '../services/ApiPersonagens';

export default function Aldeias(props) {

  const navigation = props.navigation

  const [personagensPorAldeia, setPersonagensPorAldeia] = useState({});

  useEffect(() => {
    const personagens = ApiPersonagens;
    const aldeiasPermitidas = ["folha", "areia", "chuva", "névoa", "som", "nuvem", "cachoeira", "pedra"];

    const contagemPorAldeia = {};
    personagens.forEach(personagem => {
      const aldeia = personagem.aldeia;
      if (aldeiasPermitidas.includes(aldeia)) {
        contagemPorAldeia[aldeia] = (contagemPorAldeia[aldeia] || 0) + 1;
      }
    });

    setPersonagensPorAldeia(contagemPorAldeia);
  }, []);

  const data = Object.keys(personagensPorAldeia).map(aldeia => ({
    name: aldeia,
    population: personagensPorAldeia[aldeia],
    color: getRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aldeias</Text>
      <FlatList
        data={ApiAldeias}
        style={{marginBottom: 50}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.imagem }} />
            <Card.Content>
              <Title>Aldeia da(o) {item.aldeia}</Title>
              <Paragraph>{`Quantidade de Personagens: ${personagensPorAldeia[item.aldeia] || 0}`}</Paragraph>
            </Card.Content>
            <Card.Actions>
            <Button onPress={() => navigation.navigate('Aldeia', { aldeia: item })}>Ver mais</Button>
            </Card.Actions>
          </Card>
        )}
      />
      {/* Adicione o gráfico de pizza aqui */}
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});

const screenWidth = Dimensions.get("window").width;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};