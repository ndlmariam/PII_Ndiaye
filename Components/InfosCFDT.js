import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { Video } from "expo-av";

//Affichage de la page de description de la CFDT
const Definition = () => {
  const video = React.useRef(null);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.titre}>La CFDT c'est quoi ?</Text>
      <Video
        ref={video}
        style={styles.video}
        source={require("../Images/JingleCFDT.mp4")}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <Text style={{ padding: 10, fontStyle: "italic", fontSize: 15 }}>
        {" "}
        *Si le son ne marche pas, désactivez le mode silencieux.{" "}
      </Text>

      <View
        style={{
          marginVertical: 15,
        }}
      >
        <Text style={styles.titre}>Les valeurs de la CFDT</Text>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 25,
              textAlign: "center",
              color: "#BB9AC4",
            }}
          >
            Démocratie{" "}
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 25,
              textAlign: "center",
              color: "#89CCCF",
            }}
          >
            Solidarité
          </Text>
        </View>
        <View
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 25,
              textAlign: "center",
              color: "#F6A924",
            }}
          >
            Justice sociale{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 25,
              textAlign: "center",
              color: "#AAC955",
            }}
          >
            Autonomie{" "}
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 25,
              textAlign: "center",
              color: "#F2AAC8",
            }}
          >
            Émancipation
          </Text>
        </View>
      </View>
      <Text style={styles.titre}>La CFDT en 10 points</Text>
      <View style={{ padding: 15, backgroundColor: "white" }}>
        <Text style={styles.texte}>
          1. La CFDT est le premier syndicat français en nombre d'adhérents :
          des hommes et des femmes qui travaillent dans tous les secteurs
          professionnels, dans les petites et les grandes entreprises, dans le
          privé en majorité, dans le public et dans toutes les régions de
          France.
        </Text>
        <Text style={styles.texte}>
          2. La CFDT est le deuxième syndicat français en voix aux élections
          prud'homales et dans les entreprises et administrations.
        </Text>
        <Text style={styles.texte}>
          3. La CFDT est le syndicat où l'adhérent a des droits. Le droit d'être
          écouté, respecté, informé, défendu gratuitement en cas de problème.
        </Text>
        <Text style={styles.texte}>
          4. La CFDT n'est ni de gauche ni de droite, elle est du côté des
          salariés. Son premier objectif est d'obtenir des droits nouveaux pour
          les salariés en faisant reculer les inégalités. C'est par exemple la
          CFDT qui a obtenu le droit de partir à la retraite à 60 ans pour ceux
          qui ont commencé à travailler jeunes.
        </Text>
        <Text style={styles.texte}>
          5. La CFDT est un syndicat pragmatique qui préfère trouver des
          solutions par le dialogue, mais n'hésite pas à se mobiliser contre des
          mesures injustes comme la réforme des retraites en 2010.
        </Text>
        <Text style={styles.texte}>
          6. La CFDT est un syndicat qui a toujours dénoncé toutes les
          dictatures d'où qu'elles soient et qui a aidé des syndicalistes à
          instaurer la démocratie commen en Pologne dans les années 80.
        </Text>
        <Text style={styles.texte}>
          7. La CFDT est un syndicat laïc qui respecte toutes les croyances
          religieuses ou philosophiques tant qu'elles ne conduisent pas à la
          haine, au racisme, à l'exclusion.
        </Text>
        <Text style={styles.texte}>
          8. La CFDT sait que le monde change, qu'il faut en permanence mettre à
          jour les revendications pour faire face aux évolutions du marché du
          travail, à la précarité.
        </Text>
        <Text style={styles.texte}>
          9. La CFDT est adhérente à la Confédération européenne des syndicats
          (CES) et se prononce pour une Europe politique, sociale, capable de
          faire face aux nouvelles puissances pour créer des emplois, préserver
          sa protection sociale et faire progresser les qualifications.
        </Text>
        <Text style={styles.texte}>
          10. La CFDT est solidaire de tous les syndicats du monde, comme elle,
          affiliés à la Confédération syndicale internationale.
        </Text>
      </View>
    </ScrollView>
  );
};

//Affichage de la page de pourquoi adhérer au syndicat
const Pourquoi = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.titre}>Pourquoi adhérer ?</Text>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.texte}>
          Environ un salarié sur dix seulement adhère à un syndicat en France.
          De fait, qu’on soit syndiqué ou non, ça change peu de choses en
          matière de droits. En effet, les syndicats négocient pour tous les
          salariés, pas seulement pour leurs adhérents. Mais alors, quel intérêt
          pour les travailleurs d’adhérer à un syndicat et pourquoi choisir la
          CFDT ?
        </Text>
        <Text style={styles.titre2}>Adhérer par principe !</Text>
        <Text style={styles.texte}>
          De nombreux droits dont nous bénéficions quotidiennement ont été
          conquis par l'action syndicale. Si les travailleurs n’avaient personne
          pour les représenter et les défendre dans les entreprises et les
          administrations, leurs droits seraient déséquilibrés.
        </Text>
        <Text style={styles.titre2}>Adhérer pour soutenir nos valeurs !</Text>
        <Text style={styles.texte}>
          Mais lesquelles ? A la CFDT, 5 sont incontournables :
        </Text>
        <Text style={styles.texte}>
          La solidarité, l'émancipation, la démocratie, l'indépendance et
          l'autonomie.
        </Text>
        <Text style={styles.titre2}>Adhérer pour rejoindre un collectif !</Text>
        <Text style={styles.texte}>
          Être adhérent CFDT, c’est pouvoir compter sur un réseau de personnes
          qui partagent nos valeurs tout en représentant la diversité des
          travailleurs en France. C’est aussi pouvoir apporter ses idées et
          débattre au sein de ce collectif.
        </Text>
        <Text style={styles.titre2}>
          Adhérer pour bénéficier d’un accompagnement !
        </Text>
        <Text style={styles.texte}>
          La CFDT a développé une offre de services de plus en plus riche : la
          Caisse nationale d’action syndicale (Cnas), le soutien juridique,
          Réponses à la Carte, Job à la carte, les assurances "Vie
          professionnelle "et "Vie syndicale", l'aide aux victimes de répression
          syndicale, la caisse de grève, des réductions sur les loisirs et les
          activités culturelles, Partage de toit...
        </Text>
        <Text style={styles.titre2}>Adhérer pour faire le poids !</Text>
        <Text style={styles.texte}>
          Plus nos adhérents sont nombreux, plus la CFDT est incontournable.
        </Text>
        <Text style={styles.texte}>
          Plus nos adhérents sont nombreux, plus la CFDT est représentative de
          l'ensemble des travailleurs.
        </Text>
        <Text style={styles.texte}>
          Plus nos adhérents sont nombreux, plus la CFDT est entendue et
          légitime face aux employeurs.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  video: {
    height: 225,
    width: Dimensions.get("window").width,
  },
  texte: {
    fontSize: 18,
    paddingBottom: 10,
    color: "#555554",
  },
  titre: {
    marginTop: 10,
    fontSize: 35,
    color: "white",
    textAlign: "center",
    backgroundColor: "#E7591C",
    height: 50,
  },
  titre2: {
    marginTop: 10,
    fontSize: 27,
    color: "#E7591C",
    textAlign: "center",
  },
});

export { Definition, Pourquoi };
