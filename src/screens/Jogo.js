import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Api from '../services/Api';

import aguaImage from '../img/agua.png';
import ventoImage from '../img/vento.png';
import fogoImage from '../img/fogo.png';
import relampagoImage from '../img/relampago.png';
import terraImage from '../img/terra.png';

const vidaInicial = 25000;

export default function Jogo() {
  const [timeA, setTimeA] = useState([]);
  const [timeB, setTimeB] = useState([]);
  const [timeACompleto, setTimeACompleto] = useState(false);
  const [timeBCompleto, setTimeBCompleto] = useState(false);
  const [faseSelecao, setFaseSelecao] = useState('timeA');
  const [sound, setSound] = useState();
  const [progressoTimeA, setProgressoTimeA] = useState(1.0); // 1.0 representa 100%
  const [progressoTimeB, setProgressoTimeB] = useState(1.0); // 1.0 representa 100%
  const [resultadoDadoTimeA, setResultadoDadoTimeA] = useState(null);
  const [resultadoDadoTimeB, setResultadoDadoTimeB] = useState(null);



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

  const lidarComSelecaoDePersonagem = (personagem) => {

    if (faseSelecao === 'timeA' && timeA.length < 3) {
      setTimeA([...timeA, personagem]);
    } else if (faseSelecao === 'timeB' && timeB.length < 3) {
      setTimeB([...timeB, personagem]);
    }

    if (timeA.length === 3 && timeB.length === 3) {
      setFaseSelecao('completo');
    } else if (faseSelecao === 'timeA' && timeA.length === 3) {
      setFaseSelecao('timeB');
    }

  };

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/musicaFundo.mpeg'),
      {
        isLooping: true, // Reprodução infinita
      }
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();

    return () => {
      if (sound) {
        console.log('Parando som');
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []);

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

  const lancarDados = () => {
    const resultadoDadoTimeA = Math.floor(Math.random() * 6) + 1; // Gera um número inteiro entre 1 e 6
    const resultadoDadoTimeB = Math.floor(Math.random() * 6) + 1; // Gera um número inteiro entre 1 e 6
  
    setResultadoDadoTimeA(resultadoDadoTimeA);
    setResultadoDadoTimeB(resultadoDadoTimeB);
  
    if (resultadoDadoTimeA > resultadoDadoTimeB) {
      // Time A ataca
      const novoProgressoTimeB = progressoTimeB - 0.1; // Reduz o progresso em 10%
      setProgressoTimeB(novoProgressoTimeB);
    } else {
      // Time B ataca
      const novoProgressoTimeA = progressoTimeA - 0.1; // Reduz o progresso em 10%
      setProgressoTimeA(novoProgressoTimeA);
    }
  };
  

  const calcularDanoEAplicar = () => {
    const dano = 0.05; // Valor do dano
  
    if (progressoTimeA <= 0) {
      // Time A perdeu, aplique o dano apenas ao Time B
      const novoProgressoTimeB = progressoTimeB - dano;
      setProgressoTimeB(novoProgressoTimeB);
    } else if (progressoTimeB <= 0) {
      // Time B perdeu, aplique o dano apenas ao Time A
      const novoProgressoTimeA = progressoTimeA - dano;
      setProgressoTimeA(novoProgressoTimeA);
    } else {
      // Ambos os times ainda têm progresso
      // Não aplique dano a nenhum time neste caso
    }
  };
  



  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/paisagem.jpg')} style={styles.backgroundImage}>

        <View style={styles.containerTimeA}>
          {timeACompleto && (
            <View>
              <FlatList
                data={timeA}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
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
                    <Paragraph style={styles.textPatente}>
                      <Text>Patente: {item.patente}</Text>
                    </Paragraph>
                    <Paragraph style={styles.textJutso}>
                      <Text>Jutsu: {item.jutsu_especial}</Text>
                    </Paragraph>
                    <Card style={styles.cardAtributos}>
                      <Paragraph style={styles.textoCard}>
                        <Text style={styles.estiloTexto}> Ataque: .............. {item.ataque}</Text>
                      </Paragraph>
                      <Paragraph style={styles.textoCard}>
                        <Text style={styles.estiloTexto}> Defesa: .............. {item.defesa}</Text>
                      </Paragraph>
                      <Paragraph style={styles.textoCard}>
                        <Text style={styles.estiloTexto}> Especial: ........... {item.dano_especial}</Text>
                      </Paragraph>
                    </Card>
                  </Card>
                )}
              />
              <View style={styles.containerProgressoTimeA}>
                {timeA.map((personagem, index) => (
                  <View key={personagem.id}>
                    <Title style={styles.nomeTimeA}>{personagem.nome}</Title>
                    <ProgressBar
                      progress={progressoTimeA} // Usar progresso de 0 a 100
                      color={'green'}
                      style={styles.estiloProgressoA} // Inverter horizontalmente

                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={{ backgroundColor: 'red', width: '8%' }}>

          <TouchableOpacity
            title="Atacar"
            style={{ backgroundColor: 'blue' }}
            onPress={() => {
              lancarDados();
              calcularDanoEAplicar();
            }}
          >
            <Text>Atacar</Text>
          </TouchableOpacity>
          <Text>Resultado Dado Time A: {resultadoDadoTimeA}</Text>
          <Text>Resultado Dado Time B: {resultadoDadoTimeB}</Text>



        </View>


        <View style={styles.containerTimeB}>
          {timeBCompleto && (
            <View>
              <FlatList
                data={timeB}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
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
                    <Paragraph style={styles.textPatente}>
                      <Text>Patente: {item.patente}</Text>
                    </Paragraph>
                    <Paragraph style={styles.textJutso}>
                      <Text>Jutsu: {item.jutsu_especial}</Text>
                    </Paragraph>
                    <Card style={styles.cardAtributos}>
                      <Paragraph style={styles.textoCard}>
                        <Text style={styles.estiloTexto}> Ataque: .............. {item.ataque}</Text>
                      </Paragraph>
                      <Paragraph style={styles.textoCard}>
                        <Text style={styles.estiloTexto}> Defesa: .............. {item.defesa}</Text>
                      </Paragraph>
                      <Paragraph style={styles.textoCard}>
                        <Text style={styles.estiloTexto}> Especial: ........... {item.dano_especial}</Text>
                      </Paragraph>
                    </Card>
                  </Card>
                )}
              />
              <View style={styles.containerProgressoTimeB}>
                {timeB.map((personagem, index) => (
                  <View key={personagem.id}>
                    <Title style={styles.nomeTimeB}>{personagem.nome}</Title>
                    <ProgressBar
                      progress={progressoTimeB}
                      color={'green'}
                      style={[
                        styles.estiloProgressoB,
                        { transform: [{ scaleX: -1 }] } // Inverter horizontalmente
                      ]}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1, // O ImageBackground ocupa toda a tela
    resizeMode: 'cover',
    padding: 20,
    flexDirection: 'row',
  },
  containerTimeA: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  containerTimeB: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  textPatente: {
    fontSize: 6,
    marginTop: 5,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2
  },
  textJutso: {
    fontSize: 6,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -12

  },
  cardModal: {
    borderRadius: 5, // 50% do valor original (10)
    backgroundColor: 'red',
    padding: 5, // 50% do valor original (10)
    marginBottom: 5, // 50% do valor original (10)
  },
  card: {
    borderWidth: 4,
    borderColor: 'black',
    padding: 4,
    width: 110, // 50% da largura original (220)
    backgroundColor: '#800000',
    borderRadius: 2,
    height: 200,
    marginTop: 35
  },
  imagem: {
    borderRadius: 0,
    height: 65, // 50% da altura original (130)
  },
  nomePersonagem: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 5,
    marginVertical: -3
  },
  estiloTexto: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 7,
  },
  cardAtributos: {
    backgroundColor: 'black',
    padding: 4,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    marginTop: -5,
    height: 65
  },
  textoCard: {
    backgroundColor: 'gray',
    height: 15,
  },
  imagemModal: {
    borderRadius: 0,
    height: 65, // 50% da altura original (130)
  },
  estiloProgressoA: {
    height: 5, // 50% da altura original (10)
    width: 330, // 50% da largura original (500)
    alignSelf: 'flex-start',
  },
  estiloProgressoB: {
    height: 5, // 50% da altura original (10)
    width: 330, // 50% da largura original (500)
    alignSelf: 'flex-end',
  },
  imageNat: {
    width: 13,
    height: 13,
    position: 'absolute',
    top: -7,
    left: 40,
  },
  nomeTimeB: {
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: 8,
    fontSize: 13
  },
  nomeTimeA: {
    color: 'white',
    alignSelf: 'flex-start',
    marginRight: 8,
    fontSize: 13
  },
});

