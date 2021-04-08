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
} from "react-native";

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
    };
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          this.props.route.params.titre +
          "\nDescription : \n" +
          this.props.route.params.description +
          "\nLien article : ",
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
    color: "#6A85BE",
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
});

export default ActuDetail;
