import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ApiPersonagens from '../services/ApiPersonagens'
import { Card } from 'react-native-paper'

export default function Personagem({ route }) {

  const personagem = route.params.personagem
  console.log(personagem)
  const retorno = ApiPersonagens.filter(personagem => personagem.personagem == personagem.personagem);

  return (
    <View style={styles.container}>
      <ScrollView>

        <Card style={styles.card}>
          <Card.Cover source={{ uri: personagem.imagem }} />
          <Card.Title title={`Aldeia da(o) ${personagem.aldeia}`} />
          <Card.Content>
            <Text variant="bodyMedium">{personagem.nome}</Text>
            <Text variant="bodyMedium">{personagem.jutsu_especial}</Text>
            <Text variant="bodyMedium">{personagem.patente}</Text>
            <Text variant="bodyMedium">{personagem.nome}</Text>
            <Text variant="bodyMedium">{personagem.nome}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    borderWidth: 1,
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    height: '90%'
  },
})