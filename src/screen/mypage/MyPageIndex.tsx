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
import { usePostMutation, usePostQuery } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MypageDataType } from '../../component/componentsType';
import { toggleLoading } from '../../redux/actions/LoadingAction';

export const MyPageIndex = ({setTabIndex}:MyPageIndexType) => {
    const dispatch = useAppDispatch();
    const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
    const isFocused = useIsFocused();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert);
    const [mypageData, setMypageData] = React.useState<MypageDataType[]>([]);


    const consmyPageMutation = usePostMutation('consmyPage','cons/mypage_info.php')
    const equipmyPageMutation = usePostMutation('equipmyPage','equip/mypage_info.php')
    const pilotmyPageMutation = usePostMutation('pilotmyPage','pilot/mypage_info.php')


    const {data:myInfoData,isLoading:myInfoLoading,isError,refetch} = usePostQuery('getMyInfo',{mt_idx:mt_idx},
        mt_type === '1'?
            'cons/mypage_info.php'
        : mt_type === '2'?
            'equip/mypage_info.php'
        :
            'pilot/mypage_info.php'
    );

    const [myInfo, setMyInfo] = React.useState({
        company : '',
        hp : '',
        name : '',
        position : '',
        require_check : '',
        profile_check : '',
    })

    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({  
            alert:true,
            strongMsg:'',
            msg:msg,
            type:type ? type : '' ,
        })
    }
    const alertAction = () => {
        if(alertModal.type === 'none_cons'){ 
            navigation.navigate('OpenConstruction',{isData:false});
        }
        else if(alertModal.type === 'none_profile'){
            navigation.navigate('SettingProfile');
        }
    }
    const mypageInform = async (): Promise<void> => {
        try {
            const idxParams = {
                mt_idx : mt_idx,
            }
            const {result,data, msg} = 
            mt_type == '1'?  await consmyPageMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipmyPageMutation.mutateAsync(idxParams)
            :
            await pilotmyPageMutation.mutateAsync(idxParams)

            if(result === 'true'){
                setMypageData(data.data)
                console.log(data.data)
            }
            else{
            }
        // }
        } catch(err) {
            console.log(err);
        }
    };

    /**TODO */
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }


    React.useEffect(()=>{
        if(isFocused && setTabIndex){
            setTabIndex(4);
        }
        mypageInform()
    },[])

    React.useEffect(()=>{
        dispatch(toggleLoading(myInfoLoading));
        if(myInfoData){
            setMyInfo(myInfoData.data.data);
        }
    },[myInfoData])

    React.useEffect(()=>{
        if(isFocused){
            refetch();
        }
    },[isFocused])

    return (
        <View style={{flex:1}}>
            <BackHeader title="마이페이지" />
            <ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{padding:20}}>
                    <View style={[{backgroundColor:colors.MAIN_COLOR,borderRadius:8,padding:20}]}>
                        {mt_type !== '4' &&
                            <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>{myInfo.company}</Text>
                        }
                        <Text style={[fontStyle.f_semibold,{fontSize:24,color:colors.WHITE_COLOR,marginBottom:7}]}>{myInfo.name} {myInfo.position}님</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:18 , color:colors.WHITE_COLOR}]}>{myInfo.hp}</Text>
                    </View>
                </View>
                {mt_type == '1'?
                <View style={styles.deepTopBorder}>
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        onPress={()=>{
                            if(myInfo.require_check === 'Y'){
                                navigation.navigate('OpenConstruction',{isData:true});
                            }
                            else{
                                alertModalOn(`개설된 현장이 없습니다.${"\n"}현장개설을 먼저 해주세요.`,'none_cons');
                            }
                        }}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 현장</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        onPress={()=>{navigation.navigate('FavoriteList');}}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>즐겨찾기 장비 관리</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('MyInfo')}}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 정보</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                mt_type == '2'?
                <View style={styles.deepTopBorder}>  
                    {myInfo.profile_check === 'Y' && 
                        <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                            // onPress={() => {navigation.navigate('MyProfile')}}
                            onPress={()=>{
                                if(myInfo.profile_check === 'N'){
                                    alertModalOn('작성된 프로필이 없습니다. 프로필 작성을 먼저해주세요.','none_profile')
                                }
                                else{
                                    navigation.navigate('SettingProfile');
                                }
                            }}
                        >
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 프로필</Text>  
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={()=>{navigation.navigate('FavoriteList')}}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>장비 현황</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FavoriteFilotIndex') }>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 조종사 관리</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('MyInfo') }}>
                        <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                            <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 정보</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.deepTopBorder}>   
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                        // onPress={()=>{navigation.navigate('MyProfile')}}
                        onPress={()=>{
                            if(myInfo.profile_check === 'N'){
                                alertModalOn('작성된 프로필이 없습니다. 프로필 작성을 먼저해주세요.','none_profile')
                            }
                            else{
                                navigation.navigate('SettingProfile');
                            }
                        }}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 프로필</Text>  
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {navigation.navigate('MyInfo', {userType:'3'}) }}> */}
                    <TouchableOpacity onPress={() => { {/*navigation.navigate('MatchingEquipment')*/} }}>
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
                    btnLabel={alertModal.type ==='none_cons' ? '현장개설하기' : '프로필 작성하기'}
                />
            </ScrollView>
        </View>
    )
}