import React from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import firebase from "firebase";

function ListElusCommission(prenom, nom, image, num, definition, poste) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", padding: 10, flex: 3, height: 190 }}>
        <Image
          source={{ uri: image }}
          style={{ flex: 1, borderTopLeftRadius: 5 }}
        />
        <View
          style={{
            flex: 2,
            backgroundColor: "#6B3A3F",
            padding: 15,
            justifyContent: "flex-end",
            borderTopRightRadius: 50,
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>{prenom}</Text>
          <Text style={{ fontSize: 25, marginBottom: 6, color: "white" }}>
            {nom.toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginBottom: 17,
              fontStyle: "italic",
              color: "white",
            }}
          >
            {num}
          </Text>
          <Text style={{ fontSize: 15, color: "white" }}>{poste}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomColor: "#E7591C",
          borderBottomWidth: 0.2,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: "#555554",
          }}
        >
          {definition}
        </Text>
      </View>
    </View>
  );
}

function ListElus(prenom, nom, image, num) {
  if (image != "") {
    return (
      <View style={{ flexDirection: "row", padding: 10, flex: 1, height: 190 }}>
        <Image
          source={{ uri: image }}
          style={{ flex: 1, borderTopLeftRadius: 5 }}
        />
        <View
          style={{
            flex: 2,
            backgroundColor: "#6B3A3F",
            padding: 15,
            justifyContent: "flex-end",
            borderTopRightRadius: 50,
          }}
        >
          <Text style={{ fontSize: 28, color: "white" }}>{prenom}</Text>
          <Text style={{ fontSize: 28, marginBottom: 20, color: "white" }}>
            {nom.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 15, fontStyle: "italic", color: "white" }}>
            {num}
          </Text>
        </View>
      </View>
    );
  }
}

function ListElusCSSCT(prenom, nom, image, num, def) {
  if (image != "") {
    return (
      <View>
        <View
          style={{ flexDirection: "row", padding: 10, flex: 1, height: 190 }}
        >
          <Image
            source={{ uri: image }}
            style={{ flex: 1, borderTopLeftRadius: 5 }}
          />
          <View
            style={{
              flex: 2,
              backgroundColor: "#6B3A3F",
              padding: 15,
              justifyContent: "flex-end",
              borderTopRightRadius: 50,
            }}
          >
            <Text style={{ fontSize: 28, color: "white" }}>{prenom}</Text>
            <Text style={{ fontSize: 28, marginBottom: 20, color: "white" }}>
              {nom.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 15, fontStyle: "italic", color: "white" }}>
              {num}
            </Text>
          </View>
        </View>
        <Text style={styles.texte}>{def}</Text>
      </View>
    );
  }
}

class ElusCSSCT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListCSSCT: [],
      photo: "",
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("elus/CSSCT")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            nom: child.val().nom,
            prenom: child.val().prenom,
            num: child.val().num,
            role: child.val().role,
            pic: child.val().pic,
          });
        });
        this.setState({ ListCSSCT: li });
      });
  }
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          ListHeaderComponent={
            <View>
              <Text style={styles.titre}>Qu'est-ce que la CSSCT?</Text>
              <Text style={styles.texte}>
                La CSSCT est une commission du CSE spécialisée dans les règles
                de santé et de sécurité au travail ainsi que dans les conditions
                de travail.
              </Text>
              <Text style={styles.texte}>
                Présidé par l’employeur, le CSSCT est composé d’une délégation
                du personnel qui vote les décisions ou les résolutions.
              </Text>
              <Text style={styles.texte}>
                Celles-ci doivent être adoptées à la majorité des membres
                présents. le comité est également composé de personnes
                qualifiées dont les voix sont consultatives (médecin du travail
                par exemple).
              </Text>
              <Text style={styles.texte}>
                L’inspecteur du travail a également la possibilité d’assister
                aux réunions de la CSSCT, dont il doit être informé.
              </Text>
              <Text style={styles.texte}>
                La CSSCT rencontre les salariés sur leur lieu de travail,
                participe aux commissions immobilier et évaluation des risques.
              </Text>
            </View>
          }
          data={this.state.ListCSSCT}
          renderItem={({ item }) =>
            ListElusCSSCT(item.prenom, item.nom, item.pic, item.num, item.role)
          }
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    );
  }
}

