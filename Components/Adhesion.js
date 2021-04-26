import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as firebase from "firebase";
import * as Sharing from "expo-sharing";

//Affichage de la page d'adhésion
class Adhesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      docnom: "Importer bulletin rempli",
      doc: null,
      ribnom: "Importer RIB",
      rib: null,
      email: "",
      nom: "",
      prenom: "",
    };
  }
  //Ajout d'un adhérent dans realtime firebase
  send = (nom, prenom, email) => {
    firebase.database().ref("adherents").push({ nom, prenom, email });
    this.setState({
      nom: "",
      prenom: "",
      email: "",
    });
  };
  //Selection d'un fichier dans le téléphone de l'utilisateur
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      this.setState({ doc: result.uri });
      this.setState({ docnom: "Bulletin ajouté : " + result.name });
    }
  };
  //Import du document téléchargé dans storage firebase
  uploadBulletin = async (uri, nom, prenom) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("Papiers/" + nom + prenom + "/Bulletin");
    return ref.put(blob);
  };
  //Idem avec le RIB
  _pickRIB = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      this.setState({ rib: result.uri });
      this.setState({ ribnom: "RIB ajouté : " + result.name });
    }
  };
  uploadRIB = async (uri, nom, prenom) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("Papiers/" + nom + prenom + "/RIB");
    return ref.put(blob);
  };

  //Partage d'un document utilisé pour télécharger le bulletin vierge sur le téléphone
  onShare = async () => {
    const { uri: localUri } = await FileSystem.downloadAsync(
      "https://firebasestorage.googleapis.com/v0/b/cfdttest-cc48d.appspot.com/o/bulletin.pdf?alt=media&token=6639eff7-c419-4a32-be46-b2de01e3371c",
      FileSystem.documentDirectory + "bulletin.pdf"
    ).catch((error) => {
      console.error(error);
    });
    await Sharing.shareAsync(localUri).catch((err) =>
      console.log("Sharing::error", err)
    );
  };
  //Vérifier tous les paramètres entrés avant d'envoyer la demande d'adhésion
  adherer = () => {
    if (
      this.state.doc != null &&
      this.state.rib != null &&
      this.state.nom != "" &&
      this.state.prenom != "" &&
      this.state.email != ""
    ) {
      this.uploadBulletin(this.state.doc, this.state.nom, this.state.prenom);
      this.uploadRIB(this.state.rib, this.state.nom, this.state.prenom);
      Alert.alert("Adhésion", "Votre adhésion a bien été envoyée", [
        { text: "Ok" },
      ]),
        this.send(this.state.nom, this.state.prenom, this.state.email),
        this.props.navigation.navigate("Accueil");
    } else if (this.state.doc != null && this.state.rib != null) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs", [
        { text: "Ok" },
      ]);
    } else if (
      this.state.nom != "" &&
      this.state.prenom != "" &&
      this.state.email != ""
    ) {
      Alert.alert("Erreur", "Veuillez importer tous les documents", [
        { text: "Ok" },
      ]);
    } else {
      Alert.alert(
        "Erreur",
        "Veuillez remplir les champs et importer tous les documents",
        [{ text: "Ok" }]
      );
    }
  };
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={{ fontSize: 25, padding: 15, color: "#E7591C" }}>
          J'adhère à un syndicalisme de résultats !
        </Text>
        <View
          style={{ backgroundColor: "#F2AAC8", padding: 15, marginBottom: 10 }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>
            Si vous ne possédez pas le bulletin d'adhésion, téléchargez le
            ci-dessous. Sinon importez le directement en bas de page une fois
            remplis.
          </Text>
          <TouchableOpacity onPress={this.onShare} style={styles.telecharge}>
            <Text style={styles.telechargetxt}>Télécharger bulletin</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 25, marginBottom: 10, color: "#E7591C" }}>
            Mon adhésion
          </Text>
          <Text style={styles.text}>Entrez votre nom</Text>
          <TextInput
            placeholder="Nom"
            style={styles.textinput}
            onChangeText={(nom) => this.setState({ nom })}
          />
          <Text style={styles.text}>Entrez votre prénom </Text>
          <TextInput
            placeholder="Prénom"
            style={styles.textinput}
            onChangeText={(prenom) => this.setState({ prenom })}
          />
          <Text style={styles.text}>Entrez votre adresse mail </Text>
          <TextInput
            placeholder="monadresse@email.com"
            onChangeText={(email) => this.setState({ email })}
            style={styles.textinput}
          />

          <Text style={{ fontSize: 18, paddingVertical: 15 }}>
            Je demande mon adhésion à la CFDT et m'engage à payer régulièrement
            ma cotisation syndicale.{" "}
          </Text>
          <Text style={{ fontSize: 18 }}>
            Joindre un RIB et les documents remplis :{" "}
          </Text>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={this._pickDocument}
              style={styles.telecharge}
            >
              <Text style={styles.telechargetxt}>{this.state.docnom} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickRIB} style={styles.telecharge}>
              <Text style={styles.telechargetxt}>{this.state.ribnom}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.adherer}>
          <Text style={{ fontSize: 20, color: "white" }}>Adhérer</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    fontSize: 18,
    color: "#E7591C",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingVertical: 5,
  },
  text: {
    fontSize: 15,
    fontStyle: "italic",
  },
  button: {
    borderWidth: 1,
    fontSize: 25,
    marginTop: 50,
    textAlign: "center",
    borderRadius: 10,
    borderColor: "#E7591C",
    color: "#E7591C",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  btn: {
    backgroundColor: "#6A85BE",
    borderRadius: 30,
    height: 50,
    width: 180,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  telecharge: {
    marginTop: 10,
    alignSelf: "center",
  },
  telechargetxt: {
    color: "#0072FE",
    fontSize: 18,
  },
});

export default Adhesion;
