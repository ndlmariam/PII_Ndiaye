import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import Elus from "../Components/Elus";
import Accueil from "../Components/Accueil";
import Accords from "../Components/Accords";
import Adhesion from "../Components/Adhesion";
import Actualites from "../Components/Actualites";
import ActualitesMembres from "../Components/ActualitesMembres";
import ActuDetail from "../Components/ActuDetail";
import AjoutActualite from "../Components/AjoutActualite";
import PdfReader from "../Components/PdfReader";
import PdfReaderAccords from "../Components/PdfReaderAccords";
import firebase from "firebase";
import firebaseConfig from "../firebase";
import {
  ElusCSSCT,
  ElusCSE,
  ElusCommission,
  Delegues,
} from "../Components/ElusDef";
import { AnjouMaine } from "../Components/AccordsDef";
import React from "react";

//Création du bouton de redirection vers l'accueil
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
//Création du bouton d'ouverture du menu déroulant
const LogoMenu = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image source={require("../Images/menu.png")} style={styles.iconMenu} />
    </TouchableOpacity>
  );
};

const Stack = createStackNavigator();

//Définition des écrans accessibles en navigation directe à partir de l'accueil
class AccueilStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ActuStackFin: Actualites,
    };
  }
  //Vérification de l'état de connexion de l'utilisateur pour l'affichage des pages
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
          name="Accueil"
          component={Accueil}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Élus"
          component={Elus}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Adhésion"
          component={Adhesion}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Accords"
          component={Accords}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Actualités"
          component={this.state.ActuStackFin}
          options={{
            headerTitle: null,
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
          }}
        />
        <Stack.Screen
          name="Ajout Actualité"
          component={AjoutActualite}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Élus CSSCT"
          component={ElusCSSCT}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Élus CSE"
          component={ElusCSE}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Élus commission CSE"
          component={ElusCommission}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Délégués syndicaux"
          component={Delegues}
          options={{
            headerTitle: null,
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Accords Anjou Maine"
          component={AnjouMaine}
          options={{
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name="PdfReaderAccords"
          component={PdfReaderAccords}
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
export default AccueilStack;