class ElusCSE extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeText = "";
    this.state = {
      ListCSE: [],
      photo: null,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("elus/CSE")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            nom: child.val().nom,
            prenom: child.val().prenom,
            num: child.val().num,
            pic: child.val().pic,
          });
        });
        this.setState({ ListCSE: li });
      });
  }
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          ListHeaderComponent={
            <View>
              <Text style={styles.titre}>Qu'est-ce que le CSE ?</Text>
              <Text style={styles.texte}>
                Le CSE est consulté sur les dossiers importants de l’entreprise
                (orientations stratégiques, politique sociale…) qui touchent à
                plus ou moins long terme votre travail et son organisation.{" "}
              </Text>
              <Text style={styles.texte}>
                Il gère également les activités sociales et culturelles.
              </Text>
              <Text style={styles.texte}>
                Les élus du CSE sont là pour porter les problématiques de tous
                les jours dans votre travail.
              </Text>
              <Text style={styles.texte}>
                N’hésitez pas à les contacter pour remonter les questions de
                conditions de travail, de salaire, d’horaires… ils rencontrent
                tous les mois la direction dans le but d’améliorer votre
                quotidien.
              </Text>
            </View>
          }
          data={this.state.ListCSE}
          renderItem={({ item }) =>
            ListElus(item.prenom, item.nom, item.pic, item.num)
          }
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    );
  }
}

class ElusCommission extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeText = "";
    this.state = {
      ListCommission: [],
      photo: null,
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("elus/Commission")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            nom: child.val().nom,
            prenom: child.val().prenom,
            num: child.val().num,
            role: child.val().role,
            com: child.val().com,
            pic: child.val().pic,
          });
        });
        this.setState({ ListCommission: li });
      });
  }
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          ListHeaderComponent={<Text style={styles.titre}>Commission CSE</Text>}
          data={this.state.ListCommission}
          renderItem={({ item }) =>
            ListElusCommission(
              item.prenom,
              item.nom,
              item.pic,
              item.num,
              item.com,
              item.poste
            )
          }
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    );
  }
}

class Delegues extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeText = "";
    this.state = {
      ListDelegues: [],
      photo: null,
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("elus/Delegues")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            nom: child.val().nom,
            prenom: child.val().prenom,
            num: child.val().num,
            pic: child.val().pic,
          });
        });
        this.setState({ ListDelegues: li });
      });
  }
  recherchePhoto = (nom, prenom) => {
    firebase
      .storage()
      .ref("Elus/" + nom + prenom + ".jpg")
      .getDownloadURL()
      .then((url) => {
        this.setState({ photo: url });
      })
      .catch();
  };
  render() {
    return (
      <View style={{ backgroundColor: "white", marginBottom: 20 }}>
        <FlatList
          ListHeaderComponent={
            <View>
              <Text style={styles.titre}>
                Qui sont les délégués syndicaux ?
              </Text>
              <Text style={styles.texte2}>
                Les délégués syndicaux représentent la CFDT dans l'entreprise.
              </Text>
              <Text style={styles.texte2}>
                Ils accompagnent les salariés pour défendre leurs droits.
              </Text>
              <Text style={styles.texte2}>
                Ils organisent et font vivre la section syndicale.
              </Text>
              <Text style={styles.texte2}>
                Ils coordonnent les actions CFDT de l'entreprise.
              </Text>
              <Text style={styles.texte2}>
                Ils communiquent auprès des adhérents et des salariés.
              </Text>
              <Text style={styles.texte2}>
                Ils informent les adhérents et les salariés sur l'actualité
                économique et sociale de l'entreprise.
              </Text>
              <Text style={styles.texte2}>
                Ils négocient les accords d'entreprise, les adaptent et les font
                évoluer au monde sociétal.
              </Text>
            </View>
          }
          data={this.state.ListDelegues}
          renderItem={({ item }) =>
            ListElus(item.prenom, item.nom, item.pic, item.num)
          }
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  texte: {
    fontSize: 18,
    padding: 10,
    color: "#555554",
  },
  titre: {
    fontSize: 23,
    padding: 10,
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: "#E7591C",
    color: "white",
  },
  texte2: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#555554",
  },
});

export { ElusCSSCT, ElusCSE, ElusCommission, Delegues };
