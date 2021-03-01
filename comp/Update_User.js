import React from 'react'
import { StyleSheet } from "react-native"
import { Content, Button, Text, Icon, Item, Input, Form, List, ListItem } from 'native-base';
import firebase from '@react-native-firebase/app';
import RadioForm from 'react-native-simple-radio-button';
import { Picker } from '@react-native-picker/picker';
import TextInputMask from 'react-native-text-input-mask';
export default function Update_User(props) {
  const [Phone, GetPhone] = React.useState();
  const [Password, GetPassword] = React.useState();;
  const [Class, GetClass] = React.useState();




  const handlePhone = (text) => {
    GetPhone(text)
  }

  const handlePassword = (text) => {
    GetPassword(text)
  }

  const handleClass = (text) => {
    GetClass(text)
  }
  const update = () => {


      const ref = firebase.database().ref(`user`)
      ref.child(`${props.UserId}`).update({
        
        "Pass": Password,
        "Mobile": Phone,
        "Class":Class
       
      })

    }

  

  return (
    <>
      <Content style={st.main}>
        <Form>
          <Text style={st.heading}>Please Upgrade Profile To Continue..</Text>
          <Item success>
            <TextInputMask refInput={ref => { input = ref }} maxLength={13} Input placeholder='+923448346160' onChangeText={handlePhone} keyboardType={'phone-pad'}  mask={"+92[0000000000]"}/>



          </Item>
          <Item success>
            <Input placeholder='Create New Password' secureTextEntry={true} keyboardType={'phone-pad'} onChangeText={handlePassword} maxLength={5} />
          </Item>

          <Item>
          <Input placeholder='Class'  keyboardType={'phone-pad'} onChangeText={handleClass} maxLength={2} />
          </Item>
          {Phone == null ?
          null : Password == null ? null :
          <Button block onPress={update} style={st.btn}>
            <Text>UPDATE</Text>
          </Button>
      }
          <List>
            <ListItem itemHeader first  style={{ margin: -10,}}>
              <Text>Terms and Conditions</Text>
            </ListItem>
            <ListItem  style={{ margin: -15,}}>
              <Text>Phone Number Must Be contain 11 Digit </Text>
            </ListItem>
            <ListItem >
              <Text>Password At Least 4 Digit Or Max 11 Digit ALLOW</Text>
            </ListItem>
            <ListItem >
              <Text></Text>
            </ListItem>

          </List>
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