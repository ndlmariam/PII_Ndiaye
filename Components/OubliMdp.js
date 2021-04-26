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
var mail = "";

class OubliMDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  //Permet de changer le mot de passe associé au compte -> envoie email de vérification
  emailVerif = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        // Password reset email sent.
        Alert.alert(
          "Mot de passe changé ",
          "Vous venez de recevoir un mail pour réinitialiser votre mot de passe ",
          [{ text: "Ok" }]
        );
      })
      .catch((error) =>
        Alert.alert("Erreur ", error.message, [{ text: "Ok" }])
      );

    this.props.navigation.navigate("Profil");
  };
  componentDidMount() {
    this.setState({ email: mail });
  }
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

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
          Veuillez vérifier ou modifier l'adresse mail associée à votre compte
          afin de réinitialiser votre mot de passe.
        </Text>
        <View style={styles.textinputcontainer}>
          <TextInput
            autoCompleteType="email"
            autoCapitalize="none"
            style={styles.textinputcontent}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            value={this.state.email}
          ></TextInput>
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
    backgroundColor: "#F5F6F6",
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
