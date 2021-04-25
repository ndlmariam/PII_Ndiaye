import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Profil from "../Components/Profil";
import ProfilConnecte from "../Components/ProfilConnecte";
import Inscription from "../Components/Inscription";
import OubliMDP from "../Components/OubliMdp";
import ChangeAdresse from "../Components/ChangeAdresse";
import Instances from "../Components/Instances";
import InscriptionFinale from "../Components/InscriptionFinale";
import InstanceDetail from "../Components/InstanceDetail";
import AjoutInstance from "../Components/AjoutInstance";
import PdfReader from "../Components/PdfReader";

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

const Stack = createStackNavigator();

class ProfilStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfilStackFin: Profil,
    };
  }

  listener = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.setState({ ProfilStackFin: ProfilConnecte });
    } else {
      this.setState({ ProfilStackFin: Profil });
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
          name="Profil"
          component={this.state.ProfilStackFin}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="InscriptionFinale"
          component={InscriptionFinale}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="OubliMDP"
          component={OubliMDP}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="ChangeAdresse"
          component={ChangeAdresse}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Instances"
          component={Instances}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="DétailInstance"
          component={InstanceDetail}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
            //headerRight: () => LogoShare(),
          }}
        />
        <Stack.Screen
          name="Ajout Instance"
          component={AjoutInstance}
          options={{
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
export default ProfilStack;
