import React from 'react';
import {View,ScrollView} from 'react-native';
import { RegDocumentType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { EquPilotRegDoc } from './regDoc/EquPilotRegDoc';
import { colors } from '../../style/style';
import { ErectionRegDoc } from './regDoc/ErectionRegDoc';
import { usePostMutation } from '../../util/reactQuery';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler } from "react-native";

export const RegDocument = ({route}:RegDocumentType) => {
    const {memberType,fileCheck,mt_idx,mt_id} = route.params;
    const isFocused = useIsFocused();
    const userInfoDelMutation = usePostMutation('userInfoDel','member/member_delete.php');

    const handleBackButtonClick = () => {
        return true;
    }

    React.useEffect(() => {
        if(isFocused){
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
            return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
            };
        }
    }, [isFocused]);

    return(
        <View style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
            <BackHeader backAction={()=>{}} isBtnHide={true} title={`회원가입 : ${memberType === 0 ? '건설회사' : memberType === 1 ? '장비회사' : '조종사'}`}/>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1}}>
                    {memberType !== 0 ?
                        <EquPilotRegDoc mt_id={mt_id} fileCheck={fileCheck} memberType={memberType} mt_idx={mt_idx}/>
                        :
                        <ErectionRegDoc mt_id={mt_id} memberType={memberType} fileCheck={fileCheck} mt_idx={mt_idx} />
                    }
                </View>
            </ScrollView>
        </View>
    )
}