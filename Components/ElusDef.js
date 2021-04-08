import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
//BCC3C4
function ListElus(prenom, nom, image, num) {
  return (
    <View style={{ flexDirection: "row", padding: 10, flex: 1 }}>
      <Image source={image} style={{ flex: 1, borderTopLeftRadius: 5 }} />
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

function ListElusCommission(prenom, nom, image, num, definition, poste) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", padding: 10, flex: 3 }}>
        <Image source={image} style={{ flex: 1, borderTopLeftRadius: 5 }} />
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

function Definition(definition) {
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderColor: "#E7591C",
        padding: 15,
        justifyContent: "center",
        marginVertical: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: "#555554" }}>{definition}</Text>
    </View>
  );
}

// function affichage(prenom, nom, image, num) {
//   if (prenom === "définition") {
//     return Definition(nom);
//   } else {
//     return ListElus(prenom, nom, image, num);
//   }
// }

const ListCSSCT = [
  {
    id: 1,
    firstName: "Manuella",
    lastName: "Feauveau",
    pic: require("../Images/manuella.jpg"),
    num: "0243042556",
  },
];

const ListCSE = [
  {
    id: 2,
    firstName: "Christelle",
    lastName: "Abrivard",
    pic: require("../Images/christelle.jpg"),
    num: "0682436210",
  },
  {
    id: 8,
    firstName: "Gilles",
    lastName: "Bernadeaux",
    pic: require("../Images/gilles.jpg"),
    num: "0603355690",
  },
  {
    id: 5,
    firstName: "Samuel",
    lastName: "Cosnuau",
    pic: require("../Images/samuel.jpg"),
    num: "0243211103",
  },
  {
    id: 4,
    firstName: "Martine",
    lastName: "Coulon-Houdayer",
    pic: require("../Images/martine.jpg"),
    num: "0689186943",
  },
  {
    id: 1,
    firstName: "Manuella",
    lastName: "Feauveau",
    pic: require("../Images/manuella.jpg"),
    num: "0243042556",
  },

  {
    id: 3,
    firstName: "Laurent",
    lastName: "Gabet",
    pic: require("../Images/laurent.jpg"),
    num: "0624935911",
  },
  {
    id: 6,
    firstName: "Lynda",
    lastName: "Lair",
    pic: require("../Images/lynda.jpg"),
    num: "0613182773",
  },
  {
    id: 7,
    firstName: "Gaëlle",
    lastName: "Le Coq",
    pic: require("../Images/gaelle.jpg"),
    num: "0969396598",
  },
  {
    id: 0,
    firstName: "Gersende",
    lastName: "Leray",
    pic: require("../Images/gersende.jpg"),
    num: "0784004999",
  },
];
const ListCommission = [
  {
    id: 8,
    firstName: "Gilles",
    lastName: "Bernadeaux",
    pic: require("../Images/gilles.jpg"),
    num: "0603355690",
    commission: "La commission économique est composée de 4 membres du CSE. ",
    poste:
      "Représentant CFDT au conseil d’administration et commission économique.",
  },
  {
    id: 1,
    firstName: "Manuella",
    lastName: "Feauveau",
    pic: require("../Images/manuella.jpg"),
    num: "0243042556",
    commission: "",
    poste: "Représentante CFDT à la commission CSSCT.",
  },
  {
    id: 6,
    firstName: "Lynda",
    lastName: "Lair",
    pic: require("../Images/lynda.jpg"),
    num: "0613182773",
    commission: "",
    poste: "Participe à la commission loisir vacances culture.",
  },
  {
    id: 7,
    firstName: "Gaëlle",
    lastName: "Le Coq",
    pic: require("../Images/gaelle.jpg"),
    num: "0969396598",
    commission:
      "La commission formation est composée de 4 membres du cse,elle analyse le plan de formation de l’entreprise.",
    poste:
      "Représentante CFDT à la commission formation et participe à la commission loisir vacances culture.",
  },
  {
    id: 0,
    firstName: "Gersende",
    lastName: "Leray",
    pic: require("../Images/gersende.jpg"),
    num: "0784004999",
    commission:
      "La commission sociale est composée de 6 membres, elle participe à la gestion du contrat santé, prévoyance, elle vient en aide à des salariés en difficulté, elle étudie les problématiques d’équilibres de temps de vie des salariés. ",
    poste: "Représentante CFDT à la commission sociale élargie.",
  },
];
const ListDelegues = [
  {
    id: 8,
    firstName: "Gilles",
    lastName: "Bernadeaux",
    pic: require("../Images/gilles.jpg"),
    num: "0603355690",
  },
  {
    id: 4,
    firstName: "Martine",
    lastName: "Coulon-Houdayer",
    pic: require("../Images/martine.jpg"),
    num: "0689186943",
  },
  {
    id: 1,
    firstName: "Manuella",
    lastName: "Feauveau",
    pic: require("../Images/manuella.jpg"),
    num: "0243042556",
  },
  {
    id: 7,
    firstName: "Gaëlle",
    lastName: "Le Coq",
    pic: require("../Images/gaelle.jpg"),
    num: "0969396598",
  },
  {
    id: 0,
    firstName: "Gersende",
    lastName: "Leray",
    pic: require("../Images/gersende.jpg"),
    num: "0784004999",
  },
];
const ElusCSSCT = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.titre}>Qu'est-ce que la CSSCT?</Text>
            <Text style={styles.texte}>
              La CSSCT est une commission du CSE spécialisée dans les règles de
              santé et de sécurité au travail ainsi que dans les conditions de
              travail.
            </Text>
            <Text style={styles.texte}>
              Présidé par l’employeur, le CSSCT est composé d’une délégation du
              personnel qui vote les décisions ou les résolutions.
            </Text>
            <Text style={styles.texte}>
              Celles-ci doivent être adoptées à la majorité des membres
              présents. le comité est également composé de personnes qualifiées
              dont les voix sont consultatives (médecin du travail par exemple).
            </Text>
            <Text style={styles.texte}>
              L’inspecteur du travail a également la possibilité d’assister aux
              réunions de la CSSCT, dont il doit être informé.
            </Text>
            <Text style={styles.texte}>
              La CSSCT rencontre les salariés sur leur lieu de travail,
              participe aux commissions immobilier et évaluation des risques.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View>
            <Text style={styles.texte}>
              Manuella participera aux travaux de la commission santé, sécurité
              et conditions de travail.
            </Text>
            <Text style={styles.texte}>
              Cette commission est composée de 6 membres et a un rôle important
              dans les instances représentatives du personnel.
            </Text>
            <Text style={styles.texte}>
              Elle est garante de la bonne exécution des projets de l’entreprise
              dans le respect de la sécurité et des bonnes conditions de travail
              des salariés.
            </Text>
            <Text style={styles.texte}>
              Elle sera en charge des visites sur des services sur les sites et
              dans les agences.
            </Text>
          </View>
        }
        data={ListCSSCT}
        renderItem={({ item }) =>
          ListElus(item.firstName, item.lastName, item.pic, item.num)
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const ElusCSE = () => {
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
              Les élus du CSE sont là pour porter les problématiques de tous les
              jours dans votre travail.
            </Text>
            <Text style={styles.texte}>
              N’hésitez pas à les contacter pour remonter les questions de
              conditions de travail, de salaire, d’horaires… ils rencontrent
              tous les mois la direction dans le but d’améliorer votre
              quotidien.
            </Text>
          </View>
        }
        data={ListCSE}
        renderItem={({ item }) =>
          ListElus(item.firstName, item.lastName, item.pic, item.num)
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const ElusCommission = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        ListHeaderComponent={<Text style={styles.texte}></Text>}
        data={ListCommission}
        renderItem={({ item }) =>
          ListElusCommission(
            item.firstName,
            item.lastName,
            item.pic,
            item.num,
            item.commission,
            item.poste
          )
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const Delegues = () => {
  return (
    <View style={{ backgroundColor: "white", marginBottom: 20 }}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.titre}>Qui sont les délégués syndicaux ?</Text>
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
        data={ListDelegues}
        renderItem={({ item }) =>
          ListElus(item.firstName, item.lastName, item.pic, item.num)
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

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
