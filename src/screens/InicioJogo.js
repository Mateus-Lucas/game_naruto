import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import { Button } from 'react-native-paper';

export default function InicioJogo(props) {

    const navigation = props.navigation

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../img/NarutoSasuke.jpg')} style={styles.backgroundImage}>
                <Text style={styles.text}>Bem vindo ao jogo de cartas de Naruto!</Text>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => navigation.navigate('Jogo')}
                >
                    Jogar
                </Button>

                <Button
                    mode='contained'
                    style={styles.button}
                    onPress={() => setModalVisible(true)}>
                    Instruções
                </Button>
            </ImageBackground>

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Instruções:</Text>
                        <Text>1. Selecione seus 3 personagens pelo modal que aparecer na tela.</Text>
                        <Text>2. O jogo é de duas pessoas.</Text>
                        <Text>3. Gire os dados para atacar e defender.</Text>
                        <Text>4. O dado do time que for maior, ganha e aplica dano no adversário.</Text>
                        <Button
                            mode="contained"
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}>
                            Fechar
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderWidth: 3,
        borderColor: 'white',
        marginTop: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        marginTop: 10,
    },
});