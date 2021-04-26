import React from "react";
import firebase from "firebase";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import firebaseConfig from "../firebase";
class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      mdp: "",
      connecte: false,
      mail: "",
      id: "",
    };
  }
  //Permet la connexion au compte avec mot de passe et adresse mail
  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.mail, this.state.mdp)
      .then(() => this.props.navigation.navigate("Profil"))
      .catch((error) =>
        Alert.alert("Erreur ", error.message, [{ text: "Ok" }])
      );
  };
  //Vérifie le changement des textinputs
  onLoginChange = (textEntre) => {
    this.setState({
      mail: textEntre,
    });
  };
  onMdpChange = (textEntre) => {
    this.setState({
      mdp: textEntre,
    });
  };
  //Recherche le profil connecté s'il y en a un
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "Profil" : "Profil");
    });
  }

  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17, marginBottom: 20, fontStyle: "italic" }}>
          Attention seuls les élus peuvent disposer d'un profil.
        </Text>
        <Image
          source={require("../Images/utilisateur.png")}
          style={{ height: 90, width: 90, marginVertical: 20 }}
        />
        <View style={styles.textinputcontainer}>
          <Image
            source={require("../Images/profile.png")}
            style={{ height: 30, width: 30 }}
          />
          <TextInput
            autoCompleteType="username"
            autoCapitalize="none"
            placeholder="Email"
            style={styles.textinputcontent}
            onChangeText={this.onLoginChange}
          />
        </View>
        <View style={styles.textinputcontainer}>
          <Image
            source={require("../Images/key.png")}
            style={{ height: 30, width: 30 }}
          />
          <TextInput
            secureTextEntry={true}
            autoCompleteType="password"
            autoCapitalize="none"
            placeholder="Mot de passe"
            style={styles.textinputcontent}
            onChangeText={this.onMdpChange}
            onSubmitEditing={this.handleLogin}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.handleLogin}>
          <Text style={{ fontSize: 20, color: "white" }}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("OubliMDP");
          }}
        >
          <Text style={styles.text}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Inscription");
          }}
        >
          <Text style={styles.text}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profil;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textinputcontainer: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 300,
    paddingLeft: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 2,
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
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginVertical: 25,
    color: "#E7591C",
  },
  titre: {
    fontSize: 20,
    marginVertical: 25,
  },
  dialog: {
    height: 200,
    width: 350,
  },
  textinputcontainer: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    width: 300,
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
});
