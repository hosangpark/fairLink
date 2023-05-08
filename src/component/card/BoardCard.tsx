import React from 'react';
import { Text, TouchableOpacity, View ,Image,StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { CustomButton } from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { useAppSelector } from '../../redux/store';
import { usePostMutation } from '../../util/reactQuery';
import { pilotCareerList } from '../utils/list';

export interface BoardCardItemType {
    apply_count? : number, //지원자수
    pilot_name?:string, //조종사 배치후 조종사 이름
    carrer : string,
    cat_idx : string,
    cot_idx : string, 
    start_date : string, //시작일
    end_date : string, //종료일
    location : string, //위치
    crt_name : string, //작업이름
    content : string, //작업내용
    equip : string, //장비정보
    career : string, //경력
    contract_idx : string,
    title : string,
    contract_check : string,
    met_company : string, //회사 이름
    mct_company : string,  //회사이름
}

type BoardCardType = {
    item : BoardCardItemType,
    title : string,
}


export const BoardCard = ({
    item,
    title,
}:BoardCardType) => {
    const {mt_idx,mt_type} = useAppSelector(state=>state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const FlowEvent = () =>{
        if(mt_type=='1' && title=="배차 모집중"){
            navigation.navigate('Volunteer',{cot_idx : item?.cot_idx})
        } 
        else if(mt_type === '2' && (title === '조종사 모집중' || title === '현장지원 완료')){
            navigation.navigate('Volunteer' , {cat_idx : item?.cat_idx})
        }
        else if(mt_type=='4') {
            navigation.navigate('PilotProfile',{cat_idx : item?.cat_idx})
        } else {
            console.log(item);
            navigation.navigate('PilotProfile', {cat_idx : item?.cat_idx})
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
                cot_idx:item?.cot_idx,
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
            if(title=="배차 모집중"){
                navigation.navigate('DetailField',{cot_idx:item.cot_idx,cat_idx:item.cat_idx})
            } else {
                navigation.navigate('DetailWork',{cot_idx:item.cot_idx,cat_idx:item.cat_idx})
            }
        }}
        >
            <View style={[styles.card2Wrapper]}>
                <View style={[styles.card2Location]}>
                    <Text style={[fontStyle.f_regular,{fontSize:16,marginRight:12,color:colors.FONT_COLOR_BLACK}]}>
                        {item.start_date}
                    </Text>
                    <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>
                        {item.location}
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
                    <View style={{flex:1,paddingRight:30}}>
                        <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8,}]} numberOfLines={1}>
                            {item.crt_name}</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                            {item.content}</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                            {item.equip}</Text>
                        {mt_type=='4' &&
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                            경력 {pilotCareerList[Number(item.career)]}+</Text>
                        }
                    </View>
                    <TouchableOpacity style={[styles.card2Profile]} onPress={FlowEvent}>
                        <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>
                            {mt_type == '1'? 
                                title === '배차 모집중' ? '지원자' : '조종사'
                            :
                                (title === '조종사 모집중' || title === '현장지원 완료') ? '지원자' : '조종사'
                            }
                        </Text>
                        <Text style={[fontStyle.f_semibold,{fontSize:mt_type!=='4'? 20:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={2}>
                            {mt_type === '1' ? 
                                title === '배차 모집중' ? [item.apply_count]+'명': item.pilot_name 
                            :
                                (title === '조종사 모집중' || title === '현장지원 완료') ? [item.apply_count]+'명':  item.pilot_name
                            // mt_type!=='4'? [item.apply_count]+'명':[item.met_company]
                            
                            }
                        </Text>
                        {mt_type !=='4' ?
                            <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>경력 {pilotCareerList[Number(item.career)]}+</Text>
                        :
                        <>
                            {item.mct_company?
                                <>
                                    <Text style={[fontStyle.f_medium,{fontSize:14,color:colors.MAIN_COLOR}]}>건설회사</Text>
                                    <Text style={[fontStyle.f_semibold,{fontSize:mt_type!=='4'? 20:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={2}>
                                        {item.mct_company}
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
                {mt_type !=="4" && title == "작업완료" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'작업일보 승인대기'}
                        action={()=>{navigation.navigate('WorkReport')}}
                    />
                }
                {mt_type !=="4" && title == "계약진행중" &&
                <>
                    {item.contract_check == "Y"?
                    <CustomButton
                    style={{}}
                    labelStyle={{fontSize:16}}
                    label={'계약서 확인'}
                    action={()=>{navigation.navigate('ElectronicContract',{cot_idx:item.cot_idx,cat_idx:item.cat_idx,
                    contract_idx:item.contract_idx,route_type:'Info2'})}}
                    />
                    :
                    <CustomButton
                    style={{}}
                    labelStyle={{fontSize:16}}
                    label={'계약서 작성'}
                    action={()=>{navigation.navigate('ElectronicContract',{cot_idx:item.cot_idx,cat_idx:item.cat_idx,
                    contract_idx:item.contract_idx,route_type:'Info2'})}}
                    />
                    }
                </>
                }
                {mt_type !=='4' && title == "배차 모집중" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'모집 취소'}
                        action={BoardInfrom}
                    />
                }
                {mt_type=='4' && title == "현장지원 완료" &&
                    <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'지원 취소'}
                        action={()=>{navigation.navigate('WorkReport')}}
                    />
                }
                {mt_type=='4' && title == "작업중/작업예정" &&
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