import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity, Share } from "react-native";
import Elus from "../Components/Elus";
import Accueil from "../Components/Accueil";
import Accords from "../Components/Accords";
import Adhesion from "../Components/Adhesion";
import Actualites from "../Components/Actualites";
import ActualitesMembres from "../Components/ActualitesMembres";
import MesDroits from "../Components/MesDroits";
import ActuDetail from "../Components/ActuDetail";
import AjoutActualite from "../Components/AjoutActualite";

import firebase from "firebase";
import firebaseConfig from "../firebase";
import {
  ElusCSSCT,
  ElusCSE,
  ElusCommission,
  Delegues,
} from "../Components/ElusDef";
import {
  AnjouMaine,
  Nationaux,
  ConventionCollective,
  Reglement,
} from "../Components/AccordsDef";
import React from "react";

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

class AccueilStack extends React.Component {
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
          name="Accueil"
          component={Accueil}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
        <Stack.Screen name="Élus" component={Elus} />
        <Stack.Screen name="Adhésion" component={Adhesion} />
        <Stack.Screen name="Mes droits" component={MesDroits} />
        <Stack.Screen name="Accords" component={Accords} />
        <Stack.Screen name="Actualités" component={this.state.ActuStackFin} />
        <Stack.Screen
          name="Détail"
          component={ActuDetail}
          // options={{
          //   headerRight: () => LogoShare(),
          // }}
        />
        <Stack.Screen name="Ajout Actualité" component={AjoutActualite} />
        <Stack.Screen name="Élus CSSCT" component={ElusCSSCT} />
        <Stack.Screen name="Élus CSE" component={ElusCSE} />
        <Stack.Screen name="Élus commission CSE" component={ElusCommission} />
        <Stack.Screen name="Délégués syndicaux" component={Delegues} />
        <Stack.Screen name="Accords Anjou Maine" component={AnjouMaine} />
        <Stack.Screen name="Accords nationaux" component={Nationaux} />
        <Stack.Screen
          name="Convention Collective"
          component={ConventionCollective}
        />
        <Stack.Screen name="Réglement intérieur" component={Reglement} />
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
