import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity, Platform } from "react-native";

import Actualites from "../Components/Actualites";
import ActualitesMembres from "../Components/ActualitesMembres";
import PdfReader from "../Components/PdfReader";
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
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="PdfReader"
          component={PdfReader}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Détail"
          component={ActuDetail}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
            //headerRight: () => LogoShare(),
          }}
        />
        <Stack.Screen
          name="Ajout Actualité"
          component={AjoutActualite}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
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
