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

class ChangeAdresse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mdp: "",
    };
  }
  //Vérifie les identifiants entrés et modifie l'adresse mail
  emailVerif = () => {
    var oldemail = this.props.route.params.email;
    var mdp = this.state.mdp;
    var email = this.state.email;
    firebase
      .auth()
      .signInWithEmailAndPassword(oldemail, mdp)
      .then(function (userCredential) {
        userCredential.user.updateEmail(email);
        Alert.alert(
          "Email modifié ",
          "Votre adresse mail a bien été mise à jour.",
          [{ text: "Ok" }]
        );
      })
      .catch((error) =>
        Alert.alert("Erreur ", error.message, [{ text: "Ok" }])
      );
    this.props.navigation.navigate("Profil");
  };
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
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
          Veuillez entrer la nouvelle adresse mail que vous souhaitez utiliser
          avec ce compte, ainsi que votre mot de passe actuel.
        </Text>
        <View style={styles.textinputcontainer}>
          <TextInput
            autoCompleteType="email"
            autoCapitalize="none"
            placeholder="Nouvel email"
            style={styles.textinputcontent}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.textinputcontainer}>
          <TextInput
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Mot de passe"
            style={styles.textinputcontent}
            onChangeText={(mdp) => this.setState({ mdp })}
            value={this.state.mdp}
          />
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

export default ChangeAdresse;
