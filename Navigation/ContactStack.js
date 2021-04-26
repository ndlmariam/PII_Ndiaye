import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Contact from "../Components/Contact";
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
//Définition des écrans accessibles en navigation directe à partir du formulaire de contact
class ContactStack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Nous contacter"
          component={Contact}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
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
export default ContactStack;
