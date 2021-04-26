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
class Instances extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeText = "";
    this.state = {
      instances: [],
    };
  }
  //Recherches des instances stockées dans realtime database
  componentDidMount() {
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
            prenom: child.val().prenom,
            pdf: child.val().pdf,
          });
        });
        this.setState({ instances: li });
      });
  }
  //Fonction permettant de passer en paramètre les détails d'une instance dans la navigation
  _displayDetail = (titre, description, date, prenom, pdf) => {
    this.props.navigation.navigate("DétailInstance", {
      titre: titre,
      description: description,
      date: date,
      prenom: prenom,
      pdf: pdf,
    });
  };

  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* Direction vers la page d'ajout d'une instance */}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Ajout Instance")}
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
          data={this.state.instances.reverse()}
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
                      item.prenom,
                      item.pdf
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
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.liste}> {item.titre} </Text>
                    <Text style={styles.date}>
                      {" "}
                      Le {item.date} par {item.prenom}
                    </Text>
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

export default Instances;
