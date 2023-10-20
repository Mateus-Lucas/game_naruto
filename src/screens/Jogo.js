import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import Api from '../services/Api';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Jogo() {
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [isTeamAReady, setIsTeamAReady] = useState(false);
  const [isTeamBReady, setIsTeamBReady] = useState(false);
  const [selectionPhase, setSelectionPhase] = useState('teamA');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [vida, setVida] = useState(25000);

  const checkTeamIsComplete = (team) => {
    return team.length === 3;
  };

  useEffect(() => {
    async function setLandscapeOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    setLandscapeOrientation();

    return async () => {
      await ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    setIsTeamAReady(checkTeamIsComplete(teamA));
    setIsTeamBReady(checkTeamIsComplete(teamB));
  }, [teamA, teamB]);

  const generateKey = (prefix, character) => `${prefix}_${character.id}`;

  const handleChooseCharacter = () => {
    setIsChoosingCharacter(true);
  };

  const handleCharacterSelection = (character) => {
    if (selectionPhase === 'completed') {
      setIsModalVisible(false);
      return;
    }

    if (selectionPhase === 'teamA' && teamA.length < 3) {
      // Defina o valor de vida inicial para o personagem
      character.vida = 25000; // 100 é um exemplo, ajuste conforme necessário
      setTeamA([...teamA, character]);
    } else if (selectionPhase === 'teamB' && teamB.length < 3) {
      // Defina o valor de vida inicial para o personagem
      character.vida = 25000; // 100 é um exemplo, ajuste conforme necessário
      setTeamB([...teamB, character]);
    }

    if (teamA.length === 3 && teamB.length === 3) {
      setIsModalVisible(false);
      setSelectionPhase('completed');
    } else if (selectionPhase === 'teamA' && teamA.length === 3) {
      setSelectionPhase('teamB');
    }
  };


  const getSelectionMessage = () => {
    if (teamA.length < 3) {
      return 'Selecione personagens para o Time A';
    } else if (teamB.length < 3) {
      return 'Selecione personagens para o Time B';
    } else {
      return 'Seleção concluída';
    }
  };

  const availableCharacters = Api.filter((character) => {
    return !teamA.includes(character) && !teamB.includes(character);
  });

  const handleResetSelection = () => {
    setTeamA([]);
    setTeamB([]);
    setSelectionPhase('teamA');
    setIsChoosingCharacter(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.teamContainer}>
          {isTeamAReady && (
            <View>
              <FlatList
                data={teamA}
                horizontal={true}
                keyExtractor={(item) => generateKey('teamA', item)}
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
                      <Text>Jutsu: {item.jutsu_especial}</Text>
                    </Paragraph>
                    <Card style={styles.cardAtributos}>
                      <Paragraph style={styles.textCard}>
                        <Text style={styles.textStyle}>Ataque: {item.ataque}</Text>
                      </Paragraph>
                      <Paragraph style={styles.textCard}>
                        <Text style={styles.textStyle}>Defesa: {item.defesa}</Text>
                      </Paragraph>
                      <Paragraph style={styles.textCard}>
                        <Text style={styles.textStyle}>Jutso: {item.dano_especial}</Text>
                      </Paragraph>
                    </Card>
                  </Card>
                )}
              />
              <View style={styles.teamAProgressContainer}>
                {teamA.map((character) => (
                  <View key={character.id}>
                    <Title style={styles.characterName}>{character.nome}</Title>
                    <ProgressBar
                      progress={character.vida / 25000} // Ajuste conforme necessário
                      color={'green'} // Cor da barra de vida
                      style={styles.progressStyle} // Estilo da barra de vida
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.teamContainer}>
          {isTeamBReady && (
            <View>

              <FlatList
                data={teamB}
                horizontal={true}
                keyExtractor={(item) => generateKey('teamB', item)}
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
                      <Text>Jutsu: {item.jutsu_especial}</Text>
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
              <View style={styles.teamAProgressContainer}>
                {teamA.map((character) => (
                  <View key={character.id}>
                    <Title style={styles.characterName}>{character.nome}</Title>
                    <ProgressBar
                      progress={character.vida / 25000} // Ajuste conforme necessário
                      color={'green'} // Cor da barra de vida
                      style={styles.progressStyle} // Estilo da barra de vida
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

      </ScrollView>

      {/* <Button title="Escolher Personagem" onPress={handleChooseCharacter} /> */}
      <Modal visible={selectionPhase !== 'completed'} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title style={styles.titleModal}>{getSelectionMessage()}</Title>
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
      {/* <Button title="Reset" onPress={handleResetSelection} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  teamContainer: {
    flex: 1,
    marginRight: 200
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '40%',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: 'red',
    marginBottom: 50,
  },
  titleModal: {
    marginBottom: 10,
    marginTop: 50,
    color: 'white',
  },
  cardModal: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10,
  },
  card: {
    borderWidth: 8,
    borderColor: 'black',
    padding: 8,
    width: 220,
    backgroundColor: '#800000',

  },
  image: {
    borderRadius: 0,
    height: 130,
  },
  characterName: {
    margin: 5,
    color: 'white',
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  cardAtributos: {
    backgroundColor: 'black',
    padding: 7,
    borderTopRadius: 0,
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
  imageModal: {
    borderRadius: 0,
    height: 130,
  },
  progressStyle: {
    height: 10,
    marginTop: 4,
    width: 500
  },
  teamAProgressContainer: {
    marginLeft: 20
  }
});
