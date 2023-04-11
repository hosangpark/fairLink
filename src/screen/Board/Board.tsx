import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CustomAccordion } from '../../component/CustomAccordion';
import { ScrollView } from 'react-native-gesture-handler';

export const Board = ({setTabIndex}:BoardIndexType) => {
    const [strOption,setStrOption] = useState<string>('')

    const isFocused = useIsFocused();
    useEffect(()=>{
        if(isFocused && setTabIndex){
            setTabIndex(3);
        }
    },[])
    return(
         <View style={{flex:1}}>
            <BackHeader title="배차이력 및 현황" />
            <View style={{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,padding:20}}>
                <View style={{flexDirection:'row'}}>
                <View style={{flex:1,marginRight:10,marginBottom:20}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>연도
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>월
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['1월','2월','3월','4월',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                </View>
                <View style={{marginBottom:6}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>배차상태
                    </Text>
                    <CustomSelectBox 
                        defaultText='전체'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
            </View>
            <CustomAccordion
                title={'배차 모집중'}
                total={4}
                action={()=>{}}
            />
            
        </View>
    )
}