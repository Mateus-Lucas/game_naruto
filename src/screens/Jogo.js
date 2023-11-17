import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList, Image, ImageBackground, Animated, Alert, ScrollView } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button, TextInput } from 'react-native-paper';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Personagens from '../services/ApiPersonagens';
import { LogBox } from 'react-native';
import { Easing } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import aguaImage from '../img/agua.png';
import ventoImage from '../img/vento.png';
import fogoImage from '../img/fogo.png';
import relampagoImage from '../img/relampago.png';
import terraImage from '../img/terra.png';
import dado1 from '../img/dado1.jpeg'
import dado2 from '../img/dado2.jpeg'
import dado3 from '../img/dado3.jpeg'
import dado4 from '../img/dado4.jpeg'
import dado5 from '../img/dado5.jpeg'
import dado6 from '../img/dado6.jpeg'
export default function Jogo(props) {
  const [timeA, setTimeA] = useState([]);
  const [timeB, setTimeB] = useState([]);
  const [timeACompleto, setTimeACompleto] = useState(false);
  const [timeBCompleto, setTimeBCompleto] = useState(false);
  const [faseSelecao, setFaseSelecao] = useState('timeA');
  const [sound, setSound] = useState();
  const [progressoTimeA, setProgressoTimeA] = useState(1.0); // 1.0 representa 100%
  const [progressoTimeB, setProgressoTimeB] = useState(1.0); // 1.0 representa 100%
  const [resultadoDadoTimeA, setResultadoDadoTimeA] = useState(6);
  const [resultadoDadoTimeB, setResultadoDadoTimeB] = useState(3);
  const [dadoRotation] = useState(new Animated.Value(0));
  const [jogoAcabou, setJogoAcabou] = useState(false);
  const [vencedor, setVencedor] = useState(null);
  const [nomeJogadorA, setNomeJogadorA] = useState('');
  const [nomeJogadorB, setNomeJogadorB] = useState('');
  const [placarVisivel, setPlacarVisivel] = useState(false);
  const [placar, setPlacar] = useState([]);
  const [nomeModalVisivel, setNomeModalVisivel] = useState(true);
  const [vitoriasJogadorA, setVitoriasJogadorA] = useState(0);
  const [vitoriasJogadorB, setVitoriasJogadorB] = useState(0);

  const navigation = props.navigation

  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

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

  const resultadoParaImagem = {
    1: dado1,
    2: dado2,
    3: dado3,
    4: dado4,
    5: dado5,
    6: dado6
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

  const personagensDisponiveis = Personagens.filter((personagem) => {
    return !timeA.includes(personagem) && !timeB.includes(personagem);
  });

  const lancarDados = () => {
    const resultadoDadoTimeA = Math.floor(Math.random() * 6) + 1; // Gera um número inteiro entre 1 e 6
    const resultadoDadoTimeB = Math.floor(Math.random() * 6) + 1; // Gera um número inteiro entre 1 e 6

    setResultadoDadoTimeA(resultadoDadoTimeA);
    setResultadoDadoTimeB(resultadoDadoTimeB);

    Animated.timing(dadoRotation, {
      toValue: 360, // 360 graus para uma rotação completa
      duration: 700, // Duração da animação em milissegundos
      easing: Easing.linear, // Tipo de animação (linear para rotação uniforme)
    }).start(() => {
      // A animação foi concluída, você pode redefinir a rotação aqui se desejar.
      dadoRotation.setValue(0);
    });


    if (resultadoDadoTimeA > resultadoDadoTimeB) {
      // Time A ataca
      const novoProgressoTimeB = progressoTimeB - 0.1; // Reduz o progresso em 10%
      setProgressoTimeB(novoProgressoTimeB);
    } else if (resultadoDadoTimeA < resultadoDadoTimeB) {
      // Time B ataca
      const novoProgressoTimeA = progressoTimeA - 0.1; // Reduz o progresso em 10%
      setProgressoTimeA(novoProgressoTimeA);
    }
    else {
      alert('Empate')
    }
  };

  const calcularDanoEAplicar = () => {
    const dano = 0.05; // Valor do dano

    if (progressoTimeA <= 0 || progressoTimeB <= 0) {
      resetGame();
    }

    if (progressoTimeA <= 0) {
      // Time A perdeu, aplique o dano apenas ao Time B
      const novoProgressoTimeB = progressoTimeB - dano;
      setProgressoTimeB(novoProgressoTimeB);

      if (novoProgressoTimeB <= 0) {
        // Time B também perdeu, reinicie o jogo
        resetGame();
      }
    } else if (progressoTimeB <= 0) {
      // Time B perdeu, aplique o dano apenas ao Time A
      const novoProgressoTimeA = progressoTimeA - dano;
      setProgressoTimeA(novoProgressoTimeA);

      if (novoProgressoTimeA <= 0) {
        // Time A também perdeu, reinicie o jogo
        resetGame();
      }
    }
  };

  const vidaInicial = 1.0; // Altere para 1.0

  const resetGame = () => {
    setTimeA([]);
    setTimeB([]);
    setFaseSelecao('timeA');
    setProgressoTimeA(vidaInicial); // Use vidaInicial aqui
    setProgressoTimeB(vidaInicial); // Use vidaInicial aqui
    setResultadoDadoTimeA(3);
    setResultadoDadoTimeB(6);
    solicitarNomesDosJogadores();

  };

  useEffect(() => {
    if (progressoTimeA <= 0 || progressoTimeB <= 0) {
      setTimeout(() => {
        resetGame();
      }, 100); // Espere 100ms antes de redefinir o jogo
    }
  }, [progressoTimeA, progressoTimeB]);

  const dadoImageStyle = {
    transform: [{ rotate: dadoRotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
  };

  useEffect(() => {
    if (progressoTimeA <= 0 || progressoTimeB <= 0) {
      if (progressoTimeA <= 0 && progressoTimeB > 0) {
        setVencedor('Time B');
        setVitoriasJogadorB(vitoriasJogadorB + 1); // Incrementa as vitórias do jogador B
        registrarVitoria(nomeJogadorB); // Registrar a vitória do jogador B
      } else if (progressoTimeB <= 0 && progressoTimeA > 0) {
        setVencedor('Time A');
        setVitoriasJogadorA(vitoriasJogadorA + 1); // Incrementa as vitórias do jogador A
        registrarVitoria(nomeJogadorA); // Registrar a vitória do jogador A
      } else {
        setVencedor('Empate');
      }
      
      setPlacarVisivel(true); // Abre o modal do placar
      obterPlacar(); // Atualiza o placar
    }
  }, [progressoTimeA, progressoTimeB]);


  const registrarVitoria = async (nomeJogador) => {
    try {
      const vitoriasAnteriores = await AsyncStorage.getItem('vitorias_' + nomeJogador) || '0'; // Se não houver valor, inicie com '0'
      const vitoriasAnterioresInt = parseInt(vitoriasAnteriores, 10);
      const novasVitorias = vitoriasAnterioresInt + 1;
      await AsyncStorage.setItem('vitorias_' + nomeJogador, novasVitorias.toString());
    } catch (error) {
      console.error('Erro ao registrar vitória:', error);
    }
  };
  
  
  const obterPlacar = async () => {
    try {
      const chaves = await AsyncStorage.getAllKeys();
      const placar = await AsyncStorage.multiGet(chaves);
  
      // Mapeia os valores corretamente
      const placarMapeado = placar.map((item) => {
        const nomeJogador = item[0].replace('vitorias_', '');
        const vitorias = parseInt(item[1], 10);
        return { nomeJogador, vitorias };
      });
  
      // Ordena o placar em ordem decrescente com base no número de vitórias
      placarMapeado.sort((a, b) => b.vitorias - a.vitorias);
  
      setPlacar(placarMapeado);
    } catch (error) {
      console.error('Erro ao obter placar:', error);
    }
  };
  
  const solicitarNomesDosJogadores = async () => {
    // Verifica se os nomes dos jogadores já foram salvos
    const jogadorASalvo = await AsyncStorage.getItem('nomeJogadorA');
    const jogadorBSalvo = await AsyncStorage.getItem('nomeJogadorB');
  
    if (jogadorASalvo && jogadorBSalvo) {
      // Nomes dos jogadores já foram salvos, exibe um aviso
      Alert.alert(
        'Nomes Recuperados',
        `Nomes dos jogadores recuperados:\nJogador A: ${jogadorASalvo}\nJogador B: ${jogadorBSalvo}`,
      );
  
      // Atualiza o nome dos jogadores
      setNomeJogadorA(jogadorASalvo);
      setNomeJogadorB(jogadorBSalvo);
  
      console.log('Nome do Jogador A:', jogadorASalvo);
      console.log('Nome do Jogador B:', jogadorBSalvo);
  
      // Atualiza as vitórias dos jogadores se necessário
      const vitoriasA = await AsyncStorage.getItem('vitorias_' + jogadorASalvo);
      const vitoriasB = await AsyncStorage.getItem('vitorias_' + jogadorBSalvo);
      if (vitoriasA) {
        setVitoriasJogadorA(parseInt(vitoriasA));
      }
      if (vitoriasB) {
        setVitoriasJogadorB(parseInt(vitoriasB));
      }
    } else {
      // Nomes dos jogadores não foram salvos, solicita que os jogadores digitem seus nomes
      Alert.prompt('Digite o nome do Jogador A', '', (nome) => {
        if (nome) {
          setNomeJogadorA(nome);
          AsyncStorage.setItem('nomeJogadorA', nome); // Salva o nome no AsyncStorage
        }
      });
  
      Alert.prompt('Digite o nome do Jogador B', '', (nome) => {
        if (nome) {
          setNomeJogadorB(nome);
          AsyncStorage.setItem('nomeJogadorB', nome); // Salva o nome no AsyncStorage
        }
      });
    }
  };
  


  const iniciarJogo = () => {

    const vitoriasJogadorA = AsyncStorage.getItem('vitorias_' + nomeJogadorA);
    if (vitoriasJogadorA !== null) {
      // Nome do Jogador A já existe no ranking, incrementa suas vitórias
      const novasVitorias = parseInt(vitoriasJogadorA, 10) + 1;
      AsyncStorage.setItem('vitorias_' + nomeJogadorA, novasVitorias.toString());
    }

    // Verifica se o nome do Jogador B já está no ranking
    const vitoriasJogadorB = AsyncStorage.getItem('vitorias_' + nomeJogadorB);
    if (vitoriasJogadorB !== null) {
      // Nome do Jogador B já existe no ranking, incrementa suas vitórias
      const novasVitorias = parseInt(vitoriasJogadorB, 10) + 1;
      AsyncStorage.setItem('vitorias_' + nomeJogadorB, novasVitorias.toString());
    }

    resetGame(); // Reinicia o jogo com os nomes dos jogadores
  };

  const salvarNomes = async () => {
    if (nomeJogadorA && nomeJogadorB) {
      // Verifica se ambos os nomes dos jogadores foram preenchidos
      await AsyncStorage.setItem('nomeJogadorA', nomeJogadorA);
      await AsyncStorage.setItem('nomeJogadorB', nomeJogadorB);
      setNomeModalVisivel(false); // Fecha o modal de nomes
      iniciarJogo(); // Inicia o jogo
    } else {
      // Exibe uma mensagem de erro se algum dos nomes não estiver preenchido
      Alert.alert('Erro', 'Preencha os nomes dos jogadores antes de salvar.');
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

        <View style={{ marginTop: 25 }}>
          <Button onPress={() => setPlacarVisivel(true)} style={{ marginTop: -30, borderColor: 'black', borderWidth: 3 }}>Ver Placar</Button>
          <Text style={styles.textDados}>Time A</Text>
          <Animated.Image
            source={resultadoParaImagem[resultadoDadoTimeA]}
            style={[styles.dadoImage, dadoImageStyle]}
            useNativeDriver={true}
          />
          <TouchableOpacity
            title="Atacar"
            style={styles.botaoDados}
            onPress={() => {
              lancarDados();
              calcularDanoEAplicar();
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>ROLAR</Text>
          </TouchableOpacity>
          <Animated.Image
            source={resultadoParaImagem[resultadoDadoTimeB]}
            style={[styles.dadoImage, dadoImageStyle]}
            useNativeDriver={true}
          />
          <Text style={styles.textDados}>Time B</Text>

        </View>

        <View style={styles.container}>
            <Button onPress={() => navigation.navigate('Home')} style={{ marginLeft: 140, marginVertical: -4, borderColor: 'black', borderWidth: 3 }}> Início </Button>
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
        <Modal visible={placarVisivel} animationType="slide" transparent={true}>
          <View style={styles.containerModal}>
            <View style={styles.conteudoModal}>
              <Title style={[styles.tituloModal, styles.textoNaruto]}>Placar de Vitórias</Title>
              <ScrollView>
                {placar.map((item, index) => (
                  <View style={styles.placarItem} key={index}>
                    <Text style={[styles.placarPosicao, styles.textoNaruto]}>{index + 1}º</Text>
                    <Text style={[styles.placarNome, styles.textoNaruto]}>{item.nomeJogador}</Text>
                    <Text style={[styles.placarVitorias, styles.textoNaruto]}>{item.vitorias}</Text>
                  </View>
                ))}
              </ScrollView>
              <Button onPress={() => setPlacarVisivel(false)} style={styles.botaoFechar}>
                Fechar
              </Button>
            </View>
          </View>
        </Modal>



        <Modal visible={nomeModalVisivel} transparent={true}>
          <View style={styles.containerModal}>
            <View style={styles.conteudoModal}>
              <Title style={styles.tituloModal}>Nomes dos Jogadores</Title>
              <TextInput
                placeholder="Nome do Jogador A"
                value={nomeJogadorA}
                onChangeText={(text) => setNomeJogadorA(text)}
                style={styles.inputNome}
              />
              <TextInput
                placeholder="Nome do Jogador B"
                value={nomeJogadorB}
                onChangeText={(text) => setNomeJogadorB(text)}
                style={styles.inputNome}
              />
              <Button title="Salvar Nomes" onPress={() => salvarNomes()} />
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
  dadoImage: {
    top: '4%', // Centraliza verticalmente no meio do card
    left: '165%', // Centraliza horizontalmente no meio do card
    transform: [{ translateX: 300 }, { translateY: 100 }], // Ajusta o posicionamento para centralizar
    width: 50, // Defina o tamanho desejado
    height: 50, // Defina o tamanho desejado
    borderRadius: 7, // Define metade da largura/altura para criar um círculo
    backgroundColor: 'white', // Cor de fundo do dado
    borderWidth: 2, // Largura da borda
    borderColor: 'black', // Cor da borda
    justifyContent: 'center', // Para centralizar o conteúdo (número)
    transform: [{ scale: 0.7 }], // Reduzir o tamanho
  },
  botaoDados: {
    top: '3%', // Centraliza verticalmente no meio do card
    left: '145%', // Centraliza horizontalmente no meio do card
    backgroundColor: 'red',
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'black',
    textColor: 'white'
  },
  textDados: {
    top: '4%', // Centraliza verticalmente no meio do card
    left: '145%', // Centraliza horizontalmente no meio do card
    backgroundColor: 'red',
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoModal: {
    backgroundColor: 'white', // Cor de fundo do modal
    padding: 16,
    borderRadius: 8,
  },
  tituloModal: {
    fontSize: 24,
    marginBottom: 16,
  },
  placarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  placarPosicao: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  placarNome: {
    flex: 1,
  },
  textoNaruto: {
    color: 'orange',
  },
  botaoFechar: {
    backgroundColor: 'red', // Cor de fundo do botão Fechar
    marginTop: 16,
  },
});

