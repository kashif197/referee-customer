import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, SocialIcon, Image } from 'react-native-elements';

function ReferralScreen({ navigation, route }) {

    const [refCode, setRefCode] = React.useState('')


    const performTransaction = (username) => {
        fetch("http://192.168.10.13:5000/user/transaction", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                referral_code: refCode,
                username: username
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status) {
                alert("Transaction Successful")
                navigation.navigate("Offers")
            }
        })
    }

    return (
        <View style={styles.topContainer}>
            <View>
                <View style={styles.labelContainer}>
                    <Text style={styles.header}>Referral Code</Text>
                    <Text style={styles.subheader}>Enter a referral code for the referee who shared this with you.</Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.emailContainer}>
                        <Input
                            placeholder='Referral Code'
                            onChangeText={value => setRefCode(value)}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title='Continue'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        performTransaction(route.params.username)
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    labelContainer: {
        marginTop: 50
    },
    mainContainer: {
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        marginLeft: 40,
        fontWeight: 'bold'
    },
    subheader: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 40,
        fontWeight: 'bold',
        color: '#909090'
    },
    emailContainer: {
        width: 350,
        marginTop: 40,
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: '#2EC4B6',
        width: 320,
        alignSelf: 'center',
        marginBottom: 20
    },
    statsBox: {
        backgroundColor: '#2EC4B6',
        height: 300,
        borderBottomLeftRadius: 2000,
    },
})

export default ReferralScreen