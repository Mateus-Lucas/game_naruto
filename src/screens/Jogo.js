import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button, Modal, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Api from '../services/Api';

export default function Jogo() {
  const route = useRoute();
  const { ids } = route.params;
  console.log(ids);

  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [isChoosingCharacter, setIsChoosingCharacter] = useState(false);

  useEffect(() => {
    const filteredCharacters = Api.filter((character) => ids.includes(character.id));
    setSelectedCharacters(filteredCharacters);
  }, [ids]);

  const handleChooseCharacter = () => {
    setIsChoosingCharacter(true);
  };

  const handleCharacterSelection = (character) => {
    setSelectedCharacters([...selectedCharacters, character]);
    setIsChoosingCharacter(false); 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedCharacters}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.characterList}
        renderItem={({ item }) => (
          <View style={styles.characterCardContainer}>
            <Card style={styles.card}>
              <Card style={styles.cardImagem}>
                <Title style={styles.characterName}>{item.nome}</Title>
                <Card.Cover
                  source={{ uri: item.imagem }}
                  style={styles.image}
                />
              </Card>
              <Paragraph>
                <Text style={{ fontWeight: 'bold' }}>Patente: </Text>
                {item.patente}
              </Paragraph>
              <Paragraph>
                <Text style={{ fontWeight: 'bold' }}>Jutso Especial: </Text>
                {item.jutsu_especial}
              </Paragraph>
                <Card  style={styles.cardAtributos}>
                  <Paragraph style={styles.textCard}>
                    <Text style={styles.textStyle}>Ataque: ................. </Text>
                    <Text style={styles.atributosStyle}>{item.ataque}</Text>
                  </Paragraph>
                  <Paragraph style={styles.textCard}>
                    <Text style={styles.textStyle}>Defesa: ................. </Text>
                    <Text style={styles.atributosStyle}>{item.defesa}</Text>
                  </Paragraph>
                  <Paragraph style={styles.textCard}>
                    <Text style={styles.textStyle}>Especial: ............... </Text>
                    <Text style={styles.atributosStyle}>{item.dano_especial}</Text>
                  </Paragraph>
                </Card>
            </Card>
          </View>
        )
        }
      />
      < Button
        title="Escolher Personagem"
        onPress={handleChooseCharacter}
      />
      <Modal
        visible={isChoosingCharacter}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Escolha um novo personagem:</Text>
            <FlatList
              data={Api}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCharacterSelection(item)}>
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  card: {
    borderWidth: 8,
    borderColor: 'white',
    padding: 8,
    width: 220,
    backgroundColor: '#800000'
  },
  cardImagem: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#600000',
    marginBottom: 5
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'black'
  },
  cardAtributos: {
    backgroundColor: 'white',
    padding: 7,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 5
  },
  textCard: {
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    color: 'black',
    padding: 3,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  image: {
    borderRadius: 0,
    height: 130
  },
  characterName: {
    margin: 5
  }
});
