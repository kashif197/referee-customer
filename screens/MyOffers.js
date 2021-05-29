import React from 'react';
import { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card, Image, Icon, Badge } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';

function MyOffers({ navigation }) {

    const [offers, setOffers] = React.useState('')
    const { data } = useContext(LoginContext)


    function getAvailedOffers() {
        fetch('http://192.168.10.13:5000/offcust/getAvailedOffers/' + data.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(Json => {
                setOffers(Json.data)
            })
            .catch(err => console.log(err))
    }

    if (offers === '') {
        getAvailedOffers()


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
                            {item.offer_headline}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold', color: '#909090' }}>
                            {item.offer_description}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                                buttonStyle={{ width: 80, backgroundColor: '#2EC4B6', }}
                                title='Redeem'
                                onPress={() => {
                                    if (item.targetTransaction == item.count) {
                                        alert("Show this to redeem.")
                                    }
                                    else {
                                        alert("You do not meet the minimum criteria to avail this offer.")
                                    }
                                 }}
                            />
                            <Badge status="warning" value={item.count + "/" + item.targetTransaction} badgeStyle={{width:40, height: 40, borderRadius:20}} />

                            {/* <Icon
                                name='trash-outline'
                                type='ionicon'
                                iconStyle={{ marginHorizontal: 10, marginTop: 5 }}
                            // onPress={() => deleteOffer(data.token, item._id)}
                            /> */}
                        </View>
                    </Card>
                )

                )}

            </ScrollView>

        );
    }

}

const styles = StyleSheet.create({

})

export default MyOffers