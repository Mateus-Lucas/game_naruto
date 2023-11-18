import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home(props) {
    const navigation = props.navigation;

    const navigateToDetails = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
                <Card style={styles.card} onPress={() => navigateToDetails('Personagens')}>
                    <Card.Content>
                        <Title>Personagens</Title>
                        <Card.Cover
                            source={require('../img/personagens.jpg')}
                            style={styles.cardImage}
                        />
                        <Button
                            onPress={() => navigateToDetails('Personagens')}
                            icon={({ size, color }) => (
                                <Icon name="information" size={size} color={color} />
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
                        <Button
                            onPress={() => navigateToDetails('Aldeias')}
                            icon={({ size, color }) => (
                                <Icon name="information" size={size} color={color} />
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
                        <Button
                            onPress={() => navigateToDetails('Jogo')}
                            icon={({ size, color }) => (
                                <Icon name="information" size={size} color={color} />
                            )}
                        >
                            Saber Mais
                        </Button>
                    </Card.Content>
                </Card>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderWidth: 3,
        borderColor: 'black'
    },
    cardImage: {
        height: 130,
        resizeMode: 'cover',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 0
    },
});
