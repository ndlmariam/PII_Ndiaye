import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Share,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as firebase from "firebase";

// Get a reference to the storage service, which is used to create references in your storage bucket

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
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      this.setState({ doc: result.uri });
      this.setState({ docnom: "Bulletin ajouté : " + result.name });
      this.uploadBulletin(result.uri, this.state.nom, this.state.prenom);
    }
  };
  uploadBulletin = async (uri, nom, prenom) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("Papiers/" + nom + prenom + "/Bulletin");
    return ref.put(blob);
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
  _pickRIB = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      this.setState({ rib: result.uri });
      this.setState({ ribnom: "RIB ajouté : " + result.name });
      this.uploadRIB(result.uri, this.state.nom, this.state.prenom);
    }
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Lien vers bulletin d'adhésion : https://drive.google.com/file/d/1C_at3bC2Tr8OAFkoJtVLBqgNchOepDOr/view?usp=sharing",
        url:
          "https://drive.google.com/file/d/1C_at3bC2Tr8OAFkoJtVLBqgNchOepDOr/view?usp=sharing",
        title: "Bulletin d'adhésion",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    let { docnom } = this.state;
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
          <Button title="Lien bulletin" onPress={this.onShare} />
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
            <Button title={this.state.docnom} onPress={this._pickDocument} />
            <Button title={this.state.ribnom} onPress={this._pickRIB} />
          </View>
        </View>
        <TouchableOpacity style={{ paddingHorizontal: 135 }}>
          <Text style={styles.button}>Adhérer</Text>
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
});

export default Adhesion;
