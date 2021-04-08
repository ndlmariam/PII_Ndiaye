// import { createStackNavigator } from "@react-navigation/stack";
// import { StyleSheet, Image, TouchableOpacity } from "react-native";
// import Elus from "../Components/Elus";
// import Accueil from "../Components/Accueil";
// import Accords from "../Components/Accords";
// import Adhesion from "../Components/Adhesion";
// import ActualitesMembres from "../Components/ActualitesMembres";
// import Actualites from "../Components/Actualites";
// import MesDroits from "../Components/MesDroits";
// import CFDTMoi from "../Components/CFDTMoi";
// // import Profil from "../Components/Profil";
// // import ProfilConnecte from "../Components/ProfilConnecte";
// import Instances from "../Components/Instances";
// import ActuDetail from "../Components/ActuDetail";
// import Contact from "../Components/Contact";
// import Follow from "../Components/Follow";
// // import Inscription from "../Components/Inscription";
// // import OubliMDP from "../Components/OubliMdp";
// import AjoutActualite from "../Components/AjoutActualite";
// import { Definition, Pourquoi } from "../Components/InfosCFDT";
// import {
//   ElusCSSCT,
//   ElusCSE,
//   ElusCommission,
//   Delegues,
// } from "../Components/ElusDef";
// import {
//   AnjouMaine,
//   Nationaux,
//   ConventionCollective,
//   Reglement,
// } from "../Components/AccordsDef";
// import React from "react";

// const LogoTitle = ({ navigation }) => {
//   return (
//     <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
//       <Image
//         style={{ width: 95, height: 42 }}
//         source={require("../Images/logo.png")}
//       />
//     </TouchableOpacity>
//   );
// };

// const LogoMenu = ({ navigation }) => {
//   return (
//     <TouchableOpacity onPress={() => navigation.openDrawer()}>
//       <Image source={require("../Images/menu.png")} style={styles.iconMenu} />
//     </TouchableOpacity>
//   );
// };

// const Stack = createStackNavigator();

// class AccueilStack extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ActuStackFin: Actualites,
//     };
//   }
//   listener = () => {
//     const { currentUser } = firebase.auth();
//     if (currentUser) {
//       this.setState({ ActuStackFin: ActualitesMembres });
//     } else {
//       this.setState({ ActuStackFin: Actualites });
//     }
//   };
//   loadEtat() {
//     firebase.auth().onAuthStateChanged(this.listener);
//   }
//   componentDidMount() {
//     this.loadEtat();
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Accueil"
//           component={Accueil}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//         <Stack.Screen name="Élus" component={Elus} />
//         <Stack.Screen name="Adhésion" component={Adhesion} />
//         <Stack.Screen name="Mes droits" component={MesDroits} />
//         <Stack.Screen name="Accords" component={Accords} />
//         <Stack.Screen name="Actualités" component={this.state.ActuStackFin} />
//         <Stack.Screen name="Détail" component={ActuDetail} />
//         <Stack.Screen name="Ajout Actualité" component={AjoutActualite} />
//         <Stack.Screen name="Élus CSSCT" component={ElusCSSCT} />
//         <Stack.Screen name="Élus CSE" component={ElusCSE} />
//         <Stack.Screen name="Élus commission CSE" component={ElusCommission} />
//         <Stack.Screen name="Délégués syndicaux" component={Delegues} />
//         <Stack.Screen name="Accords Anjou Maine" component={AnjouMaine} />
//         <Stack.Screen name="Accords nationaux" component={Nationaux} />
//         <Stack.Screen
//           name="Convention Collective"
//           component={ConventionCollective}
//         />
//         <Stack.Screen name="Réglement intérieur" component={Reglement} />
//       </Stack.Navigator>
//     );
//   }
// }

// class ElusStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Élus"
//           component={Elus}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//         <Stack.Screen name="Élus CSSCT" component={ElusCSSCT} />
//         <Stack.Screen name="Élus CSE" component={ElusCSE} />
//         <Stack.Screen name="Élus commission CSE" component={ElusCommission} />
//         <Stack.Screen name="Délégués syndicaux" component={Delegues} />
//       </Stack.Navigator>
//     );
//   }
// }

// class CFDTMoiStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="CFDT et moi"
//           component={CFDTMoi}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//         <Stack.Screen name="Adhésion" component={Adhesion} />
//         <Stack.Screen name="Définition" component={Definition} />
//         <Stack.Screen name="Pourquoi" component={Pourquoi} />
//         <Stack.Screen name="Mes droits" component={MesDroits} />
//       </Stack.Navigator>
//     );
//   }
// }

// // class ProfilStack extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state() = {
// //       currentUser: null,
// //     };
// //   }

// //   componentDidMount() {
// //     const { currentUser } = firebase.auth();
// //     this.setState({ currentUser });
// //   }
// //   render() {
// //     const { navigation } = this.props;
// //     return (
// //       <Stack.Navigator>
// //         <Stack.Screen
// //           name="Profil"
// //           component={Profil}
// //           options={{
// //             headerLeft: () => LogoMenu({ navigation }),
// //             headerTitle: () => LogoTitle({ navigation }),
// //           }}
// //         />
// //         <Stack.Screen name="Inscription" component={Inscription} />
// //         <Stack.Screen name="OubliMDP" component={OubliMDP} />
// //       </Stack.Navigator>
// //     );
// //   }
// // }

// class ActualitesStack extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ActuStackFin: Actualites,
//     };
//   }
//   listener = () => {
//     const { currentUser } = firebase.auth();
//     if (currentUser) {
//       this.setState({ ActuStackFin: ActualitesMembres });
//     } else {
//       this.setState({ ActuStackFin: Actualites });
//     }
//   };
//   loadEtat() {
//     firebase.auth().onAuthStateChanged(this.listener);
//   }
//   componentDidMount() {
//     this.loadEtat();
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Actualités"
//           component={this.state.ActuStackFin}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//         <Stack.Screen name="Détail" component={ActuDetail} />
//         <Stack.Screen name="Ajout Actualité" component={AjoutActualite} />
//       </Stack.Navigator>
//     );
//   }
// }

// class AccordsStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Accords"
//           component={Accords}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//         <Stack.Screen name="Accords Anjou Maine" component={AnjouMaine} />
//         <Stack.Screen name="Accords nationaux" component={Nationaux} />
//         <Stack.Screen
//           name="Convention Collective"
//           component={ConventionCollective}
//         />
//         <Stack.Screen name="Réglement intérieur" component={Reglement} />
//       </Stack.Navigator>
//     );
//   }
// }

// class InstancesStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Instances"
//           component={Instances}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//       </Stack.Navigator>
//     );
//   }
// }

// class ContactStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Nous contacter"
//           component={Contact}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//       </Stack.Navigator>
//     );
//   }
// }

// class FollowStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Nous suivre"
//           component={Follow}
//           options={{
//             headerLeft: () => LogoMenu({ navigation }),
//             headerTitle: () => LogoTitle({ navigation }),
//           }}
//         />
//       </Stack.Navigator>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   iconMenu: {
//     marginLeft: 10,
//     width: 30,
//     height: 30,
//   },
// });

// export {
//   AccueilStack,
//   ElusStack,
//   CFDTMoiStack,
//   ActualitesStack,
//   AccordsStack,
//   InstancesStack,
//   FollowStack,
//   ContactStack,
// };
