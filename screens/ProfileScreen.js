import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Avatar, ListItem, Icon } from 'react-native-elements';
import { LoginContext } from '../contexts/LoginContext';
import AsyncStorage from '@react-native-community/async-storage'

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (err) {
      console.log(err)
    }
  };

const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}


function ProfileScreen({ route, navigation }) {
    const { data, resetData } = useContext(LoginContext)

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <View style={styles.headerArea}>
                    <Avatar
                        rounded
                        source={{ uri: data.photoURL === '' ? "https://lh3.googleusercontent.com/TwHrwftk8BaWEV4swcWDtdcg1halIcT2U3EWkXYkDyYPXmufMLtn1DJG569HIIsd4ty4=s630-fcrop64=1,2202423de15ce329" : data.photoURL }}
                        size="large"
                    />
                    <View>
                        <Text style={styles.usernameText}>{data.username}</Text>
                        <Text style={styles.subText}>Referral Code: {data.code}</Text>
                    </View>
                </View>
                <Text style={styles.menuHeader}>Profile Information</Text>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>First Name</ListItem.Title>
                    </ListItem.Content>
                    <Text style={{ fontSize: 16, color: '#707070' }}>{data.firstName}</Text>

                </ListItem>
                <ListItem bottomDivider>
                <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Last Name</ListItem.Title>
                    </ListItem.Content>
                    <Text style={{ fontSize: 16, color: '#707070' }}>{data.lastName}</Text>

                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Email Address</ListItem.Title>
                    </ListItem.Content>
                    <Text style={{ fontSize: 16, color: '#707070' }}>{data.email}</Text>

                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Username</ListItem.Title>
                    </ListItem.Content>
                    <Text style={{ fontSize: 16, color: '#707070' }}>{data.username}</Text>

                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Contact Number</ListItem.Title>
                    </ListItem.Content>
                    <Text style={{ fontSize: 16, color: '#707070' }}>{data.contact}</Text>

                </ListItem>

                <Text style={styles.menuHeader}>Account Management</Text>
                <ListItem bottomDivider onPress={() => { navigation.navigate('RequestSupport', { id: data.id, token: data.token }) }}>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Request Support</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        name="chevron-forward-outline"
                        type='ionicon'
                        color='#707070'
                    />
                </ListItem>
                <ListItem bottomDivider onPress={() => { }}>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Change Password</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        name="chevron-forward-outline"
                        type='ionicon'
                        color='#707070'
                    />
                </ListItem>
                <ListItem bottomDivider onPress={() => { }}>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Edit Personal Information</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        name="chevron-forward-outline"
                        type='ionicon'
                        color='#707070'
                    />
                </ListItem>
                <ListItem bottomDivider onPress={() => {navigation.navigate('Scan') }}>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Scan QR Code</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        name="chevron-forward-outline"
                        type='ionicon'
                        color='#707070'
                    />
                </ListItem>
                {/* <ListItem bottomDivider onPress={() => { }}>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>Payments</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        name="chevron-forward-outline"
                        type='ionicon'
                        color='#707070'
                    />
                </ListItem> */}
                <Button
                    title='LOG OUT'
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontSize: 18 }}
                    onPress={() => {
                        resetData()
                        clearAsyncStorage()
                        storeData('loggedState', 'no')
                        navigation.navigate('Login')
                    }}
                />


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 200,
        width: 200,
        resizeMode: "cover",
        justifyContent: "center",
        marginLeft: 15

    },
    headerArea: {
        height: 120,
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#2EC4B6',
        color: '#fff',
        paddingLeft: 25,
        marginTop: 25
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    usernameText: {
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 15,
        fontSize: 24
    },
    menuHeader: {
        marginVertical: 20,
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 20
    },
    subText: {
        color: 'white',
        // fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 15,
        marginBottom: 5
    },
    buttonStyle: {
        width: 330,
        marginVertical: 20,
        backgroundColor: '#DC143C',
        marginLeft: 40
    }
})

export default ProfileScreen