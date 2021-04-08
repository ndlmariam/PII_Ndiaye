// App.js
import { Text, View, FlatList } from "react-native";
import React from "react";
import Navigation from "./Navigation/Navigation";
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyANBkBq4UXUAsrp8KUqR-qWXpmVFhU0c_M",
  authDomain: "cfdttest-cc48d.firebaseapp.com",
  databaseURL:
    "https://cfdttest-cc48d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cfdttest-cc48d",
  storageBucket: "cfdttest-cc48d.appspot.com",
  messagingSenderId: "171807357070",
  appId: "1:171807357070:web:d17e3a3dee542fad01f1df",
  measurementId: "G-90RH1HNPL5",
};

class App extends React.Component {
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log(firebaseConfig);
    }
    return <Navigation />;
  }
}

export default App;
