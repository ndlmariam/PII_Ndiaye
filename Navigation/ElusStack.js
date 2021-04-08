import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Elus from "../Components/Elus";
import {
  ElusCSSCT,
  ElusCSE,
  ElusCommission,
  Delegues,
} from "../Components/ElusDef";
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

class ElusStack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Élus"
          component={Elus}
          options={{
            headerLeft: () => LogoMenu({ navigation }),
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
        <Stack.Screen
          name="Élus CSSCT"
          component={ElusCSSCT}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
        <Stack.Screen
          name="Élus CSE"
          component={ElusCSE}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
        <Stack.Screen
          name="Élus commission CSE"
          component={ElusCommission}
          options={{
            headerTitle: () => LogoTitle({ navigation }),
          }}
        />
        <Stack.Screen
          name="Délégués syndicaux"
          component={Delegues}
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
export default ElusStack;
