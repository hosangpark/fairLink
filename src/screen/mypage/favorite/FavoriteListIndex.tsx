import React,{useState,useEffect,SetStateAction} from 'react';

import {View,Text,FlatList, TouchableOpacity} from 'react-native';
import { CustomButton } from '../../../component/CustomButton';
import { BackHeader } from '../../../component/header/BackHeader';
import { UserInfoCard } from '../../../component/card/UserInfoCard';
import { UserInfoCardType } from '../../../component/componentsType';
import { useNavigation } from '@react-navigation/native';
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
import { FavoriteListItemType } from '../../screenType';

export const FavoriteListIndex = ({route}:any) => {

    const {mt_type , mt_idx} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    // const [deletecard,setDeletecard] = useState<SetStateAction<any>>([])
    const [btnOpen,setBtnOpen] = useState(false)
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const deletecard:Array<string> = [];

    const {data:likeData, isLoading:likeLoading ,isError:likeError} = usePostQuery('getFavoriteList',{mt_idx:'17'},'cons/cons_like_list.php')

    const [favoriteList, setFavoriteList] = React.useState<FavoriteListItemType[]>([]);
    const Addnavigation = () =>{
        if(route.params.userType == '1'){
            navigation.navigate('FavoriteAdd')
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

    // useEffect(()=>{console.log(route)},[])
    

    const tempList = [
        {
            index:'1',
            empName:'힘찬중기',
            jobType:'1',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
        {
            index:'2',
            empName:'힘찬중기',
            jobType:'2',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
    ]
    const EquiList = [
        {
            EquiName:'017 미니굴삭기',
            EquiFacturing:'2018년식',
            EquiUrl:'',
            EquiNumber:'541',
            Device:'브레키어 외 2개',
            Documents:'완비',
        },
        {
            EquiName:'018 미니굴삭기',
            EquiFacturing:'2019년식',
            EquiUrl:'',
            EquiNumber:'623',
            Device:'채바가지',
            Documents:'1건 누락',
        },
        {
            EquiName:'017 미니굴삭기',
            EquiFacturing:'2018년식',
            EquiUrl:'',
            EquiNumber:'5115',
            Device:'브레키어 외 2개',
            Documents:'완비',
        },
        {
            EquiName:'018 미니굴삭기',
            EquiFacturing:'2019년식',
            EquiUrl:'',
            EquiNumber:'62346',
            Device:'채바가지',
            Documents:'1건 누락',
        },

    ]

    React.useEffect(()=>{
        dispatch(toggleLoading(likeLoading));
        if(likeData){
            const bodyData = likeData.data.data;
            setFavoriteList([...bodyData]);
        }
    },[likeData])

    return(
        <View style={{flex:1}}>
            <BackHeader title={mt_type === '1' ? '즐겨찾기 장비관리' : '장비현황' } />
            <View style={{paddingHorizontal:20,flex:1}}>
                <CustomButton 
                    style={{marginVertical:20,}}
                    action={Addnavigation}
                    label={'장비 추가하기'}
                />
                {route.params.mt_type == '1'?
                <FlatList 
                    data={favoriteList}
                    style={{marginTop:10}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <View style={{paddingVertical:15}}>
                            <UserInfoCard 
                                index={String(index)}
                                empName={item.company}
                                jobType={item.pilot_type === 'Y' ? '1' : '0'}
                                location={item.location}
                                rating={item.score_count}
                                recEmpCount={item.good}
                                score={item.score}
                                userName={item.name}
                                userProfileUrl={item.img_url}
                                isDelete={true}
                                action={()=>{}}
                                isCheck={''}
                            />
                            </View>
                        )
                    }}
                />
                :
                <FlatList 
                    data={EquiList}
                    style={{}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <HeavyEquipmentCard
                                EquiName={item.EquiName}
                                EquiFacturing={item.EquiFacturing}
                                EquiUrl={item.EquiUrl}
                                EquiNumber={item.EquiNumber}
                                Device={item.Device}
                                Documents={item.Documents}
                                action={()=>{navigation.navigate('EquimentsDetail')}}
                                action2={()=>{DeleteListUpdate(item.EquiNumber)}}
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
            action={()=>navigation.navigate('Board',{type:'default'})}
        />
        {/* <RecEmpModal 
            show={true}
            hide={()=>{}}

        /> */}
        </View>
    )
}