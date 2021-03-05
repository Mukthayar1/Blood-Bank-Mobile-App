import React , {useEffect} from 'react';
import { View, FlatList, Linking , ActivityIndicator} from "react-native"
import { Header, Content,Footer, FooterTab, Text,Card, CardItem, Thumbnail,Button, Icon, Left, Body, Right
} from 'native-base';
import Head from "./Head";
import firebase from '@react-native-firebase/app';
import { isSignedIn } from "./sss";
import email from 'react-native-email';


export default function Manager(props) {

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
        firebase.database().ref('user').on('value', (snapshot) => {
          var li = []
          snapshot.forEach((child) => {
            li.push({
              key: child.key,
              NAME: child.val().NAME,
              Class: child.val().Class,
              PHONE: child.val().Mobile,
              IMAGE: child.val().photoURL,
              EMAIL : child.val().Email,
              USER_TYPE : child.val().UserType
            })
          })
          GU({ list: li })
        })

      } catch (e) {
        console.log(e)
      }
    }, 1000)
   
  
    },[UserId])
  
    if (UserId == null) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="black" />
      </View>)
  
    }



  
const handleEmail = (emails) => {
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
                  {item.USER_TYPE === "STUDENT" || item.USER_TYPE === "ADMIN"   ? null :
                <Card style={{ flex: 0 }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: item.IMAGE }} />
                      <Body>
                        <Text>{item.NAME}</Text>
                        <Text note>{item.PHONE}</Text>
                        <Text style={{color:'green',fontWeight:'bold'}}> Class {item.Class}</Text>
                      </Body>
                    </Left>
                    <Right>
                    
                       <View >
                <Button title="Send Mail" onPress={()=>handleEmail(item.EMAIL)} style={{backgroundColor: 'green',width:60 ,margin:5 }}>
                <Icon name="ios-mail"/>
                  </Button>
                  <Button title="WhatsApp Call" onPress={()=>call(item.PHONE)} style={{backgroundColor: 'green',width:60,margin:5 }}>
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

      <Content></Content>

    

    </>

  )
}
