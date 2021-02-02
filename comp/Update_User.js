import React from 'react'
import { StyleSheet } from "react-native"
import { Content, Button, Text, Icon, Item, Input, Form, List, ListItem } from 'native-base';
import firebase from '@react-native-firebase/app';
import RadioForm from 'react-native-simple-radio-button';
import { Picker } from '@react-native-picker/picker';
export default function Update_User(props) {
  const [Phone, GetPhone] = React.useState();
  const [Password, GetPassword] = React.useState();
  const [blood, Getblood] = React.useState();
  const [Donar, GetDonar] = React.useState(true);
  const [state, Getstate] = React.useState({
    language: ""
  });
  var radio_props = [
    { label: 'DONATE BLOOD', value: true },
    { label: 'LOOKING FOR DONARS', value: false }
  ];



  const handlePhone = (text) => {
    GetPhone(text)
  }

  const handlePassword = (text) => {
    GetPassword(text)
  }

  const handleBlood = (text) => {
    Getblood(text)
  }
  const update = () => {
    let d = Donar.value
    alert(d)

    var str = Phone;
    var n = str.length;
    console.log(n)
    if (n < 11 || Password.length < 5) {
      alert("PLese Fill Correctly")

    }
    else {
      const ref = firebase.database().ref(`user`)
      ref.child(`${props.UserId}`).update({
        "Donar": d,
        "Pass": Password,
        "Blood_Group": state.language,
        "Mobile": Phone,
       
      })

    }

  }

  return (
    <>
      <Content style={st.main}>
        <Form>
          <Text style={st.heading}>Please Upgrade Profile To Continue..</Text>
          <Item success>
            <Input placeholder='+923448346160' onChangeText={handlePhone} keyboardType={'phone-pad'} maxLength={11} />
            {
              Phone ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' style={[st.danger]} />
            }


          </Item>
          <Item success>
            <Input placeholder='Create New Password' secureTextEntry={true} keyboardType={'phone-pad'} onChangeText={handlePassword} maxLength={7} />
            {
              Password ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' style={[st.danger]} />
            }
          </Item>

          <Item>
            <Text>Select Blood Group</Text>
            <Picker style={{ height: 50, width: 100 ,marginLeft:100}}
            selectedValue={state.language}
              onValueChange={(itemValue, itemIndex) =>
                Getstate({ language: itemValue })
              }>
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />

            </Picker>
          </Item>
          <RadioForm
             style={{marginLeft:10, padding:10}}
              radio_props={radio_props}
              initial={true}
              animation={true}
              onPress={(value) => { GetDonar({value}) }}
            />


          <Button block onPress={update} style={st.btn}>
            <Text>UPDATE</Text>
          </Button>
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
    color: 'pink',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  },
  btn: {
    color: 'black',
    backgroundColor: 'pink',
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