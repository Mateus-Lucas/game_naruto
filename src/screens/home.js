import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function Home(props) {

    const navigation = props.navigation

    return (
        <View style={styles.container}>
            <Button
                onPress={() => navigation.navigate('Jogo')}
            >
                Jogo
            </Button>
            <Button
                onPress={() => navigation.navigate('Aldeias')}
            >
                Aldeias
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
})