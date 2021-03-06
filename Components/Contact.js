import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import firebaseConfig from "../firebase";
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      mail: "",
      commentaire: "",
    };
  }
  //Ajoute le nouveau formulaire de contact rempli à realtime database de firebase
  send = (nom, mail, commentaire) => {
    firebase.database().ref("contacts").push({ nom, mail, commentaire });
    this.setState({ nom: "" });
    this.setState({ mail: "" });
    this.setState({ commentaire: "" });
  };
  //Vérifier le remplissage des champs avant d'envoyer le formulaire
  valider({ navigation }) {
    if (
      this.state.nom != "" &&
      this.state.mail != "" &&
      this.state.commentaire != ""
    ) {
      this.send(this.state.nom, this.state.mail, this.state.commentaire);
      Alert.alert("Envoyé", "Votre message a bien été envoyé.", [
        { text: "Ok" },
      ]);
      navigation.navigate("Accueil");
    } else {
      Alert.alert(
        "Incomplet",
        "Veuillez remplir tous les champs obligatoires (*).",
        [{ text: "Ok" }]
      );
    }
  }
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const { navigation } = this.props;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            backgroundColor: "#F2AAC8",

            padding: 15,
            marginVertical: 40,
            width: Dimensions.get("window").width,
          }}
        >
          <Text style={{ fontSize: 19, color: "white" }}>
            Siège social : 77 avenue Olivier Messiaen 72000 Le Mans
          </Text>
          <Text style={{ fontSize: 19, color: "white" }}>
            Mail : cfdt.ca.anjou.maine@gmail.com
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, marginBottom: 45 }}>
            Prenez contact avec nous !
          </Text>
          <TextInput
            placeholder="Nom*"
            autoCapitalize="none"
            style={styles.textinputcontainer}
            onChangeText={(nom) => this.setState({ nom })}
            value={this.state.nom}
          />
          <TextInput
            placeholder="Email*"
            autoCapitalize="none"
            style={styles.textinputcontainer}
            onChangeText={(mail) => this.setState({ mail })}
            value={this.state.mail}
          />
          <TextInput
            placeholder="Commentaire*"
            multiline
            style={styles.textinputCommentaire}
            onChangeText={(commentaire) => this.setState({ commentaire })}
            value={this.state.commentaire}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.valider({ navigation });
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#6A85BE",
    borderRadius: 30,
    height: 50,
    width: 180,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textinputcontainer: {
    backgroundColor: "#F5F6F6",
    borderRadius: 30,
    height: 50,
    width: 350,
    paddingLeft: 20,
    marginVertical: 10,
    alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 1,
    fontSize: 20,
  },
  textinputCommentaire: {
    backgroundColor: "#F5F6F6",
    fontSize: 20,
    borderRadius: 10,
    height: 250,
    width: 350,
    paddingLeft: 20,
    marginVertical: 10,
    alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 1,
  },
});

export default Contact;
