import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React,{ useEffect } from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { RouterNavigatorParams } from "../../../type/routerType";
import { RequestRouterNavigatorParams } from "../../../type/RequestRouterType";

export function BackHandlerCom ({goHome}:{goHome?:boolean}){

    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();

    function handleBackButtonClick() {
        if(!goHome){
            navigation.goBack();
            return true;
        }
        else{
            navigation.navigate('Home');
            return true;
        }
    }
      
    useEffect(() => {
        if(isFocused){
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
            return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
            };
        }
    }, [isFocused]);

    return (
        <>
        </>
    )
}