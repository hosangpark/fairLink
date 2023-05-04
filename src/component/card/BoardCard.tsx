import React from 'react';
import { Text, TouchableOpacity, View ,Image,StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { BoardCardType } from '../componentsType';
import { CustomButton } from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { useAppSelector } from '../../redux/store';
import { usePostMutation } from '../../util/reactQuery';

export const BoardCard = ({
    jobType,
    cat_idx,
    cot_idx,
    contract_idx,
    contract_check,
    start_date,
    end_date,
    location,
    crt_name,
    content,
    equip,
    career,
    apply_count,
    cardtitle,
    met_company,
    mct_company,
    match_type,
}:BoardCardType) => {
    const {mt_idx,mt_type} = useAppSelector(state=>state.userInfo)
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const FlowEvent = () =>{
        if(mt_type=='1' && cardtitle=="배차 모집중"){
            navigation.navigate('Volunteer',{cot_idx})
        } else if(mt_type=='4') {
            navigation.navigate('PilotProfile')
        } else {
            navigation.navigate('PilotProfile')
        }
    }

    
    const consListDeleteMutation = usePostMutation('consListDelete','cons/cons_order_delete.php')
    const equipListDeleteMutation = usePostMutation('equipListDelete','equip/equip_order_delete.php')
    const pilotListDeleteMutation = usePostMutation('pilotListDelete','pilot/pilot_order_delete.php')

  const BoardInfrom = async (): Promise<void> => {
        try {
            const idxParams = {
            /** mt_idx 임의입력 수정필요 */
                mt_idx : mt_idx,
                cot_idx:cot_idx,
            }
            const {result,data, msg} = 
            mt_type == '1'?  await consListDeleteMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipListDeleteMutation.mutateAsync(idxParams)
            :
            await pilotListDeleteMutation.mutateAsync(idxParams)

            if(result === 'true'){
                console.log("result",result)
                console.log("data",data.data)
                console.log("msg",msg)
            }
            else{
                console.log("else",result)
            }
        // }
        } catch(err) {
            console.log(err);
        }
    };
    
    return(
        <TouchableOpacity style={{margin:20}} onPress={()=>
        {
            if(cardtitle=="배차 모집중"){
                navigation.navigate('DetailField',{cot_idx:cot_idx})
            } else {
                navigation.navigate('DetailWork',{cot_idx:cot_idx,cat_idx:cat_idx})
            }
        }}
        >
            <View style={[styles.card2Wrapper]}>
                <View style={[styles.card2Location]}>
                    <Text style={[fontStyle.f_regular,{fontSize:16,marginRight:12,color:colors.FONT_COLOR_BLACK}]}>
                        {start_date}
                    </Text>
                    <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>
                        {location}
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
                    <View style={{flex:1,paddingRight:30}}>
                        <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8,}]} numberOfLines={1}>
                            {crt_name}</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                            {content}</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                            {equip}</Text>
                        {mt_type=='4' &&
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                            경력 {career}년 +</Text>
                        }
                    </View>
                    <TouchableOpacity style={[styles.card2Profile]} onPress={FlowEvent}>
                        <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>
                            {mt_type=='1'? '조종사':mt_type=='2'? '지원자':'장비회사'}</Text>
                        <Text style={[fontStyle.f_semibold,{fontSize:mt_type!=='4'? 20:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={2}>
                            {mt_type!=='4'? [apply_count]+'명':[met_company]}
                        </Text>
                        {mt_type !=='4' ?
                        <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>경력 {career}년+</Text>
                        :
                        <>
                        {mct_company?
                        <>
                        <Text style={[fontStyle.f_medium,{fontSize:14,color:colors.MAIN_COLOR}]}>건설회사</Text>
                        <Text style={[fontStyle.f_semibold,{fontSize:mt_type!=='4'? 20:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={2}>
                            {mct_company}
                        </Text>
                        </>
                        :
                        <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.ORANGE_COLOR}]}>선정전</Text>
                        }
                        </>
                        }
                        {}
                    </TouchableOpacity>
                </View>
                {mt_type !=="4" && cardtitle == "작업완료" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'작업일보 승인대기'}
                        action={()=>{navigation.navigate('WorkReport')}}
                    />
                }
                {mt_type !=="4" && cardtitle == "계약진행중" &&
                <>
                    {contract_check == "Y"?
                    <CustomButton
                    style={{}}
                    labelStyle={{fontSize:16}}
                    label={'계약서 확인'}
                    action={()=>{navigation.navigate('ElectronicContract',{cot_idx:cot_idx,cat_idx:cat_idx,
                    contract_idx:contract_idx,route_type:'Info2'})}}
                    />
                    :
                    <CustomButton
                    style={{}}
                    labelStyle={{fontSize:16}}
                    label={'계약서 작성'}
                    action={()=>{navigation.navigate('ElectronicContract',{cot_idx:cot_idx,cat_idx:cat_idx,
                    contract_idx:contract_idx,route_type:'Info2'})}}
                    />
                    }
                </>
                }
                {mt_type !=='4' && cardtitle == "배차 모집중" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'모집 취소'}
                        action={BoardInfrom}
                    />
                }
                {mt_type=='4' && cardtitle == "현장지원 완료" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'지원 취소'}
                        action={()=>{navigation.navigate('WorkReport')}}
                    />
                }
                {mt_type=='4' && cardtitle == "작업중/작업예정" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'작업일보 작성'}
                        action={()=>{navigation.navigate('WorkReport')}}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}
const BoardCardstyle = StyleSheet.create({

})