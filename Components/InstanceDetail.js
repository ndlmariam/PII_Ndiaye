import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Share,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

import firebase from "firebase";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const image = Platform.select({
  ios: () => require("../Images/shareios.png"),
  android: () => require("../Images/shareandroid.png"),
  web: () => require("../Images/shareandroid.png"),
})();
class InstanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instances: undefined,
    };
  }
  afficheArticle = () => {
    if (this.state.url == "" || this.state.url == undefined) {
      Alert.alert("Lien inactif", "Pas de document joint.", [{ text: "Ok" }]);
    } else {
      this.props.navigation.navigate("PdfReader", {
        uri: this.state.url,
      });
    }
  };
  componentDidMount() {
    if (this.props.route.params.pdf != "") {
      const test = firebase
        .storage()
        .ref(
          "Instances/" +
            this.props.route.params.titre +
            "_" +
            this.props.route.params.date +
            "_" +
            this.props.route.params.prenom
        )
        .getDownloadURL()
        .then((url) => {
          this.setState({ url: url });
        })
        .catch(() => {});
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Text style={styles.titre}>{this.props.route.params.titre}</Text>
        <TouchableOpacity onPress={this.afficheArticle}>
          <Text style={styles.lien}>Document</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            borderBottomStartRadius: 230,
            borderBottomEndRadius: 230,
            height: 10,
          }}
        ></View>
        <Text style={styles.date}>{this.props.route.params.date}</Text>

        <Text style={styles.description}>
          {this.props.route.params.description}
        </Text>
        <Text style={styles.date}>{this.props.route.params.prenom}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titre: {
    textAlign: "center",
    fontSize: 30,
    padding: 50,
    color: "#E7591C",
  },
  date: {
    margin: 10,
    fontSize: 18,
    fontStyle: "italic",

    textAlign: "right",
  },
  description: {
    marginHorizontal: 10,
    marginVertical: 15,
    fontSize: 18,
  },
  tinyLogo: {
    alignSelf: "center",
    height: 250,
    width: Dimensions.get("window").width,
  },
  lien: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 0,
    textDecorationLine: "underline",
    color: "#6A85BE",
  },
});

export default InstanceDetail;
