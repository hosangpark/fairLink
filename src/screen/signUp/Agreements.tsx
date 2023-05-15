import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle } from '../../style/style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AgreementsType } from '../screenType';
import { AgreeModal } from '../../modal/AgreeModal';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { KakaoProfile, getProfile as getKakaoProfile, unlink,} from '@react-native-seoul/kakao-login';


export const Agreements = ({route}:AgreementsType) => {

    const {token} = route.params;

    const [checkItems, setCheckItems] = useState<number[]>([]);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [agreeModal, setAgreeModal] = React.useState(false);
    const [agreeType, setAgreeType] = React.useState('');

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);
    const alertModalOn = (msg:string, type?:string) => {
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

    const unlinkKakao = async (): Promise<void> => { //카카오 로그아웃
        try {
          
          const message = await unlink();
          console.log(message);
        } catch(err) {
          console.log(err);
          
        }
    };

    const alertAction = () => {
        if(alertModal.type === 'email_none'){
            unlinkKakao();
            navigation.goBack();
        }
    }
    
    const agreementsData = [
        {id: 0, content: '[필수] 개인정보 수집 및 이용 동의'},
        {id: 1, content: '[필수] 서비스 이용약관 동의'},
        {id: 2, content: '[선택] 개인정보 제3자 제공 동의'},
        {id: 3, content: '[선택] 이벤트 등 프로모션 알림 수신 동의'}
    ]

    const handleSingleCheck = (checked:boolean, id:number) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
        } else {
            setCheckItems(checkItems.filter((e) => e !== id));
        }
    };

    const handleAllCheck = (checked:boolean) => {
        if (checked) {
            const idArray : number[] = [];
            agreementsData.forEach((e) => idArray.push(e.id));
            setCheckItems(idArray);
        } else {
            setCheckItems([]);
        }
    };

    

    const getProfileInfo = async () => { //카카오 정보 불러오기
        const profile : KakaoProfile = await getKakaoProfile();
        console.log(profile);
        if(profile.email === 'null'){
            alertModalOn('개인정보 제3자 제공동의\n카카오계정(이메일)항목은 반드시 동의해주세요.','email_none');
        }
    }


    React.useEffect(()=>{
        getProfileInfo();
    },[])

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITE_COLOR, }}>
            <BackHeader title="간편 회원가입" />
            <AgreeModal
                show={agreeModal}
                hide={()=>setAgreeModal(false)}
                type={agreeType}
            />
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                hide={alertModalOff}
                action={alertAction}
                type={alertModal.type}
            />
                <View style={{ margin: 20 }}>
                    <Text style={[fontStyle.f_bold, {color: colors.FONT_COLOR_BLACK, fontSize: 24, marginBottom: 10 }]}>이용약관 동의</Text>
                </View>
                {/* 전체 동의wrap */}
                <View style={{ borderBottomColor: colors.BORDER_GRAY_COLOR, borderBottomWidth: 1}}>
                    <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <CheckBox
                            disabled={false}
                            value={checkItems.length === agreementsData.length ? true : false}
                            onValueChange={(e) => handleAllCheck(e)}
                            tintColors={{ true: colors.MAIN_COLOR, }}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={[fontStyle.f_semibold, { margin: 20, marginHorizontal: 8, marginVertical: 1, fontSize: 18, color: colors.FONT_COLOR_BLACK, }]}>전체 동의하기</Text>
                    </View>
                    <Text style={{ marginHorizontal: 25, paddingBottom: 35, }}>전체동의는 카카오 및 ~~~~~ 를 포함하고 있으며 ~~ 선택동의에 대한 동의를 거부해도 서비스 이용이 가능합니다.</Text>
                </View>
                {/* 필수/선택 체크박스wrap */}
                <View style={{ margin: 20 }}>
                    { agreementsData.map((data, key) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}} key={key}>
                            <View style={{flexDirection: 'row', marginVertical: 8,}}>
                                <CheckBox
                                    disabled={false}
                                    value={checkItems.includes(data.id) ? true : false}
                                    onValueChange={(e) => handleSingleCheck(e, data.id)}
                                    tintColors={{ true: colors.MAIN_COLOR }}
                                    style={{ width: 24, height: 24 }}
                                />
                                <TouchableOpacity onPress={()=>{
                                    handleSingleCheck(!checkItems.includes(data.id),data.id)
                                    // setAgreeModal(true);
                                    // setAgreeType(String(key));
                                }}>
                                    <Text style={[fontStyle.f_semibold, {  fontSize: 16, color: colors.FONT_COLOR_BLACK, marginHorizontal: 10 }]}>{data.content}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>{
                                setAgreeModal(true);
                                setAgreeType(String(key));
                            }}>
                                <Image style={{ width: 8, height: 13, marginRight: 2 }} source={require('../../assets/img/ic_right_lg.png')}/>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ margin: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: colors.MAIN_COLOR, borderRadius: 4, padding: 12, }}
                        onPress={() => {
                            console.log(checkItems);
                            if(checkItems.some(el=>el === 0) && checkItems.some(el=>el === 1)){
                                navigation.navigate('MemberLine',{token:token})
                            }
                            else{
                                alertModalOn('필수 이용약관 동의를 해주세요.');
                            }
                        }}>
                        <Text style={[ fontStyle.f_semibold, { color: colors.WHITE_COLOR, fontSize: 18, textAlign: 'center', }]}>동의하고 계속하기</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}