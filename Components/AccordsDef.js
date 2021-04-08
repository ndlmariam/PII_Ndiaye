import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Share,
  FlatList,
} from "react-native";

import firebase from "firebase";
import firebaseConfig from "../firebase";
class AnjouMaine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accords: [],
    };
  }

  onShare = async (lien, nom) => {
    try {
      const result = await Share.share({
        message: "Lien pdf " + nom + " :" + lien,
        url: lien,
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

  componentDidMount() {
    firebase
      .database()
      .ref("accords")
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
                <TouchableOpacity
                  onPress={() => this.onShare(item.lien, item.nom)}
                >
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

const Nationaux = () => {
  return (
    <View>
      <Text>Accords nationaux</Text>
    </View>
  );
};

const ConventionCollective = () => {
  return (
    <View>
      <Text>Convention collective</Text>
    </View>
  );
};

const Reglement = () => {
  return (
    <View>
      <Text>Réglement intérieur</Text>
    </View>
  );
};

export { AnjouMaine, Nationaux, ConventionCollective, Reglement };
