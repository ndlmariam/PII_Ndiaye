import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
import firebaseConfig from "../firebase";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

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
class Ajoutinstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: "",
      description: "",
      date: "",
      pdf: "",
      pdfnom: "Sélectionner un fichier",
      prenom: "",
    };
  }

  componentDidMount() {
    this.setState({ date: day + " " + month + " " + year }),
      firebase
        .database()
        .ref("instances")
        .on("value", (snapshot) => {
          var li = [];
          snapshot.forEach((child) => {
            li.push({
              key: child.key,
              titre: child.val().titre,
              description: child.val().description,
              date: child.val().date,
              pdf: child.val().pdf,
              prenom: child.val().prenom,
            });
          });
          this.setState({ instances: li });
        });
  }

  send = (titre, description, date, pdf, prenom) => {
    if (pdf == undefined) {
      var pdf = "";
      firebase
        .database()
        .ref("instances")
        .push({ titre, description, date, pdf, prenom });
      this.setState({
        titre: "",
        description: "",
        date: "",
        pdf: "",
        prenom: "",
      });
    } else {
      firebase
        .database()
        .ref("instances")
        .push({ titre, description, date, pdf, prenom });
      this.setState({
        titre: "",
        description: "",
        date: "",
        pdf: "",
        prenom: "",
      });
    }
  };

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.cancelled) {
      this.setState({ pdf: result.uri });
      this.setState({ pdfnom: "Document ajouté : " + result.name });
    }
  };

  uploadDocument = async (uri, titre, date, prenom) => {
    if (uri != null || uri != undefined || uri != "") {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child("Instances/" + titre + "_" + date + "_" + prenom);
      return ref.put(blob);
    }
  };
  render() {
    let { pdf } = this.state;
    return (
      <ScrollView
        style={{
          paddingVertical: 30,
          paddingLeft: 5,
          backgroundColor: "white",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 23 }}>
          Ajoutez une nouvelle instance
        </Text>
        <TextInput
          style={{ padding: 20 }}
          placeholder="Titre"
          onChangeText={(titre) => this.setState({ titre })}
          style={styles.textinputcontainer}
        />
        <TextInput
          style={{ padding: 20 }}
          placeholder="Prénom du rédacteur"
          onChangeText={(prenom) => this.setState({ prenom })}
          style={styles.textinputcontainer}
        />
        <TextInput
          multiline
          placeholder="Description"
          onChangeText={(description) => this.setState({ description })}
          style={styles.textinputCommentaire}
        />
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Button title={this.state.pdfnom} onPress={this._pickDocument} />
        </View>
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.send(
                this.state.titre,
                this.state.description,
                this.state.date,
                this.state.pdf,
                this.state.prenom
              ),
                this.uploadDocument(
                  pdf,
                  this.state.titre,
                  this.state.date,
                  this.state.prenom
                );
              Alert.alert(
                "Ajouté",
                "Une nouvelle instance vient d'être créée.",
                [{ text: "Ok" }]
              ),
                this.props.navigation.navigate("Instances");
            }}
          >
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
    height: 400,
    width: 400,
    paddingLeft: 20,
    marginVertical: 10,
    alignItems: "center",
    borderColor: "#F6A924",
    borderWidth: 1,
  },
});

export default Ajoutinstance;
