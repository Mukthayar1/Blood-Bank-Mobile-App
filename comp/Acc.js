import React, { useEffect } from 'react'
import { ScrollView, View, ActivityIndicator} from "react-native";
import * as Animatable from 'react-native-animatable';
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
  const [Pass, ShowPass] = React.useState(false)



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


  }, [UserId]);


  const ref = firebase.database().ref(`user/${UserId}`)

  ref.on('value', (snapshot) => {
    const user = snapshot.val()

    GetCUser(user)


  }, (error) => {
    console.log(error)
  })

  if (CUser == null) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="black" />
    </View>)

  }


  return (
    <>
      <Container>
        <Header style={{backgroundColor:'pink'}}>
          <Head />
        </Header>
        <Card >
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: CUser.photoURL }} />
              <Body>
                <Text>{CUser.NAME}</Text>
                <Text note>
                  {
                    CUser.Donar == true ? <Text note style={{color:'pink',fontWeight:'bold'}}>I AM A DONAR</Text> : <Text note>I AM NOT DONAR</Text>
                  }
                </Text>
              </Body>

            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                {
                  CUser.Blood_Group == null ? <Text note>Blood Group</Text> : <Text >Blood G {CUser.Blood_Group}</Text>
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
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="wifi" />
                  </Button>
                </Left>
                <Body>
                  {CUser.Donar == true ?<Text  >Profile Status As Donar </Text>: <Text>Profile Status As Searcher</Text>}
                </Body>

              </ListItem>
              
              <ListItem icon style={{marginTop:20}}>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="wifi" />
                  </Button>
                </Left>
                <Body>
                  <Text>{CUser.Email}</Text>
                </Body>
              </ListItem>
              <ListItem icon style={{marginTop:20}}>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Blood Group {CUser.Blood_Group}</Text>
                </Body>
              </ListItem>
              <ListItem icon style={{marginTop:20}}>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="wifi" />
                  </Button>
                </Left>
                <Body>
                  {Pass == true ? <Text>{CUser.Pass}</Text> : <Text>************ Password</Text>}

                </Body>
                <Right>
                  {Pass == true ?
                    <Button success onPress={() => ShowPass(false)} style={{backgroundColor:'pink',marginTop:-20}}>
                      <Text>Hide</Text>
                    </Button>
                    :
                    <Button success onPress={() => ShowPass(true)} style={{backgroundColor:'pink',marginTop:-20}}>
                      <Text>Show</Text>
                    </Button>
                  }
                </Right>
              </ListItem>
            <View style={{flex:1,justifyContent:'center', alignItems:'center',marginTop:90}}>
            <Animatable.Text animation="pulse" easing="ease-out"  iterationCount="infinite" style={{fontSize:15,marginTop:15,color:'pink',fontWeight:'bold'}}>Give The Gift Of THe Life</Animatable.Text>
            <Animatable.Text animation="pulse" easing="ease-out"  iterationCount="infinite" style={{fontSize:15,marginTop:15,color:'pink',fontWeight:'bold'}}>Donate Blood</Animatable.Text>
             </View>
            </Content>
          }


          <Content>
          </Content>

        </ScrollView>
        {CUser.Mobile !== "" ?
          <Footer >
            <FooterTab style={{backgroundColor:'pink'}}>
              <Button vertical onPress={() => props.navigation.navigate("Account")} >
                <Text style={{color:'white',fontWeight:'bold'}}  active>Account</Text>
              </Button>
              <Button vertical onPress={() => props.navigation.navigate("Donars")}>
                <Text style={{color:'white',fontWeight:'bold'}} >Donars</Text>
              </Button>
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

