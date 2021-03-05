import React, { useEffect } from 'react'
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
  Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Footer,
  FooterTab, Card, CardItem, Thumbnail
} from 'native-base';
import { isSignedIn } from "./sss";
import Head from "./Head"
import firebase from '@react-native-firebase/app';
import Update_User from './Update_User'

export default function Acc(props) {

  const [CUser, GetCUser] = React.useState({})
  const [UserId, GetUserId] = React.useState();



  useEffect(() => {
    isSignedIn()
      .then(res => {
        if (res) {

          GetUserId(res)
        }
      })

    setTimeout(async () => {
      try {
        CUser

      } catch (e) {
        console.log(e)
      }
    }, 1000)

    const ref = firebase.database().ref(`user/${UserId}`)

    ref.on('value', (snapshot) => {
      const user = snapshot.val()
  
      GetCUser(user)
  
  
    }, (error) => {
      console.log(error)
    })
  


  }, [UserId]);


 
  if (CUser == null) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="black" />
    </View>)

  }


  return (
    <>
      <Container>
        <Header style={{ backgroundColor: 'green' }}>
          <Head />
        </Header>
        <Card >
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: CUser.photoURL }} />
              <Body>
                <Text>{CUser.NAME}</Text>
                <Text note>I AM {CUser.UserType} </Text>
              </Body>

            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                {
                  CUser.Class == null ? <Text note>Class Room</Text> : <Text >Class  {CUser.Class}</Text>
                }
              </Button>
            </Left>
            <Body>
              {CUser.Mobile ?
                <Button transparent>
                  <Icon active name="phone-portrait" /><Text >{CUser.Mobile}</Text>
                </Button>
                :
                null
              }
            </Body>
          </CardItem>
        </Card>

        <ScrollView>
          {CUser.Mobile == "" ?
            <Update_User UserId={UserId} /> :
            <Content style={{ marginTop: 20 }} >
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "green" }}>
                    <Icon active name="person-add-sharp" />
                  </Button>
                </Left>
                <Body>
                 <Text>{CUser.UserType}</Text>
                </Body>

              </ListItem>

              <ListItem icon style={{ marginTop: 20 }}>
                <Left>
                  <Button style={{ backgroundColor: "green" }}>
                    <Icon active name="ios-mail-open-sharp" />
                  </Button>
                </Left>
                <Body>
                  <Text>{CUser.Email}</Text>
                </Body>
              </ListItem>
             
              <ListItem icon style={{ marginTop: 20 }}>
                <Left>
                  <Button style={{ backgroundColor: "green" }}>
                    <Icon active name="lock-closed-sharp" />
                  </Button>
                </Left>
                <Body>
                 <Text>{CUser.Pass}</Text>

                </Body>
              </ListItem>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 90 }}>
                <Text style={{ fontSize: 15, marginTop: 15, color: 'green', fontWeight: 'bold' }}>Sayllani</Text>
                <Text style={{ fontSize: 15, marginTop: 15, color: 'green', fontWeight: 'bold' }}>Equal Oportunity For EveryOne</Text>
              </View>
            </Content>
          }


          <Content>
          </Content>

        </ScrollView>
        {CUser.Mobile !== "" ?
          <Footer >
            <FooterTab style={{ backgroundColor: 'green' }}>
              <Button vertical onPress={() => props.navigation.navigate("Account")} >
                <Text style={{ color: 'white', fontWeight: 'bold' }} active>Account</Text>
              </Button>
              {CUser.UserType == "STUDENT" ?
              <Button vertical onPress={() => props.navigation.navigate("Save")}>
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Company</Text>
              </Button>
              :null

              }
               {CUser.UserType == "Manager" || CUser.UserType == "ADMIN" ?
               
              <Button vertical onPress={() => props.navigation.navigate("Donars")}>
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Students</Text>
              </Button> 
             
              :null

              }
                   {CUser.UserType == "Manager"  || CUser.UserType == "ADMIN" ?
               
               <Button vertical onPress={() => props.navigation.navigate("PostAdd")}>
                 <Text style={{ color: 'white', fontWeight: 'bold' }} >Post Add</Text>
               </Button> 
              
               :null
 
               }
                {CUser.UserType == "ADMIN" ?
               
               <Button vertical onPress={() => props.navigation.navigate("Manager")}>
                 <Text style={{ color: 'white', fontWeight: 'bold' }} >Company</Text>
               </Button> 
              
               :null
 
               }
                {CUser.UserType == "ADMIN" ?
               
               <Button vertical onPress={() => props.navigation.navigate("Add_User")}>
                 <Text style={{ color: 'white', fontWeight: 'bold' }} >Add</Text>
               </Button> 
              
               :null
 
               }
              {/* <Button vertical onPress={() => props.navigation.navigate("Save")}>
                <Text style={{color:'white',fontWeight:'bold'}} >Save</Text>
              </Button> */}

            </FooterTab>
          </Footer>
          :
          null
        }

      </Container>

    </>
  )
}

