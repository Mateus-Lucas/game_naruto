import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ApiAldeias from '../services/ApiAldeias'
import { Button, Card, Paragraph, Title } from 'react-native-paper';

export default function Aldeias({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aldeias</Text>
      <FlatList
        data={ApiAldeias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.imagem }} />
            <Card.Content>
              <Title>Aldeia da(o) {item.aldeia}</Title>
              {/* <Paragraph>{item.descricao}</Paragraph> */}
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Aldeia', { aldeia: item })}>Ver mais</Button>
            </Card.Actions>
          </Card>
        )}
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