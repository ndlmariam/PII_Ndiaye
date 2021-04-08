import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity, Share } from "react-native";
import Actualites from "../Components/Actualites";
import ActualitesMembres from "../Components/ActualitesMembres";
import ActuDetail from "../Components/ActuDetail";
import AjoutActualite from "../Components/AjoutActualite";
import React from "react";
import firebase from "firebase";
import firebaseConfig from "../firebase";
const LogoTitle = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
      <Image
        style={{ width: 95, height: 42 }}
        source={require("../Images/logo.png")}
      />
    </TouchableOpacity>
  );
};

const LogoMenu = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image source={require("../Images/menu.png")} style={styles.iconMenu} />
    </TouchableOpacity>
  );
};

const image = Platform.select({
  ios: () => require("../Images/shareios.png"),
  android: () => require("../Images/shareandroid.png"),
  web: () => require("../Images/shareandroid.png"),
})();

// const onShare = async () => {
//   try {
//     const result = await Share.share({
//       message: "Bonjour" + this.props.route.params.description,
//     });
//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // shared with activity type of result.activityType
//       } else {
//         // shared
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // dismissed
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// };

// const LogoShare = () => {
//   return (
//     <TouchableOpacity onPress={onShare}>
//       <Image source={image} style={{ width: 26, height: 26, margin: 5 }} />
//     </TouchableOpacity>
//   );
// };

const Stack = createStackNavigator();

class ActualitesStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ActuStackFin: Actualites,
    };
  }
  listener = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.setState({ ActuStackFin: ActualitesMembres });
    } else {
      this.setState({ ActuStackFin: Actualites });
    }
  };
  loadEtat() {
    firebase.auth().onAuthStateChanged(this.listener);
  }
  componentDidMount() {
    this.loadEtat();
  }
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log(firebaseConfig);
    }
    const { navigation } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Actualités"
          component={this.state.ActuStackFin}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
        <Stack.Screen
          name="Détail"
          component={ActuDetail}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            //headerRight: () => LogoShare(),
          }}
        />
        <Stack.Screen
          name="Ajout Actualité"
          component={AjoutActualite}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  iconMenu: {
    marginLeft: 10,
    width: 30,
    height: 30,
  },
});

export default ActualitesStack;
