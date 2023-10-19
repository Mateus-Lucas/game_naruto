import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Button, Modal, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Api from '../services/Api';

import aguaImage from '../img/agua.png';
import ventoImage from '../img/vento.png';
import fogoImage from '../img/fogo.png';
import relampagoImage from '../img/relampago.png';
import terraImage from '../img/terra.png';

export default function Jogo() {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [isTeam1Ready, setIsTeam1Ready] = useState(false);
  const [isTeam2Ready, setIsTeam2Ready] = useState(false);
  const [selectionPhase, setSelectionPhase] = useState('team1');
  const [isModalVisible, setIsModalVisible] = useState(true);

  const checkTeamIsComplete = (team) => {
    return team.length === 3;
  };

  useEffect(() => {
    setIsTeam1Ready(checkTeamIsComplete(team1));
    setIsTeam2Ready(checkTeamIsComplete(team2));
    console.log('Time 1:', team1);
    console.log('Time 2:', team2);
  }, [team1, team2]);

  const generateKey = (prefix, character) => `${prefix}_${character.id}`;

  const handleChooseCharacter = () => {
      setIsChoosingCharacter(true);
  };

  const handleCharacterSelection = (character) => {
  if (selectionPhase === 'completed') {
    setIsModalVisible(false);
    return; // Não faz nada se a seleção estiver concluída.
  }

  if (selectionPhase === 'team1' && team1.length < 3) {
    setTeam1([...team1, character]);
  } else if (selectionPhase === 'team2' && team2.length < 3) {
    setTeam2([...team2, character]);
  }

  if (team1.length === 3 && team2.length === 3) {
    setIsModalVisible(false); // Fecha o modal
    setSelectionPhase('completed');
  } else if (selectionPhase === 'team1' && team1.length === 3) {
    setSelectionPhase('team2');
  }
};



  const getSelectionMessage = () => {
    if (team1.length < 3) {
      return 'Selecione personagens para o Time 1';
    } else if (team2.length < 3) {
      return 'Selecione personagens para o Time 2';
    } else {
      return 'Seleção concluída';
    }
  };


  const availableCharacters = Api.filter((character) => {
    return !team1.includes(character) && !team2.includes(character);
  });


  const handleResetSelection = () => {
    setTeam1([]);
    setTeam2([]);
    setSelectionPhase('team1');
    setIsChoosingCharacter(true);
  };



  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isTeam1Ready && (
        <FlatList
          data={team1}
          horizontal={true}
          keyExtractor={(item) => generateKey('team1', item)}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card style={{ backgroundColor: '#600000' }}>
                <Title style={styles.characterName}>{item.nome}</Title>
                <Card.Cover source={{ uri: item.imagem }} style={styles.image} />
              </Card>
              <Paragraph style={{ fontWeight: 'bold', color: 'white' }}>
                <Text>Patente: {item.patente}</Text>
              </Paragraph>
              <Paragraph style={{ fontWeight: 'bold', color: 'white' }}>
                <Text>Jutsu Especial: {item.jutsu_especial}</Text>
              </Paragraph>
              <Card style={styles.cardAtributos}>
                <Paragraph style={styles.textCard}>
                  <Text style={styles.textStyle}>Ataque: {item.ataque}</Text>
                </Paragraph>
                <Paragraph style={styles.textCard}>
                  <Text style={styles.textStyle}>Defesa: {item.defesa}</Text>
                </Paragraph>
                <Paragraph style={styles.textCard}>
                  <Text style={styles.textStyle}>Especial: {item.dano_especial}</Text>
                </Paragraph>
              </Card>
            </Card>
          )}
        />
      )}

      {isTeam2Ready && (
        <FlatList
          data={team2}
          horizontal={true}
          keyExtractor={(item) => generateKey('team2', item)}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card style={{ backgroundColor: '#600000' }}>
                <Title style={styles.characterName}>{item.nome}</Title>
                <Card.Cover source={{ uri: item.imagem }} style={styles.image} />
              </Card>
              <Paragraph style={{ fontWeight: 'bold', color: 'white' }}>
                <Text>Patente: {item.patente}</Text>
              </Paragraph>
              <Paragraph style={{ fontWeight: 'bold', color: 'white' }}>
                <Text>Jutsu Especial: {item.jutsu_especial}</Text>
              </Paragraph>
              <Card style={styles.cardAtributos}>
                <Paragraph style={styles.textCard}>
                  <Text style={styles.textStyle}>Ataque: {item.ataque}</Text>
                </Paragraph>
                <Paragraph style={styles.textCard}>
                  <Text style={styles.textStyle}>Defesa: {item.defesa}</Text>
                </Paragraph>
                <Paragraph style={styles.textCard}>
                  <Text style={styles.textStyle}>Especial: {item.dano_especial}</Text>
                </Paragraph>
              </Card>
            </Card>
          )}
        />
      )}

      <Button
        title="Escolher Personagem"
        onPress={handleChooseCharacter}
      />
      <Modal
        visible={selectionPhase !== 'completed'}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title style={styles.titleModal}>{getSelectionMessage()}

              <Button title="Fechar Modal" onPress={closeModal} />
            </Title>

            <FlatList
              data={availableCharacters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCharacterSelection(item)}>
                  <Card style={styles.cardModal}>
                    <Title style={{ color: 'white' }}>{item.nome}</Title>
                    <Card.Cover source={{ uri: item.imagem }} style={styles.imageModal} />
                  </Card>
                </TouchableOpacity>
              )}
            />

          </View>
        </View>
      </Modal>

      <Button
        title="Reset"
        onPress={handleResetSelection}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    width: '80%',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: 'red',
    marginBottom: 50
  },
  titleModal: {
    marginBottom: 10,
    marginTop: 50,
    color: 'white'
  },
  cardModal: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10
  },
  card: {
    borderWidth: 8,
    borderColor: 'black',
    padding: 8,
    width: 220,
    backgroundColor: '#800000',
  },
  cardImagem: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#600000',
    marginBottom: 15,
    borderWidth: 2,
  },
  imageNat: {
    width: 35,
    height: 35,
    margin: 5,
    position: 'absolute',
    top: -23,
    left: 70,
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  cardAtributos: {
    backgroundColor: 'black',
    padding: 7,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 5,
  },
  textCard: {
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    color: 'white',
    padding: 3,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    borderRadius: 0,
    height: 130,
  },
  characterName: {
    margin: 5,
    color: 'white',
  },
});
