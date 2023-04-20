import React from 'react';
import {View,ScrollView} from 'react-native';
import { RegDocumentType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { EquRegDoc } from './regDoc/EquRegDoc';
import { colors } from '../../style/style';
import { ErectionRegDoc } from './regDoc/ErectionRegDoc';

export const RegDocument = ({route}:RegDocumentType) => {
    const {memberType,fileCheck,mt_idx} = route.params;



    return(
        <View style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
            <BackHeader title={`회원가입 : ${memberType === 0 ? '건설회사' : memberType === 1 ? '장비회사' : '조종사'}`}/>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1}}>
                    {memberType !== 0 ?
                        <EquRegDoc fileCheck={fileCheck} memberType={memberType} mt_idx={mt_idx}/>
                        :
                        <ErectionRegDoc memberType={memberType} fileCheck={fileCheck} mt_idx={mt_idx} />
                    }
                </View>
            </ScrollView>
        </View>
    )
}