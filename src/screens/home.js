import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home(props) {
    const navigation = props.navigation;

    const navigateToDetails = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <ImageBackground
            source={require('../img/images.jpg')}
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Card style={styles.card} onPress={() => navigateToDetails('Personagens')}>
                    <Card.Content>
                        <Title>Personagens</Title>
                        <Card.Cover
                            source={require('../img/personagens.jpg')}
                            style={styles.cardImage}
                        />
                        <Button textColor='black'
                            onPress={() => navigateToDetails('Personagens')}
                            icon={({ size, color }) => (
                                <Icon name="account-supervisor" size={size} color={'black'} />
                            )}
                        >Saber Mais</Button>
                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => navigateToDetails('Aldeias')}>
                    <Card.Content>
                        <Title>Aldeias</Title>
                        <Card.Cover
                            source={require('../img/aldeias.jpg')}
                            style={styles.cardImage}
                        />
                        <Button textColor='black'
                            onPress={() => navigateToDetails('Aldeias')}
                            icon={({ size, color }) => (
                                <Icon name="globe-model" size={size} color={'black'} />
                            )}
                        >Saber Mais</Button>
                    </Card.Content>
                </Card>

                <Card style={styles.card} onPress={() => navigateToDetails('Jogo')}>
                    <Card.Content>
                        <Title>Jogo</Title>
                        <Card.Cover
                            source={require('../img/jogo.png')}
                            style={styles.cardImage}
                        />
                        <Button textColor='black'
                            onPress={() => navigateToDetails('Jogo')}
                            icon={({ size, color }) => (
                                <Icon name="gamepad-variant" size={size} color={'black'} />
                            )}
                        >
                            Iniciar Jogo
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.7)',  // Adjust the alpha value to control the background opacity
        marginVertical: 5,
        borderWidth: 3,
        borderColor: 'black',
    },
    cardImage: {
        height: 130,
        resizeMode: 'cover',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 0,
    },
});
