import React from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase";
import firebaseConfig from "../firebase";
class Actualites extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeText = "";
    this.state = {
      actualites: [],
      titre: "",
      description: "",
      date: "",
      uri: "",
    };
  }
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
          });
        });
        this.setState({ actualites: li });
      });
  }
  _displayDetail = (titre, description, date, uri) => {
    this.props.navigation.navigate("Détail", {
      titre: titre,
      description: description,
      date: date,
      uri: uri,
    });
  };

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
                      item.uri
                    );
                  }}
                  style={{
                    height: 135,
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

                  <View style={{ flex: 1.5 }}>
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
    paddingVertical: 9,
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
    height: 130,
    width: 150,
  },
});
export default Actualites;
