import React from 'react';

import {View,Text,ScrollView} from 'react-native';
import { BackHeader } from '../../component/header/BackHeader';
import { useAppSelector } from '../../redux/store';
import { usePostMutation } from '../../util/reactQuery';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { getEquStaDetailCon, getEquipListConverter, getEquipStandConverter, locationList } from '../../component/utils/list';
import { selectBoxStyle, styles } from '../../style/style';
import { FlatList } from 'react-native-gesture-handler';
import { MarginCom } from '../../component/MarginCom';
import { DispatchCard } from '../../component/card/DispatchCard';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { EquipOrderItemType } from '../screenType';

export const EquipRequestMain = () => {

    const {mt_idx, mt_type,location:mt_location} = useAppSelector(state => state.userInfo);

    const getEquOrderListMutation = usePostMutation('getEquOrderList','equip/equip_order_list.php');
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
        const {data} = await getEquipListMutation.mutateAsync({});

        setEquipMainList(data.data);
    }

    const getEquipOrderList = async () => {
        const params = {
            mt_idx : mt_idx,
            ...inputInfo,
            pg : page,
            price_type : inputInfo.price_type === '일대' ? 'Y' : 'N'
        }

        const {data , result, msg} = await getEquOrderListMutation.mutateAsync(params);

        console.log(params);
        if(result === 'true'){
            setOrderList([...data.data]);
        }
        else{
            setInputInfo(()=>initialInputInfo);
            alertModalOn(msg,'');
        }
        
    }

    React.useEffect(()=>{
        getEquipList();
    },[])

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

    return(
        <View style={{flex:1}}>
            <BackHeader title="현장지원하기" />
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
                    {orderList.map((item:EquipOrderItemType,index:number) => {
                        return(
                            <View key={index}>
                                <DispatchCard 
                                    item={item}
                                />
                                <MarginCom mb={20} />
                            </View>
                        )
                    })}
                    
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