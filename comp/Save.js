import React from 'react';
import { View, FlatList, Linking, ActivityIndicator} from "react-native"
import {Container, Header, Content,Footer, FooterTab, Text,Card, CardItem, Thumbnail,Button, Icon, Left, Body, Right, Item
} from 'native-base';
import Head from "./Head";
import firebase from '@react-native-firebase/app';
import { isSignedIn } from "./sss";
import email from 'react-native-email';


export default function Save(props) {
  const [UserId, GetUserId] = React.useState();
  const [U, GU] = React.useState([])
  const [CUser, GetCUser] = React.useState({})

  isSignedIn()
    .then(res => {
      if (res) {

        GetUserId(res)
      }
    })
    const ref = firebase.database().ref(`user/${UserId}`)

  ref.on('value', (snapshot) => {
    const user = snapshot.val()

    GetCUser(user)


  }, (error) => {
    console.log(error)
  })


  firebase.database().ref('user').on('value', (snapshot) => {
    var li = []
    snapshot.forEach((child) => {
      li.push({
        key: child.key,
        NAME: child.val().NAME,
        DONAR: child.val().Donar,
        BGROUP: child.val().Blood_Group,
        PHONE: child.val().Mobile,
        IMAGE: child.val().photoURL,
        EMAIL : child.val().Email
      })
    })
    GU({ list: li })
  })

  handleEmail = (emails) => {
    const to = [emails] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        subject: 'EMAIL BY BLOOD BANK MANAGMENT USERS',
        body: 'HELLO SIR ,THIS USER NEED BLLOD PLESE MAKE SURE TO HELP EACH OTHER AND SAVE HUMINITY'
    }).catch(console.error)
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

  if (CUser == null) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="black" />
      <Text>Loading...</Text>
    </View>)

  }

  return (
    <>
      <Container>
        <Header style={{backgroundColor:'pink'}}>
          <Head />
        </Header>
        <FlatList
            data={U.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {

              return (
                <View>
                  {Item.BGROUP !== "O+" ? null :
                <Card style={{ flex: 0 }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: item.IMAGE }} />
                      <Body>
                        <Text>{item.NAME}</Text>
                        <Text note>{item.PHONE}</Text>
                        <Text style={{color:'pink',fontWeight:'bold'}}>{item.BGROUP}</Text>
                      </Body>
                    </Left>
                    <Right>
                    
                       <View >
                <Button title="Send Mail" onPress={()=>handleEmail(item.EMAIL)} style={{backgroundColor: 'pink',width:60 ,margin:5 }}>
                <Icon name="ios-mail"/>
                  </Button>
                  <Button title="WhatsApp Call" onPress={()=>call(item.PHONE)} style={{backgroundColor: 'pink',width:60,margin:5 }}>
                  <Icon name="ios-call"/>
                  
                  </Button>    
            </View>
                    </Right>
                  </CardItem>
                </Card>
            }
            
                </View>
              )
            }} />
        <Content>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:'pink'}}>
            <Button vertical onPress={() => props.navigation.navigate("Account")} >
              <Text style={{color:'white',fontWeight:'bold'}} >Account</Text>
            </Button>
            <Button vertical onPress={() => props.navigation.navigate("Donars")}>
              <Text style={{color:'white',fontWeight:'bold'}} >Donars</Text>
            </Button>
            <Button vertical onPress={() => props.navigation.navigate("Save")}>
              <Text style={{color:'white',fontWeight:'bold'}}>My Blood Type</Text>
            </Button>

          </FooterTab>
        </Footer>
      </Container>

    </>
  )
  }
