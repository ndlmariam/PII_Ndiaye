import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image,Dimensions} from 'react-native'

const Elus =({navigation})=> { 
      return (
        <View style={{flex : 1}}>
            <View style={{flex : 2}} >
              <TouchableOpacity style={styles.bloc1}
            onPress={() => navigation.navigate("Élus CSSCT")}>
                <Text style={styles.texte1}>Élus CSSCT</Text>
                <Image
                    source={require('../Images/suivant.png')}
                    style={styles.image}
                  />
             </TouchableOpacity>
            <TouchableOpacity style={styles.bloc2}
            onPress={() => navigation.navigate("Élus CSE")}>
               <Text style={styles.texte2}>Élus CSE</Text>
               <Image
                    source={require('../Images/suivant.png')}
                    style={styles.image}
                  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bloc1}
            onPress={() => navigation.navigate("Élus commission CSE")}>
            <Text style={styles.texte1}>Élus commission CSE</Text>
            <Image
                    source={require('../Images/suivant.png')}
                    style={styles.image}
                  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bloc2}
            onPress={() => navigation.navigate("Délégués syndicaux")}>
            <Text style={styles.texte2}>Délégués syndicaux</Text>
            <Image
                    source={require('../Images/suivant.png')}
                    style={styles.image}
                  />
            </TouchableOpacity>
          
            </View>
            <View style={{flex:2}}/>
        </View>
        
      )
    
  }
  
  const styles = StyleSheet.create({
    titre:{
      color : "#BB9AC4", 
      textAlign:"center", 
      marginTop:15,
      fontSize:30
    },
    bloc1:{
      width:Dimensions.get('window').width, 
      flex:1,
      backgroundColor: "#BB9AC4",
      flexDirection:"row",
      alignItems:"center"
    },
    bloc2:{
      width:Dimensions.get('window').width, 
      flex:1,
      backgroundColor: "white",
      flexDirection:"row",
      alignItems:"center"
    },
    texte1 : {
     
      color : "white", 
      fontSize:25,
      marginLeft:10,
      flex: 10
    },
    texte2 : {
      
      color : "#BB9AC4",
      fontSize:25,
      marginLeft:10,
      flex:10
    },
    image:{
      width: 20, 
      height:20, 
      flex : 1
    }
  })
  
  export default Elus