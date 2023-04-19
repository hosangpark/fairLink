import React from 'react';
import {View} from 'react-native';
import { RegDocumentType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { EquPilotRegDoc } from './regDoc/EquPilotRegDoc';
import { colors } from '../../style/style';
import { ErectionRegDoc } from './regDoc/ErectionRegDoc';

export const RegDocument = ({route}:RegDocumentType) => {
    const {memberType} = route.params;


    return(
        <View style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
            <BackHeader title={`회원가입 : ${memberType === 0 ? '건설회사' : memberType === 1 ? '장비회사' : '조종사'}`}/>
            {memberType !== 0 ?
                <EquPilotRegDoc memberType={memberType}/>
                :
                <ErectionRegDoc memberType={memberType} />
            }
        </View>
    )
}