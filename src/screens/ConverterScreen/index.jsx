import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View,ScrollView, Text,Image,StyleSheet, Linking,TouchableOpacity } from "react-native";
import {getNews} from "../../service/requests";
import {green} from "react-native-reanimated/src/reanimated2/Colors";
import { useNavigation } from "@react-navigation/native";
import CoinItem from "../../components/CoinItem";
import ContentLoader, {BulletList, Circle, Rect} from 'react-content-loader/native'
import MyLoader from "../../components/Loading";
import NewsItem from "../../components/NewsItem";

const ConverterScreen = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)


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

    const fetchNews = async () => {
        if (loading){
            return;
        }
        setLoading(true)
        const fetchedNewsData = await getNews();
        setNews(fetchedNewsData.articles)
        setLoading(false)
    }

    const refresh = async () => {
        if (loading){
            return;
        }
        setLoading(true)
        const fetchedNewsData = await getNews();
        setNews(fetchedNewsData.articles)
        setLoading(false)
    }
    useEffect(()=>{
        fetchNews()
    },[])

    const MyBulletListLoader = () => <BulletList />
    return(
        <View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',marginLeft: 10}}>
                <Image
                    style={{width: 50, height: 50}}
                    source={{
                        uri: 'https://cdn.discordapp.com/attachments/771761528739069962/958792670787014716/FGWnEOWWQAEi0CS-removebg-preview.png'
                    }}
                    resizeMode = 'contain'
                />
                <Text style={{ fontFamily: 'DroidSans', color: "white", fontSize: 25, letterSpacing: 1, paddingBottom: 5,marginLeft: 10 }}>News</Text>
            </View>
            {loading ?
                (
                    <MyLoader/>
                )
                :
                (
                <View style={{ padding: 10 }}>
                    <FlatList
                        data={news}
                        renderItem={({ item }) => <NewsItem newsData={item}/>}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                tintColor="white"
                                onRefresh={refresh}
                            />
                        }
                    />
                    {/*{*/}
                    {/*    news?.articles?.map((item, index) => (*/}
                    {/*            <View*/}
                    {/*                style={{border: '2px solid #fff', backgroundColor: 'gray', borderRadius: 10, padding: 15,marginBottom: 20}}*/}
                    {/*                key={index}*/}
                    {/*            >*/}
                    {/*                <ScrollView*/}
                    {/*                >*/}
                    {/*                    <TouchableOpacity*/}
                    {/*                        style={{display: 'flex',flexDirection:'row', alignItems: "center", marginBottom: 10}}*/}
                    {/*                        onPress={() => navigation.navigate("AboutNews", {Item: item})}*/}
                    {/*                    >*/}
                    {/*                        <Image*/}
                    {/*                            style={styles.tinyLogo}*/}
                    {/*                            source={{*/}
                    {/*                                uri: item.urlToImage*/}
                    {/*                            }}*/}
                    {/*                        />*/}
                    {/*                        <Text style={{ color: 'white',flex: 1, marginLeft: 10 }}>{item.title}</Text>*/}
                    {/*                    </TouchableOpacity>*/}
                    {/*                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => Linking.openURL(item.url)}>*/}
                    {/*                        <Text style={{color: '#fff'}}>Источник:</Text>*/}
                    {/*                        <Text*/}
                    {/*                            style={{color: '#00FF7F'}}*/}
                    {/*                        > {item.source.name}</Text>*/}
                    {/*                    </TouchableOpacity>*/}
                    {/*                </ScrollView>*/}
                    {/*            </View>*/}
                    {/*    ))*/}
                    {/*}*/}
                </View>
            )}
        </View>
    )
}
export default ConverterScreen;
