import React from "react";
import { FlatList, RefreshControl, View,ScrollView, Text,Image,StyleSheet, Linking,TouchableOpacity, Pressable } from "react-native";
import {useNavigation} from "@react-navigation/native";
const NewsItem = ({newsData}) => {
    const {
        urlToImage,
        title,
        source,
        description,
        url,
    } = newsData

    const styles = StyleSheet.create({
        tinyLogo: {
            borderRadius: 50,
            width: 50,
            height: 50,
        },
        greenText: {
            color: '#fff'
        }
    });

    const navigation = useNavigation();

    return(
        <Pressable
            style={{border: '2px solid #fff', backgroundColor: 'gray', borderRadius: 10, padding: 15,marginBottom: 20}}
            onPress={() => navigation.navigate("AboutNews", {Item: newsData})}
        >
         <View style={{flexDirection: 'row', alignItems: "center", marginBottom: 10}}>
             <Image
                 style={styles.tinyLogo}
                 source={{
                     uri: urlToImage
                 }}
             />
             <Text style={{ color: 'white',flex: 1, marginLeft: 10 }}>{title}</Text>
         </View>
            <View
                style={{flexDirection: 'row'}}
            >
                <Text style={{color: '#fff'}}>Источник:</Text>
                <Text
                    style={{color: '#00FF7F'}}
                > {source.name}</Text>
            </View>
        </Pressable>
    )
}
export default NewsItem