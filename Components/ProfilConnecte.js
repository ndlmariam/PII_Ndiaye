import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import firebase from "firebase";
import firebaseConfig from "../firebase";
var name, email, photoUrl, uid, emailVerified;
var user;
class ProfilConnecte extends React.Component {
  handleSignOut = () => {
    firebase.auth().signOut().then(this.props.navigation.navigate("Accueil"));
  };
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    user = firebase.auth().currentUser;
    user.reload();
    name = user.displayName;
    email = user.email;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      //photoUrl = user.photoURL;
      //emailVerified = user.emailVerified;
      //uid = user.uid;
    }
  }
  render() {
    this.getUser();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log(firebaseConfig);
    }
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.profil}>- Informations compte -</Text>
        <Text style={styles.text}>Adhérent.e : {name}</Text>
        <Text style={styles.text}>Adresse mail : {email}</Text>
        <Button
          title="Changer adresse mail"
          onPress={() => {
            this.props.navigation.navigate("ChangeAdresse", { email: email });
            this.getUser();
          }}
        />
        <Button
          title="Changer mot de passe"
          onPress={() =>
            this.props.navigation.navigate("OubliMDP", { email: email })
          }
        />
        <Text style={styles.profil}>- Connexion aux instances -</Text>
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate("Instances")}
          >
            <Text style={styles.deco}>Instances</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profil}>- Se déconnecter -</Text>
        <Text style={styles.text}>
          Vous pouvez vous déconnecter, mais vos identifiants vous seront
          demandés lors de la prochaine utilisation de l'application.
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={styles.btndeco} onPress={this.handleSignOut}>
            <Text style={styles.deco}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProfilConnecte;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#F8F8F8",
    backgroundColor: "white",
    paddingTop: 20,
    flex: 3,
  },
  btn: {
    backgroundColor: "#6A85BE",
    borderRadius: 30,
    height: 50,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  btndeco: {
    backgroundColor: "#6B3A3F",
    borderRadius: 30,
    height: 50,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },

  profil: {
    fontSize: 27,
    marginVertical: 25,
    marginHorizontal: 25,
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 10,
  },
  deco: {
    fontSize: 20,
    color: "white",
  },
});
