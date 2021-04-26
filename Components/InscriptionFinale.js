import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React from "react";
import firebase from "firebase";
import firebaseConfig from "../firebase";
class Inscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mdp: "",
      email: "",
      id: "",
    };
  }

  //Création d'un compte avec mot de passe et adresse mail + ajout du nom utilisateur
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.mdp)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
          displayName: this.state.name,
          photoURL: "",
        });
        var ref = this.props.route.params.ref;
        var num = this.props.route.params.num;
        ref.set({ inscrit: true, num: num, mail: this.state.email });
        this.props.navigation.navigate("Profil");
      })
      .catch((error) => {
        var errorMessage = error.message;
        Alert.alert("Erreur ", errorMessage, [{ text: "Ok" }]);
      });
  };
  //Ajout du nouvel utilisateur dans realtime database de firebase
  send = (id, email, name, mdp, connecte) => {
    firebase
      .database()
      .ref("utilisateurs")
      .push({ connecte, id, email, name, mdp });
    this.setState({ connecte: false, id: "", email: "", name: "", mdp: "" });
  };

  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <Image
          source={require("../Images/inscription.png")}
          style={{ height: 120, width: 120, marginBottom: 70 }}
        />

        <View style={styles.textinputcontainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="Nom Prénom"
            style={styles.textinputcontent}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={styles.textinputcontainer}>
          <TextInput
            autoCompleteType="email"
            autoCapitalize="none"
            placeholder="Email"
            style={styles.textinputcontent}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.textinputcontainer}>
          <TextInput
            secureTextEntry={true}
            //autoCompleteType="password"
            autoCapitalize="none"
            placeholder="Mot de passe"
            style={styles.textinputcontent}
            onChangeText={(mdp) => this.setState({ mdp })}
            value={this.state.mdp}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.handleSignUp}>
          <Text style={{ fontSize: 20, color: "white" }}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinputcontainer: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 350,
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
  btn: {
    backgroundColor: "#6A85BE",
    borderRadius: 30,
    height: 50,
    width: 180,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Inscription;
