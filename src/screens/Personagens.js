import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, Button } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import ApiPersonagens from '../services/ApiPersonagens';

export default function Personagens(props) {

  const navigation = props.navigation

  const [searchQuery, setSearchQuery] = useState('');
  const [dadosFiltrados, setDadosFiltrados] = useState(ApiPersonagens);

  useEffect(() => {
    // Filtra os personagens com base nas letras iniciais da searchQuery
    const resultadosPesquisa = ApiPersonagens.filter(item =>
      item.nome.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setDadosFiltrados(resultadosPesquisa);
  }, [searchQuery]);

  return (
    <>
      <Searchbar
        placeholder="Pesquisar por letra inicial"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.imagem }} style={styles.cardImage} />
            <Card.Content>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardDescription}>Clã: {item.clã}</Text>
              <Text style={styles.cardDescription}>Patente: {item.patente}</Text>
              <Button
                onPress={() => navigation.navigate('Personagem', { personagem: item })}
                title='Ver mais'
              >
              </Button>
            </Card.Content>
          </Card>
        )}
      />
    </>
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
    borderRadius: 0,
  },
  cardImage: {
    height: 120,
    borderRadius: 0,
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
  searchBar: {
    margin: 8,
    marginTop: 50
  },
});
