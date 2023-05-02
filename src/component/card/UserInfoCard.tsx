import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { UserInfoCardType } from '../componentsType';
import { AlertClearType } from '../../modal/modalType';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { pilotCareerList } from '../utils/list';
import { RecEmpModal } from '../../modal/RecEmpModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { usePostMutation } from '../../util/reactQuery';
import { toggleLoading } from '../../redux/actions/LoadingAction';


export const UserInfoCard = ({
    index = '0',
    item,
    isDelete = true,
    isFavorite,
    isCheck,
    action, //
    refetch, //list 새로 불러오기
}:UserInfoCardType) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const dispatch = useAppDispatch();
    const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
    const [recEmpModal, setRecEmpModal] = React.useState(false);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const delFavUserMutation = usePostMutation('delFavUser','cons/cons_like_del.php'); //즐겨찾기 장비 리스트 삭제

    const alertModalOn = ( msg : string, type? : string,strongMsg? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: strongMsg ? strongMsg : '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert);
    }
    const alertAction = () => {
        setAlertModal(()=>initialAlert);
        if(alertModal.type === 'delete_user_confirm'){
            deleteFavUser();
        }
        else if(alertModal.type === 'del_success'){
            if(refetch)refetch();
        }
    }



    async function deleteFavUser(){ //즐겨찾기 유저 삭제

        const params = {
            mt_idx : mt_idx,
            like_idx : item.like_idx,
        }
        dispatch(toggleLoading(true));
        const {result,msg} = await delFavUserMutation.mutateAsync(params);
        dispatch(toggleLoading(false));

        if(result === 'true'){
            alertModalOn('즐겨찾기 삭제가 성공적으로 완료되었습니다.','del_success');
        }
        else{
            alertModalOn(msg,'');
        }

        // await alertModalOn('삭제가 완료되었습니다.','delete_success');
    }
    const item_pilot_type = item.pilot_type? item.pilot_type : item.type

    return (
        <TouchableOpacity style={{width:'100%',position:'relative'}} onPress={()=>{
            // console.log('dddd');
            // console.log(mt_type);
            if(isCheck){
                
            }
            else{
                if(mt_type === '1'){
                    console.log(item);
                    navigation.navigate('CompanyProfile',{
                        cat_idx:item.cat_idx,
                        cot_idx:item.cot_idx,
                        mpt_idx:item.mpt_idx,
                    });
                }
            }
        }}>
            {   item_pilot_type? 
                <View style={[styles.cardJobArea,{borderColor: item.pilot_type === 'Y' ? colors.BLUE_COLOR : colors.ORANGE_COLOR,zIndex:11}]}>
                    <Text style={[fontStyle.f_medium,{fontSize:15, color:item.pilot_type === 'Y' ? colors.BLUE_COLOR : colors.ORANGE_COLOR}]}>
                        {item_pilot_type === 'Y'||'my' ? '차주 겸 조종사' : 
                         item_pilot_type === 'N'||'like' ? '스페어 조종사' :
                        '장비회사 소속 조종사'}
                    </Text>
                </View>
                :
                null
            }
            {(isCheck && isCheck !== index) && //체크박스 체크안되면 음영처리 및 체크이벤트
                <TouchableOpacity onPress={()=>{action(index);}} style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.2)',top:0,left:0,zIndex:10,borderRadius:8}} />
            }
            <View style={[styles.cardWrapper,{ backgroundColor:isCheck == index? '#EDF6F6':'white',borderWidth:isCheck == index? 1.5:1.5,borderColor:isCheck == index? colors.MAIN_COLOR:colors.BORDER_GRAY_COLOR}]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.cardProfileSize]}>
                            {/* <Text>프로필 영역</Text> */}
                            {item.img_url === '' ? 
                                <Image source={require('../../assets/img/profile_default.png')} style={{width:100,height:100,borderRadius:50}}/>
                            :   
                                <Image source={{uri:item.img_url}} style={{width:100,height:100,borderRadius:50}}/> 
                            }
                        </View>
                        <View style={{marginLeft:10,}}>
                            { !item.pilot_type 
                                ? null 
                                : <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.MAIN_COLOR}]}>
                                    {item.company}
                                </Text>
                            }
                            { !item.met_company
                                ? null
                                :
                                <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.MAIN_COLOR}]}>
                                    {item.met_company}
                                </Text>
                            }
                            <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                                {item.name}
                                {item.mpt_name}
                                님</Text>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK}]}>{item.score.toFixed(1)}</Text>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK2,marginLeft:5}]}>평가수 {item.score_count}</Text>
                            </View>
                            <TouchableOpacity style={[styles.cardReqEmpBtn]} onPress={()=>{setRecEmpModal(true)}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.WHITE_COLOR}]}>추천기업 {item.good}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{zIndex:30,position:'absolute',right:0}} onPress={() => {
                        if(isDelete){
                            alertModalOn(`님을\n즐겨찾기에서 삭제하시겠습니까?`, 'delete_user_confirm',`${item.company} [${item.name}]`)
                        }
                        else if(isFavorite && item.mpt_idx){
                            action(item.mpt_idx);
                        }
                        else if(isCheck){
                            action(index);
                        }
                    }}
                        >
                        { isDelete ? <Image source={require('../../assets/img/ic_trash1.png')} style={{width:25,height:25}} /> : null }
                        { isFavorite && <Image source={require('../../assets/img/ic_bookmark_on.png')} style={{width:22,height:30}} /> }

                        { isCheck && 
                            <>
                                {isCheck == index?
                                    <Image source={require('../../assets/img/ic_check_on.png')} style={{width:25,height:25}} />
                                    :
                                    <Image source={require('../../assets/img/ic_check_off.png')} style={{width:25,height:25}} />
                                }
                            </>
                        }
                    </TouchableOpacity>
                </View>
                <View style={[styles.cardInfoArea,{backgroundColor:isCheck == index? '#D3E9EB':colors.BACKGROUND_COLOR_GRAY1,borderWidth:1,borderColor:isCheck == index? '#9ACCCF':colors.BORDER_GRAY_COLOR}]}>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{item.equip}</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>경력 {pilotCareerList[Number(item.career)]}+</Text>
                </View>
                <Text style={[fontStyle.f_light,{fontSize:15,color:colors.FONT_COLOR_BLACK2,marginTop:10}]}>
                    {item.location}
                    {item.mpt_location}
                </Text>
                <AlertModal
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    strongMsg={alertModal.strongMsg}
                    action={alertAction}
                    hide={alertModalOff}
                    type={alertModal.type}
                    btnLabel={''}
                />
                <RecEmpModal 
                    show={recEmpModal}
                    hide={()=>{setRecEmpModal(false)}}
                    action={()=>{}}
                    mpt_idx={item.mpt_idx ? item.mpt_idx : ''}
                />
            </View>
        </TouchableOpacity>
    )
}