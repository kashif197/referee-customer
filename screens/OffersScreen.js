import React from 'react';
import { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card, Image, Icon } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';
import { FAB } from 'react-native-elements';

function OfferScreen({ navigation }) {

    const [offers, setOffers] = React.useState('')
    const { data } = useContext(LoginContext)


    function getOffers() {
        fetch('http://192.168.10.13:5000/offer', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(Json => {
                setOffers(Json)
            })
            .catch(err => console.log(err))
    }

    function availOffer(camName, username) {
        console.log(camName)
        console.log(username)
        console.log(data.token)
        fetch('http://192.168.10.13:5000/offcust/availOffer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + data.token
            },
            body: JSON.stringify({
                campaign_name: camName,
                username: username
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status) alert(data.message)
            })
    }

    if (offers === '') {
        getOffers(data.id, data.token)


        return (
            <View>
            </View>
        )
    }

    else if (offers === 'clear') {

    }

    else {
        return (
            <View>
                <ScrollView style={styles.mainContainer}>
                    {offers.map(item => (
                        <Card key={item._id} containerStyle={{ elevation: 0, borderWidth: 0, marginTop: 40 }}>
                            <Image style={{ width: 400, height: 150 }} source={require('../images/referee-web-bg.png')} />
                            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                                {item.headline}
                            </Text>
                            <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold', color: '#909090' }}>
                                {item.description}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button
                                    buttonStyle={{ width: 80, backgroundColor: '#2EC4B6', }}
                                    title='Avail'
                                    onPress={() => { availOffer(item.campaign_name, data.username) }}
                                />
                                <Icon
                                    name='trash-outline'
                                    type='ionicon'
                                    iconStyle={{ marginHorizontal: 10, marginTop: 5 }}
                                // onPress={() => deleteOffer(data.token, item._id)}
                                />
                            </View>
                        </Card>
                    ))}
                </ScrollView>
                <FAB
                    icon={<Icon
                        name='scan-outline'
                        type='ionicon'
                        color='#fff'
                    />}
                    style={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                    }}
                    color="#2EC4B6"
                    onPress={() => navigation.navigate('Scan')}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

})

export default OfferScreen