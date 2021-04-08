// Navigation/Navigation.js
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ProfilStack from "../Navigation/ProfilStack";
import AccueilStack from "../Navigation/AccueilStack";
import ElusStack from "../Navigation/ElusStack";
import CFDTMoiStack from "../Navigation/CFDTMoiStack";
import ActualitesStack from "../Navigation/ActualitesStack";
import AccordsStack from "../Navigation/AccordsStack";
import FollowStack from "../Navigation/FollowStack";
import ContactStack from "../Navigation/ContactStack";

const Drawer = createDrawerNavigator();

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Accueil"
          drawerContentOptions={{
            activeTintColor: "white",
            activeBackgroundColor: "#F6A924",
            inactiveTintColor: "black",
            labelStyle: { fontSize: 20 },
          }}
        >
          <Drawer.Screen
            name="Profil"
            component={ProfilStack}
            options={{
              drawerIcon: () => (
                <Image
                  source={require("../Images/profile.png")}
                  style={{ width: 40, height: 40 }}
                />
              ),
            }}
          />
          <Drawer.Screen name="Accueil" component={AccueilStack} />
          <Drawer.Screen name="Actualités" component={ActualitesStack} />
          <Drawer.Screen name="La CFDT et moi" component={CFDTMoiStack} />
          <Drawer.Screen name="Les accords" component={AccordsStack} />
          <Drawer.Screen name="Mes élus" component={ElusStack} />
          <Drawer.Screen name="Nous contacter" component={ContactStack} />
          <Drawer.Screen name="Nous suivre" component={FollowStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
