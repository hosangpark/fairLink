import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { UserInfoCard2Type } from '../componentsType';
import { CustomButton } from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';

export const UserInfoCard2 = ({
    jobType = '',
    userName = '',
    score = 0,
    location = '',
    complete='',
    workType=0,
}:UserInfoCard2Type) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    return(
        <TouchableOpacity style={{margin:20}} onPress={()=>
            {if(workType==0){
                navigation.navigate('DetailField')
            } else {navigation.navigate('DetailWork')}
        }}
        >
            <View style={[styles.card2Wrapper]}>
                <View style={[styles.card2Location]}>
                    <Text style={[fontStyle.f_regular,{fontSize:16,marginRight:12,color:colors.FONT_COLOR_BLACK}]}>
                        23.03.07
                    </Text>
                    <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>
                        {location}
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
                    <View style={{flex:1,paddingRight:30}}>
                        <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,marginBottom:8,}]} numberOfLines={1}>길동고등학교 창호보수</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={1}>창호 철거 및 교체</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={1}>스카이 43m</Text>
                    </View>
                    <TouchableOpacity style={[styles.card2Profile]} onPress={()=>navigation.navigate('Volunteer')}>
                        <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>
                            {jobType=='1'? '조종사':'사종조'}</Text>
                        <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={1}>{userName}</Text>
                        <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>경력 {score}년+</Text>
                    </TouchableOpacity>
                </View>
                {complete&&
                    <CustomButton 
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'작업일보 승인대기'}
                        action={()=>{navigation.navigate('WorkReport')}}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}