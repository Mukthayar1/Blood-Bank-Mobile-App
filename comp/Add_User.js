import React from 'react'
import { StyleSheet } from "react-native"
import { Content, Button, Text, Icon, Item, Input, Form, List, ListItem,Header } from 'native-base';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import TextInputMask from 'react-native-text-input-mask';
import Head from "./Head"
export default function Update_User(props) {

  const [Name, GetName] = React.useState();
  const [Phone, GetPhone] = React.useState();
  const [Password, GetPassword] = React.useState();
  const [Email, GetEmail] = React.useState();



  const handleName = (text) => {
    GetName(text)
  }
  const handlePhone = (text) => {
    GetPhone(text)
  }

  const handlePassword = (text) => {
    GetPassword(text)
  }

  const handleEmail = (text) => {
    GetEmail(text)
  }

  const goback = () =>{
    props.navigation.goBack()
  }
const add = () =>{

  if(Name === null || Email === null || Password === null || Phone === null)
  {
    alert("Filed")
  }
  else{
  let c =  database().ref('user').push().key;
      c.slice("-")
  let a = {
    NAME: Name,
    Email: Email,
    photoURL: "",
    uid: c,
    Pass: Password,
    Mobile: Phone,
    Class : "",
    UserType : "MANAGER"
  }
  
 database().ref(`/`).child(`user/`).push(a);
  alert("Sucessfully Add")
  goback()
}



}
  return (
    <>
          <Header style={{ backgroundColor: 'green' }}>
          <Head />
        </Header>
      <Content style={st.main}>

        <Form>
          <Text style={st.heading}>ADD COMPANY</Text>
          <Item>
          <Input placeholder='NAME/COMPANY'   onChangeText={handleName} maxLength={15} />
          </Item>

          <Item>
          <Input placeholder='Email'  onChangeText={handleEmail}  />
          </Item>

          <Item success>
            <TextInputMask refInput={ref => { input = ref }} maxLength={13} Input placeholder='+923448346160' onChangeText={handlePhone} keyboardType={'phone-pad'}  mask={"+92[0000000000]"}/>
          </Item>
          <Item success>
            <Input placeholder='Create New Password' secureTextEntry={true} keyboardType={'phone-pad'} onChangeText={handlePassword} maxLength={5} />
          </Item>

          {Phone == null ?
          null : Password == null ? null :
          <Button block onPress={add} style={st.btn}>
            <Text>ADD</Text>
          </Button>
      }
        </Form>

      </Content>
    </>
  )
}



const st = StyleSheet.create({
  danger: {
    color: 'red'
  },
  main: {
    marginTop: 20,


  },
  heading: {
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  },
  btn: {
    color: 'black',
    backgroundColor: 'green',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 100,
    marginLeft: 120,

  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  }
});