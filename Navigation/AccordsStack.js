import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Accords from "../Components/Accords";
import PdfReader from "../Components/PdfReader";
import PdfReaderAccords from "../Components/PdfReaderAccords";
import { AnjouMaine, Reglement } from "../Components/AccordsDef";
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

const Stack = createStackNavigator();

class AccordsStack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Accords"
          component={Accords}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Accords Anjou Maine"
          component={AnjouMaine}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="Réglement intérieur"
          component={Reglement}
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

export default AccordsStack;
