import React,{useState} from 'react';
import { Text, TouchableOpacity, View ,Image,StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { HeavyEquipmentCardType } from '../componentsType';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { usePostMutation } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { toggleLoading } from '../../redux/actions/LoadingAction';


export const HeavyEquipmentCard = ({
    item,
    action,
    action2,
    refetch,
}:HeavyEquipmentCardType) => {
    // const [isDelete,setIsDelete] = useState(false)

    const {mt_idx, mt_type} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();
    const [alertModal, setAlertModal] = useState(()=>initialAlert);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const deviceDelMutation = usePostMutation('deviceDel' , 'equip/equip_info_del.php');

    const alertModalOn = (msg:string, type?:string,strongMsg? : string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg : msg,
            type : type ? type : '',
            strongMsg : strongMsg ? strongMsg : '', 
        })
    }
    const alertModalOff = () =>{
        setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {
        alertModalOff();
        if(alertModal.type === 'none_idx' || alertModal.type === 'refetch' || alertModal.type === 'del_success'){
            if(refetch) refetch();
        }
        else if(alertModal.type === 'none_mt_idx_move'){
            navigation.navigate('Main');
        }
        else if(alertModal.type === 'delete_confirm'){
            deviceDelHandler();
        }
    }

    async function deviceDelHandler(){ //장비삭제
        if(item.idx === ''){
            alertModalOn('존재하지 않는 장비입니다.','none_idx');
        }
        else if(mt_idx === ''){
            alertModalOn('비정상적인 접근입니다.','none_mt_idx_move');
        }
        else{
            dispatch(toggleLoading(true));

            const params = {
                mt_idx : mt_idx,
                eit_idx : item.idx,
            }

            const {result,msg} = await deviceDelMutation.mutateAsync(params);

            dispatch(toggleLoading(false));

            if(result === 'true'){
                alertModalOn('장비 삭제가 성공적으로 완료되었습니다.','del_success');
            }
            else{
                alertModalOn(msg,'refetch');
            }
        }
    }

    const Addnumber = ()=>{
        // setIsDelete(!isDelete)
        // if(isDelete)
        action2()
    }

    React.useEffect(()=>{
        console.log(item);
    },[])

    return (
        <View style={{width:'100%',position:'relative',marginBottom:30}} >
            <View style={[styles.cardWrapper]}>
                {item.device !== '' || item.year !== '' ?
                <View style={[styles.card2Location,{flexDirection:'column'}]}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                        <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,flexShrink:1,marginRight:20}]}>{item.device === '' ? '-' : item.device} {item.stand}</Text>
                        <TouchableOpacity onPress={()=>{
                            const comant = item.device === '' && item.stand === '' ? '선택하신 장비를 삭제하시겠습니까?' : `을 삭제하시겠습니까?`; 
                            alertModalOn(comant,'delete_confirm',item.stand !== '' && item.device !== '' ? `[${item.stand} ${item.device}]` : '');
                        }}>
                            {/* { isDelete ? <Image style={HeavyEquipmentCardstyle.Ontrash} source={require('../../assets/img/ic_trash2_on.png')}/> : <Image style={HeavyEquipmentCardstyle.trash} source={require('../../assets/img/ic_trash1.png')}/> } */}
                            <Image style={HeavyEquipmentCardstyle.trash} source={require('../../assets/img/ic_trash1.png')}/>
                        </TouchableOpacity>
                    </View>
                <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>{item.year === '' ? '-' : item.year}</Text>
                </View>
                :
                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1,marginBottom:20}}>  
                    <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,flexShrink:1,marginRight:20}]}>OCR 승인중입니다.</Text>
                    <TouchableOpacity onPress={()=>{
                            const comant = item.device === '' && item.stand === '' ? '선택하신 장비를 삭제하시겠습니까?' : `을 삭제하시겠습니까?`; 
                            alertModalOn(comant,'delete_confirm',item.stand !== '' && item.device !== '' ? `[${item.stand} ${item.device}]` : '');
                        }}>
                            {/* { isDelete ? <Image style={HeavyEquipmentCardstyle.Ontrash} source={require('../../assets/img/ic_trash2_on.png')}/> : <Image style={HeavyEquipmentCardstyle.trash} source={require('../../assets/img/ic_trash1.png')}/> } */}
                        <Image style={HeavyEquipmentCardstyle.trash} source={require('../../assets/img/ic_trash1.png')}/>
                    </TouchableOpacity>
                </View>    
                }
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={action}>
                    <Image style={{width:100,height:100,borderRadius:4,marginRight:20,}} source={item.img? {uri:item.img}:require('../../assets/img/no_image.png')}/>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <View style={HeavyEquipmentCardstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,HeavyEquipmentCardstyle.boxText1,{marginRight:20}]}>차량번호</Text>
                        <Text style={[fontStyle.f_regular,HeavyEquipmentCardstyle.boxText1,{flexShrink:1}]}>
                            {item.reg_no === '' ? '-' : item.reg_no}
                        </Text>
                    </View>
                    <View style={HeavyEquipmentCardstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,HeavyEquipmentCardstyle.boxText1,{marginRight:20}]}>부속장치</Text>
                        <Text style={[fontStyle.f_regular,HeavyEquipmentCardstyle.boxText1,{flexShrink:1}]}>
                            {item.sub === '' ? '-' : item.sub}
                        </Text>
                    </View>
                    <View style={HeavyEquipmentCardstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,HeavyEquipmentCardstyle.boxText1,{marginRight:20}]}>필수서류</Text>
                        <Text style={[fontStyle.f_regular,item.doc_color === 'black' ? HeavyEquipmentCardstyle.boxText1:HeavyEquipmentCardstyle.redText,{flexShrink:1}]}>
                            {item.doc_check === '' ? '-' : item.doc_check}
                        </Text>
                    </View>
                </View>
                </View>
            </View>
            <AlertModal 
                show={alertModal.alert}
                hide={alertModalOff}
                msg={alertModal.msg}
                action={alertAction}
                strongMsg={alertModal.strongMsg}
                type={alertModal.type}
            />
        </View>
    )
}

const HeavyEquipmentCardstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:5},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    redText:{fontSize:16,color:colors.RED_COLOR3},
    Ontrash:{borderWidth:1,borderColor:colors.BORDER_RED_COLOR2,borderRadius:4,padding:2,width:27,height:27},
    trash:{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:4,padding:2,width:27,height:27},
})