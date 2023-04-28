import React,{useState,useEffect, SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { CustomAccordion } from '../../component/CustomAccordion';
import { NodataView } from '../../component/NodataView';
import { CustomButton } from '../../component/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePostMutation } from '../../util/reactQuery';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { monthList } from '../../component/utils/list';


export const Board = ({route}:any) => {
    // const mt_type = "2"
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const [strOption,setStrOption] = useState<string>('전체')
    const [year,setYear] = useState<string>('')
    const [month,setMonth] = useState<string>('')
    const [listData,setListData] = useState<any>([])
    const dispatch = useAppDispatch();

const consBoardListMutation = usePostMutation('consBoardList','cons/cons_order_list.php')
const equipBoardListMutation = usePostMutation('equipBoardList','equip/equip_order_list.php')
const pilotBoardListMutation = usePostMutation('pilotBoardList','pilot/pilot_order_list.php')

  const BoardInfrom = async (): Promise<void> => {
        try {
            dispatch(toggleLoading(true));
            const idxParams = {
                // mt_idx : mt_idx,
                mt_idx : '17',
                year:year,
                month:month,
                status:'',
            }
            const {result,data, msg} = 
            mt_type == '1'?  await consBoardListMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipBoardListMutation.mutateAsync(idxParams)
            :
            await pilotBoardListMutation.mutateAsync(idxParams)

            if(result === 'true'){
                setListData(data.data)
                console.log("result",result)
                dispatch(toggleLoading(false));
            }
            else{
                console.log("else",result)
                dispatch(toggleLoading(false));
            }
        // }
        } catch(err) {
            console.log(err);
        }
    };

    
    useFocusEffect(
        React.useCallback(() => {
        BoardInfrom()
        return () => {}
        }, [strOption]),
    );

    return(
        <View style={{flex:1,}}>
        <BackHeader title="배차이력 및 현황" />
         <ScrollView style={{flex:1}}>
            <View style={{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,padding:20}}>
                <View style={{flexDirection:'row'}}>
                <View style={{flex:1,marginRight:10,marginBottom:20}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>연도
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={year}
                        strSetOption={setYear}
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
                        strOptionList={monthList()}
                        selOption={month}
                        strSetOption={setMonth}
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
                        strOptionList={
                        mt_type == '1'?
                        ['전체','배차 모집중','계약진행중','작업중','작업완료']:
                        mt_type == '2'?
                        ['전체','조종사 모집중','현장지원 완료','계약진행중','작업중 / 작업예정','작업완료']
                        :
                        ['전체','현장지원 완료','작업중 / 작업예정','작업완료']
                        }
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
            </View>
            {/* {listData.length > 0 ? }
            <></> */}
        {
            listData.map((data:{title:string}, i:number) => (
                <View key={i}>
                {strOption == '전체'?
                <CustomAccordion
                    key={i}
                    data={listData[i]}
                    userType={mt_type}
                    action={()=>{}}
                />
                :
                strOption == data.title &&
                <CustomAccordion
                    key={i}
                    data={listData[i]}
                    userType={mt_type}
                    action={()=>{}}
                />
                }
                </View>
            ))
        }
        {/* <FlatList
            data={accordionList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NodataView />}
            // ListFooterComponent={isListLoading ? <LoadingIndicator /> : null}
            renderItem={({ item,index} ) => (
              <CustomAccordion
                title={item}
                data={items}
                action={()=>{}}
                Accordionkey={index}
            />
            )}
          /> */}
            
            
        </ScrollView>
    </View>
    )
}