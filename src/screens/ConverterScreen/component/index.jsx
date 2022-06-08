import { FlatList, RefreshControl, View, Text,Image,StyleSheet, Linking,TouchableOpacity } from "react-native";
import React, {useEffect, useState} from "react";
import {getNews} from "../../../service/requests";
import {useRoute} from "@react-navigation/native";
import {Entypo} from "@expo/vector-icons";

const AboutNews = ({navigation}) => {
 const route = useRoute()
 const {
     params: {Item},
 }  = route


    console.log(Item)
 const styles = StyleSheet.create({
     newsPicture:{
         width: 100,
         height: 100,
     }

 });
    return(

        <View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                    marginLeft: 5
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack('OnBoarding')}>
                    <Entypo
                        name="chevron-left"
                        style={{
                            fontSize: 28,
                            color: "#fff",
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
                <Image
                    style={{width: "100%", height: 200, marginBottom: 20, borderRadius: 15}}
                    source={{
                        uri: Item?.urlToImage
                    }}
                />
                <Text style={{color: "#fff", fontSize: 26, marginBottom: 10}}>{Item?.title}</Text>
                <Text style={{color: "gray",fontSize: 16}}>{Item?.description}</Text>
            </View>
                <TouchableOpacity  style={{padding: 10}} onPress={() => Linking.openURL(Item?.url)}>
                    <Text style={{color: '#fff'}}>Read more</Text>
                </TouchableOpacity>
        </View>
    )
}

export default AboutNews