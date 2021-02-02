import React, { useState, useEffect } from "react"
import { ActivityIndicator, View, YellowBox } from 'react-native';
import { AuthContex, loginreducer } from "./Contexx";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Donars from "./Donars";
import Logine from "./Login";
import Save from "./Save";
import Acc from "./Acc";
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-community/google-signin';

import { isSignedIn } from "./sss";



const Stack = createStackNavigator();


export default function NAV() {
  let a = {};
  const InitalLoginState = {
    Isloading: true,
    UserName: "",
    UserToken: ""
  }


  const [loginstate, dispatch] = React.useReducer(loginreducer, InitalLoginState)




  const authContexx = React.useMemo(() => ({

    IN: (Emailee, Passee) => {
      let UserToken;
      let useremail = Emailee;
      let usersPass = Passee;
        

      var leadsRef = firebase.database().ref('user');
      leadsRef.on('value', function (Users) {
        Users.forEach(function (data) {
          var y = data.val();
          if(useremail == y.Email && usersPass == y.Pass)
          {
           AsyncStorage.setItem('USERmine', y.uid);
           UserToken = "hello";
           AsyncStorage.setItem('UserToken', UserToken);
            alert("Login Sucessfully")
            dispatch({ type: 'LOGIN', id: useremail, token: UserToken })
          }
          else{
            alert("Try Again")
          }
        });
      });
      
    },
    OUT: async () => {
      try {
        await AsyncStorage.removeItem('USERTOKEN');
        await AsyncStorage.removeItem('USERmine');
        dispatch({ type: 'LOGOUT' });
        return true;
      } catch (e) {
        console.log(e)
      }
     

    
    },
    SignUp: async (a) => {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {

          a = {
            NAME: user.displayName,
            Email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            Donar: "",
            Blood_Group: "",
            Pass: "",
            Mobile: "",
            Active_Profile: true,
          }
          try {
            let UserToken;
            UserToken = '323f43t653g';
            AsyncStorage.setItem('USERmine', user.uid)
            database().ref(`/`).child(`user/${user.uid}`).set(a);
            dispatch({ type: 'REGISTER', id: a, token: idToken })

          } catch (e) {
            console.log(e)
          }
        }
      });
      // Sign-in the user with the credential

      return auth().signInWithCredential(googleCredential);

    }

  }), []);

  useEffect(() => {


    GoogleSignin.configure({ webClientId: '990181536626-q4hd7o17dmqotkmao8oiqsu2ol46rph4.apps.googleusercontent.com', });
    setTimeout(async () => {

      let UserToken;
      UserToken = null;
      try {
        isSignedIn()
        .then(res => {
          if (res) { UserToken = res; }
          dispatch({ type: 'REGISTER', token: UserToken })
        })


      } catch (e) {
        console.log(e)
      }
    }, 2000)

  }, [])

  if (loginstate.Isloading === true) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} size="large" style={{ opacity: 1 }} color="black" />
    </View>)

  }
  return (
    <>

      <AuthContex.Provider value={authContexx} >
        <NavigationContainer>
          {loginstate.UserToken !== null ?
            <Stack.Navigator>
              <Stack.Screen name="Account" component={Acc} options={{ headerShown: false }} />
              <Stack.Screen name="Save" component={Save} options={{ headerShown: false }} />
              <Stack.Screen name="Donars" component={Donars} options={{ headerShown: false }} />
            </Stack.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name="L" component={Logine} options={{ headerShown: false }} />
            </Stack.Navigator>
          }

        </NavigationContainer>
      </AuthContex.Provider>

    </>
  )
}