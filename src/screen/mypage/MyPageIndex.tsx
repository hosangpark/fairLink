import React,{useState} from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { BackHeader } from '../../component/header/BackHeader';
import { MyPageIndexType } from '../screenType';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AlertModal ,initialAlert} from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { CustomButton } from '../../component/CustomButton';

export const MyPageIndex = ({setTabIndex}:MyPageIndexType) => {
    const [userType,setUserType] = useState('1')
    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);

    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:'',
            msg:msg,
            type:type ? type : '' ,
        })
    }

    const alertAction = () => {
        if(alertModal.type === ''){ 
            navigation.navigate('OpenConstruction');
        }
        else if(alertModal.type === 'none_profile'){
            if ( userType === '2') {
                navigation.navigate('SettingProfile',{userType:'2'});
            } else if ( userType === '3') {
                navigation.navigate('SettingProfile',{userType:'3'});
            }
        }
    }

    /**TODO */
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }

    React.useEffect(()=>{
        if(isFocused && setTabIndex){
            setTabIndex(4);
        }
    },[])

    return (
        <View style={{flex:1}}>
            <BackHeader title="마이페이지" />
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <CustomButton
                    action={()=>{setUserType('1')}}
                    label={'건설회사'}
                    style={{...styles.whiteButtonStyle,flex:1,marginRight:10}}
                    labelStyle={styles.whiteButtonLabelStyle}
                />
                <CustomButton
                    action={()=>{setUserType('2')}}
                    label={'장비회사'}
                    style={{flex:1,marginRight:10}}
                />
                <CustomButton
                    action={()=>{setUserType('3')}}
                    label={'조종사'}
                    style={{...styles.whiteButtonStyle,flex:1,marginRight:10}}
                    labelStyle={styles.whiteButtonLabelStyle}
                />
            </View>
            <ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{padding:20}}>
                    <View style={[{backgroundColor:colors.MAIN_COLOR,borderRadius:8,padding:20}]}>
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>남동종합건설</Text>
                        <Text style={[fontStyle.f_semibold,{fontSize:24,color:colors.WHITE_COLOR,marginBottom:7}]}>홍길동 차장님</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:18 , color:colors.WHITE_COLOR}]}>010-1234-5678</Text>
                    </View>
                </View>
                {userType == '1'?
                <View style={styles.deepTopBorder}>
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        onPress={()=>{alertModalOn(`개설된 현장이 없습니다.${"\n"}현장개설을 먼저 해주세요.`);}}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 현장</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        onPress={()=>{navigation.navigate('FavoriteList',{userType:'1'});}}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>즐겨찾기 장비 관리</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('MyInfo', {userType:'1'})}}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 정보</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    :
                userType == '2'?
                <View style={styles.deepTopBorder}>   
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        // onPress={() => {navigation.navigate('MyProfile')}}
                        onPress={()=>{alertModalOn('작성된 프로필이 없습니다. 프로필 작성을 먼저해주세요.','none_profile')}}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 프로필</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('FavoriteList',{userType:'2'});}}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>장비 현황</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FavoriteFilotIndex') }>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 조종사 관리</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('MyInfo',{userType:'2'}) }}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 정보</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.deepTopBorder}>   
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        // onPress={()=>{navigation.navigate('MyProfile')}}
                        onPress={()=>{alertModalOn('작성된 프로필이 없습니다. 프로필 작성을 먼저해주세요.', 'none_profile')}}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 프로필</Text>  
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {navigation.navigate('MyInfo', {userType:'3'}) }}> */}
                    <TouchableOpacity onPress={() => {navigation.navigate('Matching') }}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 정보</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                }
                <AlertModal
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    action={alertAction} // 서류작성_임대계약페이지 만들어지면 연결
                    hide={alertModalOff}
                    type={alertModal.type}
                    btnLabel={alertModal.type ==='' ? '현장개설하기' : '프로필 작성하기'}
                />
            </ScrollView>
        </View>
    )
}