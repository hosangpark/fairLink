import React from 'react';
import { DispatchInfoItemType, LastDispatchModalType } from './modalType';
import {Pressable,View,Text, TouchableOpacity,Image} from 'react-native';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import { colors, fontStyle, modalStyle, styles } from '../style/style';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButton } from '../component/CustomButton';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { usePostQuery } from '../util/reactQuery';
import { toggleLoading } from '../redux/actions/LoadingAction';
import { useIsFocused } from '@react-navigation/native';

type lastDisItemType = {
    cot_idx : string,
    crt_name : string,
    start_date : string,
    end_date : string,
    content: string,
    equip:string,
    compnay : string,
    pilot : string,
}

type DispatchInfoType = {
    item : lastDisItemType,
    index : string,
    selDispatch : string,
    setSelDispatch : (check : boolean , selIdx:string) => void;
}



const DispatchHeader = ({hide}:{hide:()=>void})=>{
    return(
        <View style={{width:'100%'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>최근 배차정보 불러오기</Text>
                <TouchableOpacity onPress={hide}>
                    <Image source={require('../assets/img/ic_x.png')} style={{width:15,height:15}} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:10,}}>
                <Text style={[fontStyle.f_regular,{color:colors.MAIN_COLOR,fontSize:16,marginRight:3}]}>*</Text>
                <Text style={[fontStyle.f_regular,{color:colors.MAIN_COLOR,fontSize:16,flexShrink:1}]}>선택한 이전 배차의 작업정보 및 대금정보가 현재 배차요청에 적용됩니다.</Text>
            </View>
        </View>
    )
} 

const DispatchInfo = ({
    item,
    index,
    selDispatch,
    setSelDispatch
}:DispatchInfoType) => {
    return (
        <TouchableOpacity
            onPress={()=>{
                setSelDispatch(!selDispatch.includes(index), index)
            }} 
            style={[styles.cardWrapper,styles.border,{paddingVertical:0,paddingHorizontal:0,marginBottom:20}]}
        >
            <View style={[styles.bottomBorder,{padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox
                        disabled={false}
                        value={selDispatch.includes(index) ? true : false}
                        onValueChange={(e) => setSelDispatch(e, index)}
                        tintColors={{ true: colors.MAIN_COLOR }}
                        style={{ width: 24, height: 24 ,marginRight:8}}
                    />
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]} numberOfLines={1}>{item.crt_name}</Text>
                </View>
                <View>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>{item.start_date}</Text>
                </View>
            </View>
            <View style={[styles.bottomBorder,{padding:10,paddingLeft:15}]}>
                <View style={[{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>작업내용</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>{item.content}</Text>
                </View>
                <View style={[{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>장비규격 및 종류</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK,flexShrink:1,marginLeft:10,textAlign:'right'}]}>{item.equip}</Text>
                </View>
                <View style={[{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>장비회사</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>{item.compnay}</Text>
                </View>
                <View style={[{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>조종사</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>{item.pilot === null ? '-' : item.pilot}</Text>
                </View>
            </View>
            <View style={{backgroundColor:colors.BORDER_GRAY_COLOR,borderBottomLeftRadius:8,borderBottomRightRadius:8,padding:10,paddingLeft:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>계약상대자</Text> 
                <Text>{item.crt_name}</Text> 
            </View>
        </TouchableOpacity>
    )
}



export const LastDispatchInfoModal = ({ //최근 배차목록 modal
    show,
    hide,
    action,
    type,
}:LastDispatchModalType) => {

    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
    const [selDispatch, setSelDispatch] = React.useState<string>('');

    const [lastList, setLastList] = React.useState<lastDisItemType[]>([]);



    const {data: disData, isLoading : disLoading , isError : disError, refetch : disRefetch} = usePostQuery('getLastOrder',{type:type,mt_idx:'17'},'cons/cons_order_prev_list.php')


    const handleSingleCheck = (checked:boolean, id:string) => {
        if (checked) {
            setSelDispatch(id);
        } 
        // else {
        //     setSelDispatch('');
        // }
    };

    const tempInfoList = [
        {
            id:'1',
            location : '여수',
            title : '여수중학교 도장공사',
            date : '01.10',
            contents : '1층 보수도장',
            kind : '45m 스카이',
            company : '장비회사',
            pilot : '김경태',
            contract : '김경태',
        },
        {
            id:'2',
            location : '부산',
            title : '부산중학교 도장공사',
            date : '01.10',
            contents : '2층 보수도장',
            kind : '45m 스카이',
            company : '장비회사',
            pilot : '김한호',
            contract : '김한호',
        },
        {
            id:'3',
            location : '서울',
            title : '서울중학교 도장공사',
            date : '01.10',
            contents : '3층 보수도장',
            kind : '45m 스카이',
            company : '장비회사',
            pilot : '김한호',
            contract : '김한호',
        },
        {
            id:'4',
            location : '대구',
            title : '대구중학교 도장공사',
            date : '01.10',
            contents : '4층 보수도장',
            kind : '45m 스카이',
            company : '장비회사',
            pilot : '김한호',
            contract : '김한호',
        },
    ]

    React.useEffect(()=>{
        dispatch(toggleLoading(disLoading));

        if(disData){
            // console.log(disData);
            setLastList([...disData.data.data]);
        }
    },[disData, disLoading, disError])

    React.useEffect(()=>{
        if(isFocused && show){
            disRefetch();
        }
    },[isFocused])

    return(
        <Modal 
                animationIn  ={"slideInUp"}
                animationOut ={"slideOutDown"}
                animationInTiming  = {300}
                animationOutTiming = {300}
                isVisible={show}
                useNativeDriver={true}
                style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
                onBackdropPress={hide}
        >
                <View style={[modalStyle.modalWrapper,modalStyle.lastDispatchModal,{maxHeight:'90%'}]}>
                    <DispatchHeader hide={hide} />
                    <FlatList
                        style={{width:'100%',zIndex:10,marginTop:20}}
                        renderItem={({item,index})=>{
                            return(
                                <DispatchInfo 
                                    item={item}
                                    index={String(index+1)}
                                    selDispatch={selDispatch}
                                    setSelDispatch={handleSingleCheck}
                                />
                            )
                        }} 
                        data={lastList}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={{width:'100%',marginTop:20}}>
                        <CustomButton 
                            label={'선택완료'}
                            action={(()=>{
                                // if(action)action();
                                // console.log(lastList[Number(selDispatch)-1]);
                                if(action)action(lastList[Number(selDispatch)-1].cot_idx);
                                hide();
                            })}
                        />
                    </View>
                </View>
        </Modal>
    )
}