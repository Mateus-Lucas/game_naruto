import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import Api from '../services/Api';

export default function Personagens() {
  return (
    <FlatList
      data={Api}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      numColumns={2}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.imagem }} style={styles.cardImage} />
          <Card.Content>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardDescription}>
              Clã: {item.clã}
            </Text>
            <Text style={styles.cardDescription}>
              Patente: {item.patente}
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    margin: 8,
    flex: 0.5,
    elevation: 4,
    borderWidth: 6,
    borderColor: '#DAA520',
    backgroundColor: 'white',
    borderRadius: 0
    
  },
  cardImage: {
    height: 120,
    borderRadius: 0
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: 'gray',
  },
});