import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import firebase from "firebase";
import firebaseConfig from "../firebase";

class OubliMDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  emailVerif() {
    // var emailAddress = this.state.email;
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        // Password reset email sent.
      })
      .catch((error) =>
        Alert.alert("Erreur ", error.message, [{ text: "Ok" }])
      );
  }
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    var mail = "";
    if (this.props.route.params != undefined) {
      mail = this.props.route.params.email;
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: 50,
          backgroundColor: "white",
        }}
      >
        <Text style={styles.text}>
          Veuillez entrer l'adresse mail associée à votre compte afin de
          réinitialiser votre mot de passe.
        </Text>
        <View style={styles.textinputcontainer}>
          <TextInput
            autoCompleteType="email"
            autoCapitalize="none"
            placeholder="Email"
            style={styles.textinputcontent}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          >
            {mail}
          </TextInput>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.emailVerif}>
          <Text style={{ fontSize: 20, color: "white" }}>Changer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#6A85BE",
    borderRadius: 30,
    height: 50,
    width: 180,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textinputcontainer: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 370,
    paddingLeft: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 1,
  },
  textinputcontent: {
    fontSize: 20,
    paddingLeft: 30,
  },
  text: {
    fontSize: 18,
    padding: 25,
  },
});

export default OubliMDP;
