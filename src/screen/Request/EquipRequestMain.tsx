import React from 'react';

import {View,Text,ScrollView} from 'react-native';
import { BackHeader } from '../../component/header/BackHeader';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePostMutation } from '../../util/reactQuery';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { getEquStaDetailCon, getEquipListConverter, getEquipStandConverter, locationList } from '../../component/utils/list';
import { colors, fontStyle, selectBoxStyle, styles } from '../../style/style';
import { FlatList } from 'react-native-gesture-handler';
import { MarginCom } from '../../component/MarginCom';
import { DispatchCard } from '../../component/card/DispatchCard';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { EquipOrderItemType } from '../screenType';
import { useIsFocused } from '@react-navigation/native';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';
import AsyncStorage from '@react-native-community/async-storage';
import { updateUserInfo } from '../../redux/actions/UserInfoReducer';

interface Inputtype {
    sel_location : string,
    sel_type : string,
    sel_stand1 : string,
    sel_stand2 : string,
    sel_price_type : string
}

export const EquipRequestMain = () => {

    const dispatch = useAppDispatch();

    const {mt_idx, mt_type,location:mt_location} = useAppSelector(state => state.userInfo);
    const userInfo = useAppSelector(state => state.userInfo)

    const getEquOrderListMutation = usePostMutation('getEquOrderList',mt_type === '2' ? 'equip/equip_order_list.php' : 'pilot/pilot_order_list.php');
    const getEquipListMutation = usePostMutation('getEquipList','/equip_filter.php');

    const initialInputInfo = {
        location : mt_location,
        type : '',
        stand1 : '',
        stand2 : '',
        price_type : '일대'
    }

    const [inputInfo, setInputInfo] = React.useState(()=>initialInputInfo) //검색시 필요한 아이템
    const [page, setPage] = React.useState(1);
    const [equipMainList, setEquipMainList] = React.useState<object[]>([]); //장비리스트
    const [orderList, setOrderList] = React.useState<EquipOrderItemType[]>([]);

    const isFocused = useIsFocused();

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg : string, type? : string) =>{
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:msg,
            type : type ? type : '',
        })
    }

    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {
        
    }



    const inputHandler = (text:string, type?:string) =>{
        if(type){
            setInputInfo({
                ...inputInfo,
                [type]:text,
            })
        }
    }

    const getEquipList = async () => { //장비 리스트 불러오기
        dispatch(toggleLoading(true))
        const {data} = await getEquipListMutation.mutateAsync({});
        dispatch(toggleLoading(false))

        setEquipMainList(data.data);
    }

    const getEquipOrderList = async () => {
        const params = {
            mt_idx : mt_idx,
            ...inputInfo,
            pg : page,
            price_type : inputInfo.price_type === '일대' ? 'Y' : 'N'
        }

        dispatch(toggleLoading(true));
        const {data , result, msg} = await getEquOrderListMutation.mutateAsync(params);
        dispatch(toggleLoading(false));
        if(result === 'true'){
            setOrderList([...data.data]);
        }
        else{
            setInputInfo(()=>initialInputInfo);
            alertModalOn(msg,'');
        }
        
    }

    React.useEffect(()=>{
        AsyncStorage.getItem('Supprtinfo').then(item=> {
            // console.log('item',JSON.parse(item))
            // console.log('item',(item))
            if(item){
                setInputInfo(JSON.parse(item))
            }
        })
    },[])

    React.useEffect(()=>{
        if(isFocused){
            getEquipList();
            if(inputInfo.stand2 !== ''){
                getEquipOrderList();
            }
        }
    },[isFocused])

    React.useEffect(()=>{
        if(inputInfo.type !== ''){
            setInputInfo({
                ...inputInfo,
                stand1 : '',
                stand2 : '',
            })
        }
    },[inputInfo.type])

    React.useEffect(()=>{
        setInputInfo({
            ...inputInfo,
            stand2 : '',
        })
    },[inputInfo.stand1])

    React.useEffect(()=>{
        if(inputInfo.stand2 !== ''){
            getEquipOrderList();
        }
    },[inputInfo.stand2,inputInfo.price_type])

    React.useEffect(()=>{
        let params:any = {
                location:inputInfo.location,
                type:inputInfo.type,
                stand1:inputInfo.stand1,
                stand2:inputInfo.stand2,
                price_type:inputInfo.price_type,
            }
        // let params:any = {
        //     ...userInfo,
        //     sel_location:inputInfo.location,
        //     sel_type:inputInfo.type,
        //     sel_stand1:inputInfo.stand1,
        //     sel_stand2:inputInfo.stand2,
        //     sel_price_type:inputInfo.price_type
        // }
        
        // dispatch(updateUserInfo({
        //     ...userInfo,
        //     params}));
        AsyncStorage.setItem('Supprtinfo',JSON.stringify(params))
    },[inputInfo.location,inputInfo.type,inputInfo.stand1,inputInfo.stand2,inputInfo.price_type])

    return(
        <View style={{flex:1}}>
            <BackHeader title="현장지원하기" />
            <BackHandlerCom />
            <ScrollView style={{flex:1}}>
                <View style={[styles.white_box_con]}>
                    <CustomSelectBox
                        title={'지역'}
                        strOptionList={locationList}
                        strSetOption={inputHandler}
                        selOption={inputInfo.location}
                        type={'location'}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText='지역을 선택하세요.'
                    />
                    <MarginCom mt={10} />
                    <CustomSelectBox 
                        strOptionList={getEquipListConverter(equipMainList)}
                        strSetOption={inputHandler}
                        selOption={inputInfo.type}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText='장비 종류 선택'
                        type={'type'}
                        title={'장비 종류'}
                        essential
                    />
                    <MarginCom mt={10} />
                    <CustomSelectBox 
                        strOptionList={getEquipStandConverter(equipMainList,inputInfo.type) ? getEquipStandConverter(equipMainList,inputInfo.type) : ['선택하세요.']}
                        strSetOption={inputHandler}
                        selOption={inputInfo.stand1}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText={inputInfo.type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                        type={'stand1'}
                        title={'장비 규격'}
                        essential
                        isDisable={inputInfo.type === ''}
                    />
                    <MarginCom mt={10} />
                    <View style={{flexDirection:'row',}}>
                        <CustomSelectBox 
                            strOptionList={getEquStaDetailCon(equipMainList,inputInfo.type,inputInfo.stand1) ? getEquStaDetailCon(equipMainList,inputInfo.type,inputInfo.stand1) : ['선택하세요.']}
                            strSetOption={inputHandler}
                            selOption={inputInfo.stand2}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            defaultText={inputInfo.stand1 === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                            type={'stand2'}
                            title={'장비 상세 규격'}
                            essential
                            isDisable={inputInfo.stand1 === ''}
                        />
                        <CustomSelectBox
                            containerStyle={{marginLeft:10,flex:1}}
                            title={'지급'}
                            strOptionList={['일대','월대']}
                            strSetOption={inputHandler}
                            selOption={inputInfo.price_type}
                            type={'price_type'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            defaultText=''
                        />
                    </View>
                </View>
                <MarginCom mt={20} />
                <View style={{paddingHorizontal:20}}>
                    {inputInfo.stand2 !== '' &&
                        <>
                        {orderList.length === 0 ? 
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>생성된 현장이 존재하지 않습니다.</Text>
                            </View>
                        :
                            orderList.map((item:EquipOrderItemType,index:number) => {
                                return(
                                    <View key={index}>
                                        <DispatchCard 
                                            item={item}
                                        />
                                        <MarginCom mb={20} />
                                    </View>
                                )
                            })
                        }
                        </>
                    }
                    
                </View>
            </ScrollView>
            {/* <ScrollView style={{flex:1}}> */}
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={alertModalOff}
                action={alertAction}
            />
        </View>
    )
}