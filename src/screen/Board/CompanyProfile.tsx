import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomButton } from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';



export const CompanyProfile = () => {
        const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    return(
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <BackHeader title="장비회사 프로필" />

          
            <CustomButton
              style={{flex:1,height:60,alignItems:'center',justifyContent:'center'}}
              labelStyle={[{fontSize:18}]}
              label={'장비회사 선정'}
              action={()=>{navigation.navigate('ElectronicContract')}}
            />
        </ScrollView>
    )
}

const CompanyProfilestyle = StyleSheet.create({

})