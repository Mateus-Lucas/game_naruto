import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ApiPersonagens from '../services/ApiPersonagens';
import { Card } from 'react-native-paper';
import { ImageBackground } from 'react-native';

export default function Personagem({ route }) {
  const personagem = route.params.personagem;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/images.jpg')}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.cardTitle}>{`Nome: ${personagem.nome}`}</Text>
            </View>
            <Card.Cover style={styles.cardImage} source={{ uri: personagem.imagem }} />
            <Card.Content>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Aldeia:</Text> {personagem.aldeia}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Jutsu Especial:</Text> {personagem.jutsu_especial}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Patente:</Text> {personagem.patente}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Natureza de Chacra:</Text> {personagem.natureza_de_chacra}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Ataque:</Text> {personagem.ataque}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Defesa:</Text> {personagem.defesa}
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    padding: 28,
    width: '90%',
    alignItems: 'center',
    marginTop: 50,
  },
  cardImage: {
    height: 400,
    width: 300,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: 'black', 
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 30,
    color: 'white', 
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
