import React, { useEffect } from 'react'
import { Container, Header, Content, Form, Item, Input, Label ,Text,View, Button} from 'native-base';
import Head from "./Head";
import { isSignedIn } from "./sss";
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { ActivityIndicator} from "react-native"
export default function PostAdd() {

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



    const [Tittle, GetTittle] = React.useState()
    const [Detail, GetDetail] = React.useState()

    const HandleTittle = (text) =>{GetTittle(text)}
    const HandleDetail = (text) =>{GetDetail(text)}


  
    console.log(CUser)

    const Post = () =>{
        if(Tittle == null && Detail == null)
        {
            alert("Failed")
        }
        else{
          let a = {
            Tittle : Tittle,
            Detail : Detail,
            Name : CUser.NAME,
            PIC : CUser.photoURL,
            Mobile : CUser.Mobile
    
        }
        alert("SucessFully")
      database().ref(`/`).child(`Post/${UserId}`).set(a);
        }
    }
  
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
        <View>
            <Text style={{color:'green',fontWeight:'bold',textAlign:'center' ,fontSize:30, padding:30}}>Post Add</Text>
        </View>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Tittle</Label>
              <Input type="text" onChangeText={HandleTittle} maxLength={15} />
            </Item>
            <Item fixedLabel last>
              <Label>Detail</Label>
              <Input type="text" onChangeText={HandleDetail} maxLength={100}/>
            </Item>
            <Item fixedLabel last style={{color:'green',fontWeight:'bold',textAlign:'center' ,fontSize:30, padding:30}}>
            <Button onPress={()=>Post()} style={{backgroundColor:'green',fontWeight:'bold',textAlign:'center' ,fontSize:30, padding:30, marginLeft:100}} ><Text>Post</Text></Button>
                </Item>
          </Form>
          <Text style={{color:'green',fontWeight:'bold',textAlign:'center' , padding:30}}>
             YOU CAN ONLY POST ONE ADD
              </Text>
        </Content>
      </Container>
        </>
    )
}
