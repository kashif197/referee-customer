import React from 'react';
import { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card, Image, Icon } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';
import AsyncStorage from '@react-native-community/async-storage'

const getData = async () => {
    let data = await AsyncStorage.getItem('email');
    let newData = JSON.parse(data)
    console.log(newData)
}

function AvailedOffers({ route, navigation }) {

    const [offers, setOffers] = React.useState('')
    const { data } = useContext(LoginContext)


    function getAvailedOffers() {
        fetch('http://192.168.10.13:5000/offcust/availedOffer', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer' + data.token
            }
        })
            .then(res => res.json())
            .then(Json => {
                setOffers(Json)
            })
            .catch(err => console.log(err))
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
                                    title='Edit'
                                    onPress={() => { navigation.navigate('Edit', { token: data.token, id: item._id, name: item.campaign_name, headline: item.headline, description: item.description }) }}
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

        );
    }

}

const styles = StyleSheet.create({
})

export default AvailedOffers