import React, { useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Linking,
    TouchableOpacity,
    Modal
} from "react-native";
import {getNews} from "../../service/requests";
import { useNavigation } from "@react-navigation/native";
import CoinItem from "../../components/CoinItem";
import ContentLoader, {BulletList, Circle, Rect} from 'react-content-loader/native'
import MyLoader from "../../components/Loading";
import NewsItem from "../../components/NewsItem";
import {AntDesign} from "@expo/vector-icons";
import RadioForm from "react-native-simple-radio-button";

const ConverterScreen = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [source, setSource] = useState("us")

    const radio_props = [
        {label: 'English Source', value: 'us' },
        {label: 'Русский источник', value: 'ru' }
    ]

    const insertCurrency = (value) => {
        setSource(value)
    }


    const styles = StyleSheet.create({
        tinyLogo: {
            borderRadius: 50,
            width: 50,
            height: 50,
        },
        greenText: {
            color: '#fff'
        },
        container:{
            paddingHorizontal: 15,
        },
        modalToggle: {
            marginTop: 30,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#f2f2f2',
            padding: 10,
            borderRadius: 10,
            alignSelf: 'center',
        },
        text: {
            color: "#000",
            fontSize: 24,
            marginBottom: 15
        }
    });

    const navigation = useNavigation();

    const fetchNews = async () => {
        if (loading){
            return;
        }
        setLoading(true)
        const fetchedNewsData = await getNews(source);
        setNews(fetchedNewsData.articles)
        setLoading(false)
    }

    const refresh = async () => {
        if (loading){
            return;
        }
        setLoading(true)
        const fetchedNewsData = await getNews(source);
        setNews(fetchedNewsData.articles)
        setLoading(false)
    }
    useEffect(()=>{
        fetchNews()
    },[])

    const MyBulletListLoader = () => <BulletList />
    return(
        <View>
            <Modal visible={modalOpen} animationType="slide">
                <View style={styles.container}>
                    <AntDesign
                        name="close"
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setModalOpen(false)}
                    />
                    <Text
                        style={styles.text}
                    >Сменить источник новостей</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={source === "us" ? 0 : source === "ru" ? 1 : 0}
                        formHorizontal={true}
                        onPress={value => insertCurrency(value)}
                        labelStyle={{fontSize: 13, color: '#000',marginRight: 20}}
                    />
                </View>
            </Modal>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between",marginLeft: 10}}>
                <View style={{
                    alignItems: 'center',flexDirection: "row"
                }}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{
                            uri: 'https://cdn.discordapp.com/attachments/771761528739069962/958792670787014716/FGWnEOWWQAEi0CS-removebg-preview.png'
                        }}
                        resizeMode = 'contain'
                    />
                    <Text style={{ fontFamily: 'DroidSans', color: "white", fontSize: 25, letterSpacing: 1, paddingBottom: 5,marginLeft: 10 }}>News</Text>
                </View>
                <TouchableOpacity
                    style={{alignItems: 'center', justifyContent: "center", marginRight: 10}}
                    onPress={() => setModalOpen(true)}
                >
                    <AntDesign name="setting" size={24} style={{color: "#fff",}}/>
                </TouchableOpacity>
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
