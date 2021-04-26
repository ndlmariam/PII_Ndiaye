import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

//Affichage de la date sous format textuel
var day = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
if (month === 1) {
  month = "janvier";
}
if (month === 2) {
  month = "février";
}
if (month === 3) {
  month = "mars";
}
if (month === 4) {
  month = "avril";
}
if (month === 5) {
  month = "mai";
}
if (month === 6) {
  month = "juin";
}
if (month === 7) {
  month = "juillet";
}
if (month === 8) {
  month = "août";
}
if (month === 9) {
  month = "septembre";
}
if (month === 10) {
  month = "octobre";
}
if (month === 11) {
  month = "novembre";
}
if (month === 12) {
  month = "décembre";
}

//Affichage de la page d'ajout des actualités
class Ajoutactualite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: "",
      description: "",
      date: "",
      uri: null,
      urinom: "Ajouter une image*",
      pdf: null,
      pdfnom: "Sélectionner un fichier",
      lien: "",
    };
  }

  componentDidMount() {
    this.setState({ date: day + " " + month + " " + year });
  }

  //Ajout de la nouvelle actualité dans la base de données
  send = (titre, description, date, uri, pdf, lien) => {
    firebase
      .database()
      .ref("actualités")
      .push({ titre, description, date, uri, pdf, lien });
    this.setState({
      titre: "",
      description: "",
      date: "",
      uri: null,
      pdf: null,
      lien: "",
    });
  };
  //Sélectione d'une image dans le téléphone sous forme base64 pour l'extraire de la base
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ uri: "data:image/jpeg;base64," + result.base64 });
      this.setState({ urinom: "Modifier image" });
    }
  };
  //Sélection d'un fichier du téléphone
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      this.setState({ pdf: result.uri });
      this.setState({ pdfnom: "Document ajouté : " + result.name });
    }
  };
  //Import du document téléchargé dans storage firebase
  uploadDocument = async (uri, titre, date) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("Actualites/" + titre + "_" + date);
    return ref.put(blob);
  };

  //Vérifie la validité des champs avant d'ajouter l'actualité
  valider = () => {
    if (
      this.state.titre != "" &&
      this.state.description != "" &&
      this.state.uri != "" &&
      this.state.uri != undefined &&
      this.state.uri != null
    ) {
      this.send(
        this.state.titre,
        this.state.description,
        this.state.date,
        this.state.uri,
        this.state.pdf,
        this.state.lien
      ),
        this.uploadDocument(this.state.pdf, this.state.titre, this.state.date);
      Alert.alert("Ajouté", "Une nouvelle actualité vient d'être créée.", [
        { text: "Ok" },
      ]),
        this.props.navigation.navigate("Actualités");
    } else if (this.state.titre != "" && this.state.description != "") {
      Alert.alert("Image", "Veuillez ajouter une image à votre actualité.", [
        { text: "Ok" },
      ]);
    } else if (
      this.state.uri != "" &&
      this.state.uri != undefined &&
      this.state.uri != null
    ) {
      Alert.alert(
        "Champs incomplets",
        "Veuillez remplir tous les champs obligatoires (*).",
        [{ text: "Ok" }]
      );
    } else {
      Alert.alert(
        "Incomplet",
        "Veuillez remplir tous les champs obligatoires (*) et ajouter une image à votre actualité.",
        [{ text: "Ok" }]
      );
    }
  };
  render() {
    let { uri } = this.state;
    return (
      <ScrollView
        style={{
          paddingVertical: 30,
          paddingLeft: 5,
          backgroundColor: "white",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 23 }}>
          Ajoutez une nouvelle actualité
        </Text>
        <TextInput
          style={{ padding: 20 }}
          placeholder="Titre*"
          onChangeText={(titre) => this.setState({ titre })}
          style={styles.textinputcontainer}
        />
        <TextInput
          multiline
          placeholder="Description*"
          onChangeText={(description) => this.setState({ description })}
          style={styles.textinputCommentaire}
        />
        <TextInput
          style={{ padding: 20 }}
          placeholder="Lien"
          onChangeText={(lien) => this.setState({ lien })}
          style={styles.textinputcontainer}
        />
        <TouchableOpacity onPress={this._pickImage} style={styles.telecharge}>
          <Text style={styles.telechargetxt}>{this.state.urinom}</Text>
        </TouchableOpacity>
        {uri && (
          <Image
            source={{ uri: uri }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
        )}
        <TouchableOpacity
          onPress={this._pickDocument}
          style={styles.telecharge}
        >
          <Text style={styles.telechargetxt}>{this.state.pdfnom}</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <TouchableOpacity style={styles.btn} onPress={this.valider}>
            <Text style={{ fontSize: 20, color: "white" }}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  liste: {
    margin: 2,
    fontSize: 20,
    padding: 10,
    backgroundColor: "skyblue",
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

  textinputcontainer: {
    backgroundColor: "#F5F6F6",
    borderRadius: 30,
    height: 50,
    width: 400,
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
    height: 200,
    width: 400,
    paddingLeft: 20,
    marginVertical: 10,
    //alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 1,
  },
  telecharge: {
    marginTop: 20,
    alignSelf: "center",
  },
  telechargetxt: {
    color: "#0072FE",
    fontSize: 18,
  },
});

export default Ajoutactualite;
