import React from 'react'
import { Body, Right, Button, Title, Subtitle, Text } from 'native-base';
import { useRoute } from '@react-navigation/native';
import {AuthContex} from "./Contexx"
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Head(props) {

  const page_name = useRoute().name;
  const route = useRoute();


  const {OUT} = React.useContext(AuthContex)
  return (
    <>
      <Body >
        <Title>Blood Bank</Title>
        <Subtitle>{page_name}</Subtitle>
      </Body>
      <Right>
            <Button  onPress={()=>{OUT()}} transparent>
              <Icon name='logout'  size={25} />
            </Button>
      </Right>
    </>
  )
}
