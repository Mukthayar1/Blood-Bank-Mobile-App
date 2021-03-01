import React, { useEffect } from 'react';
import { View, FlatList, Linking, ActivityIndicator } from "react-native"
import {
  Header, Content, Footer, FooterTab, Text, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right
} from 'native-base';
import Head from "./Head";
import firebase from '@react-native-firebase/app';
import { isSignedIn } from "./sss";
import email from 'react-native-email';


export default function Save(props) {

  const [CUser, GetCUser] = React.useState({})
  const [UserId, GetUserId] = React.useState();

  const [U, GU] = React.useState([])
  useEffect(() => {
    isSignedIn()
      .then(res => {
        if (res) {

          GetUserId(res)
        }
      })

    setTimeout(async () => {
      try {
        firebase.database().ref('Post').on('value', (snapshot) => {
          var li = []
          snapshot.forEach((child) => {
            li.push({
              key: child.key,
              Tittle: child.val().Tittle,
              Detail: child.val().Detail,
              Image : child.val().PIC,
              Mobile : child.val().Mobile,
            })
          })
          GU({ list: li })
        })

      } catch (e) {
        console.log(e)
      }
    }, 1000)


  }, [UserId])

  if (UserId == null) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="black" />
    </View>)

  }

  const call = async (phone) =>{
    let celNumber = phone
    const url = `whatsapp://send?phone=${celNumber}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
          Linking.openURL(url);
      } else {
          Alert.alert(
              'Alert',
              'WhatsApp is not installed',
          )
      }
    });
    }



  return (
    <>


      <Header style={{ backgroundColor: 'green' }}>
        <Head />
      </Header>

      <FlatList
        data={U.list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {

          return (
            <View>
              {item.key === UserId ? null :
                <Card style={{ flex: 0 }}>
                  <CardItem>        
                  <Left>
                      <Thumbnail source={{ uri: item.Image }} />
                      <Button title="WhatsApp Call" onPress={()=>call(item.PHONE)} style={{backgroundColor: 'green',width:60,margin:13,borderRadius:50 }}>
                  <Icon name="ios-call"/>
                  
                  </Button>    
                        <Text>{item.NAME}</Text>
                        </Left>
                        <Body>
                        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}>{item.Tittle}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.Detail}</Text>

                      </Body>

                  </CardItem>
                </Card>
              }

            </View>
          )
        }} />

      <Content></Content>




    </>

  )
}
