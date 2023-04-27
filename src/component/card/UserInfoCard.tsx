import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { UserInfoCardType } from '../componentsType';
import { AlertClearType } from '../../modal/modalType';
import { AlertModal, initialAlert } from '../../modal/AlertModal';


export const UserInfoCard = ({
    index = '0',
    jobType = '차주 겸 조종사',
    userProfileUrl = '',
    empName = '힘찬중기',
    userName = '정우성',
    score = 5,
    rating = 41,
    recEmpCount = 6,
    location = '[경남] 진주시, 사천시, 창원시',
    isDelete = true,
    isFavorite,
    isCheck,
    action
}:UserInfoCardType) => {

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert);
    }

    return (
        <TouchableOpacity style={{width:'100%',position:'relative'}} onPress={()=>action(index)}>
            {   jobType === '0' 
                ?   null 
                :   <View style={[styles.cardJobArea,{borderColor: jobType === '1' ? colors.BLUE_COLOR : colors.ORANGE_COLOR}]}>
                        <Text style={[fontStyle.f_medium,{fontSize:15, color:jobType === '1' ? colors.BLUE_COLOR : colors.ORANGE_COLOR}]}>{jobType === '1' ? '차주 겸 조종사' : '장비회사 소속 조종사'}</Text>
                    </View>
            }
            <View style={[styles.cardWrapper,{backgroundColor:isCheck == index? '#EDF6F6':'white',borderWidth:isCheck == index? 1.5:1.5,borderColor:isCheck == index? colors.MAIN_COLOR:colors.BORDER_GRAY_COLOR}]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.cardProfileSize]}>
                            <Text>프로필 영역</Text>
                        </View>
                        <View style={{marginLeft:10,}}>
                            { jobType === '0' 
                                ? null 
                                : <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.MAIN_COLOR}]}>{empName}</Text>
                            }
                            <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>{userName} 님</Text>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK}]}>{score.toFixed(1)}</Text>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK2,marginLeft:5}]}>평가수 {rating}</Text>
                            </View>
                            <TouchableOpacity style={[styles.cardReqEmpBtn]}>
                                <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.WHITE_COLOR}]}>추천기업 {recEmpCount}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => 
                        isDelete? alertModalOn(`${userName} 조종사를 즐겨찾기에서 삭제하시겠습니까?`, 'confirm')
                        : action(index)
                    }
                        >
                        { isDelete ? <Image source={require('../../assets/img/ic_trash1.png')} style={{width:25,height:25}} /> : null }
                        { isFavorite === '0' 
                            ? <Image source={require('../../assets/img/ic_bookmark_on.png')} style={{width:22,height:30}} /> 
                            : isFavorite === '1' 
                                ? <Image source={require('../../assets/img/ic_bookmark_off.png')} style={{width:22,height:30}} /> 
                                : null }
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
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>6W 굴착기</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>경력 15년+</Text>
                </View>
                <Text style={[fontStyle.f_light,{fontSize:15,color:colors.FONT_COLOR_BLACK2,marginTop:10}]}>{location}</Text>
                <AlertModal
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    // action={alertAction}
                    hide={alertModalOff}
                    type={alertModal.type}
                    btnLabel={''}
                />
            </View>
        </TouchableOpacity>
    )
}