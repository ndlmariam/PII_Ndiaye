import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import firebase from "firebase";
import firebaseConfig from "../firebase";

//Affichage des différents accords anjou maine
class AnjouMaine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accords: [],
    };
  }

  onShare = async (lien) => {
    this.props.navigation.navigate("PdfReaderAccords", { uri: lien });
  };
  //Recherche des accords anjou maine dans realtime database
  componentDidMount() {
    firebase
      .database()
      .ref("accords/anjou_maine")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            nom: child.val().nom,
            lien: child.val().lien,
          });
        });
        this.setState({ accords: li });
      });
  }

  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          style={{
            color: "black",
          }}
          ListHeaderComponent={
            <View>
              <Text style={styles.titre}>Principaux accords Anjou Maine</Text>
              <Text style={styles.info}>
                Tous les accords sont disponibles sur COMMEO/RH
              </Text>
            </View>
          }
          data={this.state.accords.reverse()}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => this.onShare(item.lien)}>
                  <Text style={styles.liste}> - {item.nom} </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

export { AnjouMaine };

const styles = StyleSheet.create({
  liste: {
    margin: 2,
    fontSize: 18,
    paddingVertical: 9,
    color: "#E7591C",
  },
  titre: {
    fontSize: 23,
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  info: {
    fontSize: 17,
    fontStyle: "italic",
    paddingLeft: 10,
    marginBottom: 20,
  },
});
