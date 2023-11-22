import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import ApiPersonagens from '../services/ApiPersonagens';
import { FlatList, ScrollView, Image } from 'react-native';

export default function Aldeia({ route }) {
  const aldeia = route.params.aldeia;
  const retorno = ApiPersonagens.filter(personagem => personagem.aldeia === aldeia.aldeia);

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: aldeia.imagem }} />
          <Card.Title title={`Aldeia da(o) ${aldeia.aldeia}`} />
          <Card.Content>
            <Text variant="bodyMedium">{aldeia.descricao}</Text>
            <FlatList
              data={retorno}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({ item }) => (
                <View style={{ marginRight: 10, marginTop: 40 }}>
                  <Text>{item.nome}</Text>
                  <Image source={{ uri: item.imagem }} style={{ width: 100, height: 100 }} />
                </View>
              )}
            />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view: {
      height: '100%',
      flex: 1,
      marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    flex: 1,
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 50
  },
})