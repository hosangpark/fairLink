import React,{useState,useEffect, SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView, TouchableOpacity} from 'react-native';
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
import { dateConverter } from '../../util/func';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AlertModal, initialAlert } from '../../modal/AlertModal';


export const Board = ({setTabIndex}:BoardIndexType) => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const [strOption,setStrOption] = useState<string>('전체');
    const [year,setYear] = useState<string>(String(new Date().getFullYear()));
    const [month,setMonth] = useState<string>(String(new Date().getMonth()+1));
    const [listData,setListData] = useState<any>([])
    const dispatch = useAppDispatch();

    const consBoardListMutation = usePostMutation('consBoardList','cons/cons_order_list.php')
    const equipBoardListMutation = usePostMutation('equipBoardList','equip/equip_request_list.php')
    const pilotBoardListMutation = usePostMutation('pilotBoardList','pilot/pilot_request_list.php')

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOff = () =>{
        setAlertModal(()=>initialAlert);
    }
    const alertModalOn = (msg:string, type?:string) => {
        setAlertModal({
            ...alertModal,
            msg : msg,
            type : type ? type : ''
        });
    }
    const alertAction = () =>{
        if(alertModal.type === 'api_error'){
            navigation.navigate('Home');
        }
    }

  const BoardInfrom = async (): Promise<void> => { //배차이력 불러오기
        try {
            dispatch(toggleLoading(true));
            const idxParams = {
                mt_idx : mt_idx,
                year:year,
                month:Number(month) < 10 ? '0'+month : month,
                status:'',
            }
            const {result,data, msg} = 
            mt_type == '1'?  await consBoardListMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipBoardListMutation.mutateAsync(idxParams)
            :
            await pilotBoardListMutation.mutateAsync(idxParams)
            dispatch(toggleLoading(false));

            if(result === 'true'){
                setListData(data.data)
                // console.log("result",result)
                // console.log(data.data);
            }
            else{
                alertModalOn(msg,'api_error');
            }
        // }
        } catch(err) {
            dispatch(toggleLoading(false));
            alertModalOn(`예기치 못한 오류가 발생하였습니다. 고객센터에 문의해주세요.\n error_code : ${err}`,'api_error');
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            if(setTabIndex)setTabIndex(3);
            BoardInfrom()
            return () => {}
        }, [strOption,year,month]),
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
                        strOptionList={['2020','2021','2022','2023']}
                        selOption={year}
                        strSetOption={setYear}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        labelFooter='년'
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
                        labelFooter='월'
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
                    refetch={BoardInfrom}
                />
                :
                strOption == data.title &&
                <CustomAccordion
                    key={i}
                    data={listData[i]}
                    userType={mt_type}
                    action={()=>{}}
                    refetch={BoardInfrom}
                />
                }
                </View>
            ))
        }
        </ScrollView>
        <AlertModal 
            show={alertModal.alert}
            msg={alertModal.msg}
            hide={alertModalOff}
            action={alertAction}
            type={alertModal.type}
        />
    </View>
    )
}