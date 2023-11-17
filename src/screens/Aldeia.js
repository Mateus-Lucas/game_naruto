import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import ApiPersonagens from '../services/ApiPersonagens';

export default function Aldeia({route}) {
    const aldeia = route.params.aldeia
    console.log(aldeia)
    const retorno = ApiPersonagens.filter(personagem => personagem.aldeia == aldeia.aldeia);

  return (
    <View style={styles.container}>
     <Card style={styles.card}>
    <Card.Cover source={{ uri: aldeia.imagem }} />
    <Card.Title title={`Aldeia da(o) ${aldeia.aldeia}`}/>
    <Card.Content>
      <Text variant="bodyMedium">{aldeia.descricao}</Text>
      {retorno.map((teste) => <Text style={{fontWeight: 'bold'}}>{teste.nome}</Text>)}
    </Card.Content>

  </Card>
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