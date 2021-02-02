import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from "react"
export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('USERmine')
        .then(res => {
          if (res !== null) {
            resolve(res );
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err),"");
    });
  };