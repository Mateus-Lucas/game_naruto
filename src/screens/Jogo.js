import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import Api from '../services/Api';

import aguaImage from '../img/agua.png';
import ventoImage from '../img/vento.png';
import fogoImage from '../img/fogo.png';
import relampagoImage from '../img/relampago.png';
import terraImage from '../img/terra.png';

export default function Jogo() {
  const [timeA, setTimeA] = useState([]);
  const [timeB, setTimeB] = useState([]);
  const [timeACompleto, setTimeACompleto] = useState(false);
  const [timeBCompleto, setTimeBCompleto] = useState(false);
  const [faseSelecao, setFaseSelecao] = useState('timeA');
  const [modalVisivel, setModalVisivel] = useState(true);
  const [vida, setVida] = useState(25000);

  const getChakraImage = (natureza) => {
    switch (natureza) {
      case 'Água':
        return aguaImage;
      case 'Vento':
        return ventoImage;
      case 'Fogo':
        return fogoImage;
      case 'Relâmpago':
        return relampagoImage;
      case 'Terra':
        return terraImage;
      default:
        return null;
    }
  };

  const verificarTimeCompleto = (time) => time.length === 3;

  useEffect(() => {
    async function definirOrientacaoPaisagem() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    definirOrientacaoPaisagem();

    return async () => {
      await ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    setTimeACompleto(verificarTimeCompleto(timeA));
    setTimeBCompleto(verificarTimeCompleto(timeB));
  }, [timeA, timeB]);

  const gerarChave = (prefixo, personagem) => `${prefixo}_${personagem.id}`;

  const lidarComSelecaoDePersonagem = (personagem) => {
    if (faseSelecao === 'completo') {
      setModalVisivel(false);
      return;
    }

    if (faseSelecao === 'timeA' && timeA.length < 3) {
      personagem.vida = 25000;
      setTimeA([...timeA, personagem]);
    } else if (faseSelecao === 'timeB' && timeB.length < 3) {
      personagem.vida = 25000;
      setTimeB([...timeB, personagem]);
    }

    if (timeA.length === 3 && timeB.length === 3) {
      setModalVisivel(false);
      setFaseSelecao('completo');
    } else if (faseSelecao === 'timeA' && timeA.length === 3) {
      setFaseSelecao('timeB');
    }
  };

  const obterMensagemDeSelecao = () => {
    if (timeA.length < 3) {
      return 'Selecione personagens para o Time A';
    } else if (timeB.length < 3) {
      return 'Selecione personagens para o Time B';
    } else {
      return 'Seleção concluída';
    }
  };

  const personagensDisponiveis = Api.filter((personagem) => {
    return !timeA.includes(personagem) && !timeB.includes(personagem);
  });

  const reiniciarSelecao = () => {
    setTimeA([]);
    setTimeB([]);
    setFaseSelecao('timeA');
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const fatorEscala = 0.5;

  return (
    <View style={styles.container}>
      <View style={[styles.containerTime, { transform: [{ scale: fatorEscala }] }]}>
        {timeACompleto && (
          <View>
            <FlatList
              data={timeA}
              horizontal={true}
              keyExtractor={(item) => gerarChave('timeA', item)}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card style={{ backgroundColor: '#600000' }}>
                    <Title style={styles.nomePersonagem}>{item.nome}</Title>

                    <Card.Cover source={{ uri: item.imagem }} style={styles.imagem} />
                    <View style={{ position: 'relative' }}>
                      <Image
                        source={getChakraImage(item.natureza_de_chacra)}
                        style={styles.imageNat}
                      />
                    </View>
                  </Card>
                  <Paragraph style={{ fontWeight: 'bold', color: 'white', marginTop: 10 }}>
                    <Text>Patente: {item.patente}</Text>
                  </Paragraph>
                  <Paragraph style={{ fontWeight: 'bold', color: 'white' }}>
                    <Text>Jutsu: {item.jutsu_especial}</Text>
                  </Paragraph>
                  <Card style={styles.cardAtributos}>
                    <Paragraph style={styles.textoCard}>
                      <Text style={styles.estiloTexto}>Ataque: {item.ataque}</Text>
                    </Paragraph>
                    <Paragraph style={styles.textoCard}>
                      <Text style={styles.estiloTexto}>Defesa: {item.defesa}</Text>
                    </Paragraph>
                    <Paragraph style={styles.textoCard}>
                      <Text style={styles.estiloTexto}>Jutso: {item.dano_especial}</Text>
                    </Paragraph>
                  </Card>
                </Card>
              )}
            />
            <View style={styles.containerProgressoTimeA}>
              {timeA.map((personagem) => (
                <View key={personagem.id}>
                  <Title style={styles.nomePersonagem}>{personagem.nome}</Title>
                  <ProgressBar
                    progress={personagem.vida / 25000}
                    color={'green'}
                    style={styles.estiloProgresso}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={[styles.containerTime, { transform: [{ scale: fatorEscala }] }]}>
        {timeBCompleto && (
          <View>
            <FlatList
              data={timeB}
              horizontal={true}
              keyExtractor={(item) => gerarChave('timeB', item)}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card style={{ backgroundColor: '#600000' }}>
                    <Title style={styles.nomePersonagem}>{item.nome}</Title>
                    <Card.Cover source={{ uri: item.imagem }} style={styles.imagem} />
                    <View style={{ position: 'relative' }}>
                      <Image
                        source={getChakraImage(item.natureza_de_chacra)}
                        style={styles.imageNat}
                      />
                    </View>
                  </Card>
                  <Paragraph style={{ fontWeight: 'bold', color: 'white', marginTop: 10  }}>
                    <Text>Patente: {item.patente}</Text>
                  </Paragraph>
                  <Paragraph style={{ fontWeight: 'bold', color: 'white' }}>
                    <Text>Jutsu: {item.jutsu_especial}</Text>
                  </Paragraph>
                  <Card style={styles.cardAtributos}>
                    <Paragraph style={styles.textoCard}>
                      <Text style={styles.estiloTexto}>Ataque: {item.ataque}</Text>
                    </Paragraph>
                    <Paragraph style={styles.textoCard}>
                      <Text style={styles.estiloTexto}>Defesa: {item.defesa}</Text>
                    </Paragraph>
                    <Paragraph style={styles.textoCard}>
                      <Text style={styles.estiloTexto}>Especial: {item.dano_especial}</Text>
                    </Paragraph>
                  </Card>
                </Card>
              )}
            />
            <View style={styles.containerProgressoTimeB}>
              {timeB.map((personagem) => (
                <View key={personagem.id}>
                  <Title style={styles.nomePersonagem}>{personagem.nome}</Title>
                  <ProgressBar
                    progress={personagem.vida / 25000}
                    color={'green'}
                    style={styles.estiloProgresso}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <Modal visible={faseSelecao !== 'completo'} animationType="slide" transparent={true}>
        <View style={styles.containerModal}>
          <View style={styles.conteudoModal}>
            <Title style={styles.tituloModal}>{obterMensagemDeSelecao()}</Title>
            <FlatList
              data={personagensDisponiveis}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => lidarComSelecaoDePersonagem(item)}>
                  <Card style={styles.cardModal}>
                    <Title style={{ color: 'white' }}>{item.nome}</Title>
                    <Card.Cover source={{ uri: item.imagem }} style={styles.imagemModal} />
                  </Card>
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
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  containerTime: {
    flex: 1,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoModal: {
    width: '40%',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: 'red',
    marginBottom: 50,
  },
  tituloModal: {
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
  imagem: {
    borderRadius: 0,
    height: 130,
  },
  nomePersonagem: {
    margin: 5,
    color: 'white',
  },
  estiloTexto: {
    fontWeight: 'bold',
    color: 'white',
  },
  cardAtributos: {
    backgroundColor: 'black',
    padding: 7,
    borderTopRadius: 0,
    marginTop: 5,
  },
  textoCard: {
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    color: 'white',
    padding: 3,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imagemModal: {
    borderRadius: 0,
    height: 130,
  },
  estiloProgresso: {
    height: 10,
    marginTop: 4,
    width: 500,
  },
  containerProgressoTimeA: {
    marginLeft: 20,
  },
  containerProgressoTimeB: {
    marginLeft: 20,
  },
  imageNat: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: -23,
    left: 75,
  },
});
