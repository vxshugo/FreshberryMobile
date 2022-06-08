import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import {View} from "react-native";
import LottieView from "lottie-react-native";

const MyLoader = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200}}>
        <LottieView
            source={require('../../../assets/loading.json')}
            style={{width: 300, height: 300}}
            autoPlay
        />
    </View>
)

export default MyLoader