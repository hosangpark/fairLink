import React,{useState,useEffect,SetStateAction} from 'react';

import {View,Text,FlatList, TouchableOpacity} from 'react-native';
import { CustomButton } from '../../../component/CustomButton';
import { BackHeader } from '../../../component/header/BackHeader';
import { UserInfoCard } from '../../../component/card/UserInfoCard';
import { UserInfoCardType } from '../../../component/componentsType';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { HeavyEquipmentCard } from '../../../component/card/HeavyEquipmentCard';
import { colors, fontStyle } from '../../../style/style';
import { AlertClearType } from '../../../modal/modalType';
import { AlertModal,initialAlert } from '../../../modal/AlertModal';
import { RecEmpModal } from '../../../modal/RecEmpModal';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { LoadingModal } from '../../../modal/LoadingModal';
import { toggleLoading } from '../../../redux/actions/LoadingAction';
import { usePostQuery } from '../../../util/reactQuery';
import { FavoriteListItemType, MyEquListItemType } from '../../screenType';
import { BackHandlerCom } from '../../../component/utils/BackHandlerCom';

export const FavoriteListIndex = () => {

    const {mt_type , mt_idx} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    // const [deletecard,setDeletecard] = useState<SetStateAction<any>>([])
    const [btnOpen,setBtnOpen] = useState(false)
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const deletecard:Array<string> = [];

    const {data:likeData, isLoading:likeLoading ,isError:likeError , refetch : getFavoriteRetch} = usePostQuery('getFavoriteList',{mt_idx:mt_idx},
        mt_type === '1' ? 'cons/cons_like_list.php' : 'equip/equip_info_list.php'
    );

    const [favoriteList, setFavoriteList] = React.useState<FavoriteListItemType[]>([]);
    const [equList, setEquList] = React.useState<MyEquListItemType[]>([]);
    const Addnavigation = () =>{
        if(mt_type == '1'){
            navigation.navigate('FavoriteAdd',{})
        } else {
            navigation.navigate('EquimentsAdd')
        }
        
    }

    const DeleteListUpdate = (e:string)=>{
        if(deletecard.includes(e)){
            console.log('on')
           for(var i = 0; i <= deletecard.length; i++){ 
            if (deletecard[i] === e) { 
                deletecard.splice(i, 1); 
                i--; 
            }
            }
        } else{
            deletecard.unshift(e)
        }
        if(deletecard.length > 0 ){
            setBtnOpen(true)
        } else {
            setBtnOpen(false)
        }
    }

    const alertModalOn = ( msg : string, type? : string ) => {
        
        setAlertModal({
            alert: true,
            strongMsg: '굴착기',
            msg: '를 삭제하시겠습니까?',
            type:'confirm',
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }
    


    React.useEffect(()=>{
        dispatch(toggleLoading(likeLoading));
        if(likeData){
            const bodyData = likeData.data.data;
            if(mt_type === '1'){
                setFavoriteList([...bodyData]);
            }
            else if(mt_type === '2'){
                setEquList([...bodyData]);
            }
        }
    },[likeData,likeLoading])

    React.useEffect(()=>{
        if(isFocused){
            getFavoriteRetch();
        }
    },[isFocused])

    return(
        <View style={{flex:1}}>
            <BackHeader title={mt_type === '1' ? '즐겨찾기 장비 관리' : '장비현황' } />
            <BackHandlerCom />
            <View style={{paddingHorizontal:20,flex:1}}>
                <CustomButton 
                    style={{marginVertical:20,}}
                    action={Addnavigation}
                    label={'장비 추가하기'}
                />
                {mt_type == '1'?
                <FlatList 
                    data={favoriteList}
                    style={{marginTop:10}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <View style={{paddingVertical:15}}>
                            <UserInfoCard 
                                index={String(index)}
                                item={item}
                                isDelete={true}
                                action={()=>{}}
                                isCheck={''}
                                refetch={getFavoriteRetch}
                            />
                            </View>
                        )
                    }}
                />
                :
                <FlatList 
                    data={equList}
                    style={{}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <HeavyEquipmentCard
                                item={item}
                                action={()=>{navigation.navigate('EquimentsDetail',{eit_idx:item.idx})}}
                                action2={()=>{()=>{}}}
                                refetch={getFavoriteRetch}
                            />
                        )
                    }}
                />
                }
            </View>
        {btnOpen &&
        <View style={{backgroundColor:colors.WHITE_COLOR,paddingVertical:15,paddingHorizontal:20}}>
            <TouchableOpacity style={{alignItems:'center',backgroundColor:colors.RED_COLOR,height:50,justifyContent:'center',borderRadius:4,borderWidth:1,borderColor:colors.RED_COLOR3}}
            onPress={()=>alertModalOn('테스트')}
            >
            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.RED_COLOR3}]}>장비 삭제</Text>
            </TouchableOpacity>
        </View>
        }
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            strongMsg={alertModal.strongMsg}
            hide={alertModalOff}
            type={alertModal.type}
            btnLabel={'현장개설하기'}
            action={()=>navigation.navigate('Board')}
        />
        {/* <RecEmpModal 
            show={true}
            hide={()=>{}}

        /> */}
        </View>
    )
}