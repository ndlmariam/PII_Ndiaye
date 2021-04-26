import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase";
import firebaseConfig from "../firebase";

//Affichage des actualités
class ActualitesMembres extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeText = "";
    this.state = {
      actualites: [],
      titre: "",
      description: "",
      date: "",
      uri: "",
      lien: "",
    };
  }
  //Recherches des actualités stockées dans realtime database
  componentDidMount() {
    firebase
      .database()
      .ref("actualités")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            titre: child.val().titre,
            description: child.val().description,
            date: child.val().date,
            uri: child.val().uri,
            lien: child.val().lien,
          });
        });
        this.setState({ actualites: li });
      });
  }
  //Fonction permettant de passer en paramètre les détails d'une actualité dans la navigation
  _displayDetail = (titre, description, date, uri, lien) => {
    this.props.navigation.navigate("Détail", {
      titre: titre,
      description: description,
      date: date,
      uri: uri,
      lien: lien,
    });
  };

  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* Direction vers la page d'ajout d'une actualité */}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Ajout Actualité")}
          style={{
            alignItems: "flex-end",
            marginRight: 20,
            marginVertical: 15,
          }}
        >
          <Image
            source={require("../Images/plus.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>

        <FlatList
          style={{
            color: "black",
          }}
          data={this.state.actualites.reverse()}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  borderColor: "#DFE7EC",
                  borderWidth: 0.5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this._displayDetail(
                      item.titre,
                      item.description,
                      item.date,
                      item.uri,
                      item.lien
                    );
                  }}
                  style={{
                    height: 120,
                    justifyContent: "center",
                    backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: item.uri,
                      }}
                    />
                  </View>

                  <View style={{ flex: 2.7 }}>
                    <Text style={styles.liste}> {item.titre} </Text>
                    <Text style={styles.date}> Publié le {item.date} </Text>
                  </View>
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
    fontSize: 20,
    padding: 7,
    color: "#555554",
  },
  date: {
    margin: 2,
    fontSize: 15,
    paddingBottom: 7,
    fontStyle: "italic",
    color: "#E7591C",
  },
  tinyLogo: {
    height: 110,
    width: 110,
  },
});

export default ActualitesMembres;
