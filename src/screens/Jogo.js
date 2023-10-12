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
  const [isChoosingCharacter, setIsChoosingCharacter] = useState(false); // State para controlar a exibição do modal

  useEffect(() => {
    const filteredCharacters = Api.filter((character) => ids.includes(character.id));
    setSelectedCharacters(filteredCharacters);
  }, [ids]);

  const handleChooseCharacter = () => {
    setIsChoosingCharacter(true);
  };

  const handleCharacterSelection = (character) => {
    // Lógica para adicionar o personagem selecionado à lista de personagens
    setSelectedCharacters([...selectedCharacters, character]);
    setIsChoosingCharacter(false); // Fechar o modal
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
              <Card.Cover source={{ uri: item.imagem }} />
              <Card.Content>
                <Title style={styles.characterName}>{item.nome}</Title>
                <Paragraph>Ataque: {item.ataque}</Paragraph>
                <Paragraph>Defesa: {item.defesa}</Paragraph>
                <Paragraph>Clã: {item.clã}</Paragraph>
                <Paragraph>Patente: {item.patente}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        )}
      />


      <Button
        title="Escolher Personagem"
        onPress={handleChooseCharacter}
      />

      {/* Modal para escolher personagem */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  characterList: {
    // Estilos da lista de personagens
  },
  // Outros estilos

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
});
