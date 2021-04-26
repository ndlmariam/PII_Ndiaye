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
      num: "",
    };
  }

  //Vérification de la présence du numéro d'adhérent dans la base de données -> seuls ceux des élus
  verifnumero = () => {
    var ref = firebase.database().ref("numero");
    var refkey = "";
    var numero = "";
    var inscrit = false;
    ref
      .orderByChild("num")
      .equalTo(this.state.num)
      .on("child_added", function (snapshot) {
        refkey = snapshot.key;
        numero = snapshot.val().num;
      });
    if (refkey != "") {
      ref = firebase.database().ref("numero/" + refkey);
      ref.on("value", (snapshot) => {
        inscrit = snapshot.val().inscrit;
      });
      if (inscrit === false) {
        this.props.navigation.navigate("InscriptionFinale", {
          ref: ref,
          num: this.state.num,
        });
      } else {
        Alert.alert(
          "Compte existant",
          "Un compte est déjà relié à cet identifiant.",
          [{ text: "Ok" }]
        );
      }
    } else {
      Alert.alert(
        "Erreur ",
        "Ce numéro d'adhésion ne permet pas de créer un compte.",
        [{ text: "Ok" }]
      );
    }
  };
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <Image
          source={require("../Images/inscription.png")}
          style={{ height: 120, width: 120, marginBottom: 60 }}
        />
        <Text style={{ fontSize: 20, marginBottom: 30, marginHorizontal: 12 }}>
          Entrez votre numéro d'adhérent, afin de vérifier que vous êtes bien
          élu.e.
        </Text>
        <View style={styles.textinputcontainer}>
          <TextInput
            maxLength={10}
            keyboardType="numeric"
            autoCapitalize="none"
            placeholder="n° d'adhésion CFDT"
            style={styles.textinputcontent}
            onChangeText={(num) => this.setState({ num })}
            value={this.state.name}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.verifnumero}>
          <Text style={{ fontSize: 20, color: "white" }}>Vérifier</Text>
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
