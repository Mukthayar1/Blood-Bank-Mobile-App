import React from 'react';
import { StyleSheet ,View , Image } from "react-native";
import { Container, Content, Button, Text, Form, Item, Input, Label, } from 'native-base';
import { AuthContex } from "./Contexx"
import {Heart} from "../assets/heart.png"

import {GoogleSigninButton, } from '@react-native-community/google-signin';







function Logine(props) {

  const [Emailee,GetEmail] =React.useState()
  const [Passee,GetPass] =React.useState()
  
  const UserEmailHandle = (text) => {
    GetEmail(text)
  }
  const UserPassHandle = (text) => {
    GetPass(text)
  }




  const {IN , SignUp}  =React.useContext(AuthContex);

  // const signIn = async () => {
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       email = user.email;
  //       let a = {
  //         NAME: user.displayName,
  //         Email: user.email,
  //         photoURL: user.photoURL,
  //         uid: user.uid,
  //         Donar: "",
  //         Blood_Group: "",
  //         Pass: "",
  //       }
  //       database().ref(`/`).child(`user/${user.uid}`).set(a);
  //     }
  //   });
  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);

  // }



  return (
    <>

      <Container style={{ backgroundColor: 'green', paddingTop: 20, alignItems: 'center' }} >

        <Content>
          
          <Text style={[styles.bigBlue]}>WELCOME TO SAYLANI </Text>

          <Text style={[styles.bigBlue2]}>STUDY  JOB  KNOWLEDGE </Text>

          <View style={[styles.loginbody]}>
         
            <Text style={[styles.login]}>Login</Text>
            <Form>
              <Item floatingLabel last>
                <Label>Email</Label>
                <Input onChangeText={UserEmailHandle} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input  onChangeText={UserPassHandle}  keyboardType={'phone-pad'} maxLength={5} />
              </Item>
              <View style={{alignItems: 'center'}}>
              <Button rounded style={[styles.loginbtn]} onPress={()=>{IN(Emailee,Passee)}} >
                <Text style={{padding:70}}>Login</Text>
              </Button>
              </View>
             
            </Form>
            </View>


          <GoogleSigninButton
            style={[styles.btn]}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={()=>{SignUp()}}
             />

        </Content>
        <Text style={[styles.end_text]}>Sigin With Google For Making  Students Account </Text>
      </Container>
    </>
  )
}



export default Logine;

const styles = StyleSheet.create({

  bigBlue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  bigBlue2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  btn: {
    justifyContent: 'center'
    , alignItems: 'center',
    marginTop: 100,
    height: 40,
  },


  end_text: {
    color: "black",
    fontWeight: 'bold',
    marginBottom: 20
  },
  login: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  loginbtn: {

    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    backgroundColor:"green",
    padding:30, 
    marginLeft:100,

  },
  loginbody:{
    backgroundColor:'white',
    borderRadius:50,
    marginTop:60,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  
    
    elevation: 6,
  }

});