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
class ActuDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualite: undefined,
      url: "",
    };
  }

  onShare = async () => {
    if (this.state.url == "") {
      try {
        const result = await Share.share({
          message:
            this.props.route.params.titre +
            "\nDescription : \n" +
            this.props.route.params.description,
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
        //alert(error.message);
      }
    } else {
      const titre = this.props.route.params.titre.replace(/ /g, "");
      const { uri: localUri } = await FileSystem.downloadAsync(
        this.state.url,
        FileSystem.documentDirectory + titre + ".pdf"
      ).catch(() => {
        Alert.alert("Erreur", "Problème avec le document.", [{ text: "Ok" }]);
      });
      await Sharing.shareAsync(localUri).catch(() =>
        Alert.alert("Erreur", "Problème avec le document.", [{ text: "Ok" }])
      );
    }
  };
  afficheArticle = () => {
    if (this.state.url == "") {
      Alert.alert(
        "Lien inactif",
        "Cet article n'est pas présent sous forme de document.",
        [{ text: "Ok" }]
      );
    } else {
      this.props.navigation.navigate("PdfReader", {
        uri: this.state.url,
      });
    }
  };
  componentDidMount() {
    const test = firebase
      .storage()
      .ref(
        "Actualites/" +
          this.props.route.params.titre +
          "_" +
          this.props.route.params.date
      )
      .getDownloadURL()
      .then((url) => {
        this.setState({ url: url });
      })
      .catch(() => {});
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Text style={styles.titre}>{this.props.route.params.titre}</Text>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: this.props.route.params.uri,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            borderBottomStartRadius: 130,
            borderBottomEndRadius: 130,
            height: 60,
          }}
        >
          <Text style={styles.date}>{this.props.route.params.date}</Text>
          <TouchableOpacity onPress={this.onShare}>
            <Image
              source={image}
              style={{ width: 24, height: 24, marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.afficheArticle}>
          <Text style={styles.lien}>Article complet</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          {this.props.route.params.description}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titre: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
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
    marginTop: 10,
    textDecorationLine: "underline",
    color: "#6A85BE",
  },
});

export default ActuDetail;
