import React, {useState,useEffect} from "react";
import { ScrollView, View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';

import { SafeAreaView } from "react-native-safe-area-context";
import { Device } from "./companyProfileDetail/Device";
import { AlertModal } from "../../modal/AlertModal";
import { AlertClearType } from "../../modal/modalType";
import { initialAlert } from "../../modal/AlertModal";
import { Profile } from "./companyProfileDetail/Profile";
import { RequiredDocuments } from "./companyProfileDetail/RequiredDocuments";
import { usePostMutation, usePostQuery } from "../../util/reactQuery";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { initialConsProfile } from "../../component/initialInform";
import { toggleLoading } from "../../redux/actions/LoadingAction";
import { CompanyInfoItemType, CompanyProfileType } from "../screenType";
import { BackHandlerCom } from "../../component/utils/BackHandlerCom";


const ProfileRoute = (route:any) => (
    <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1}}>
        <Profile 
        profileData={route}
        />
    </View>
);

const DocRoute = (route:any) => (
    <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1}}>
        <RequiredDocuments
        DocData={route}
        />
    </View>
);

const SubRoute = (route:any) => (
    <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1}}>
        <Device 
        subData={route}
        />
    </View>
);


export const CompanyProfile = ({route}:CompanyProfileType) => {
    const {cat_idx,cot_idx,mpt_idx,isBtn} = route.params;
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const {mt_idx} = useAppSelector(state => state.userInfo);
    const [tab, setTab] = useState(0);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [consprofileInfo, setconsprofileInfo] = React.useState<CompanyInfoItemType>(); //입력정보
    // const {data : consprofileData, isLoading : consprofileDataLoading, isError : consprofileDataError} = 
    /** mt_idx 임의입력 수정필요 */
    // usePostQuery('getconsprofileData',{mt_idx : mt_idx,cot_idx:route.params.cot_idx,cat_idx:route.params.cat_idx},'cons/cons_order_apply_info.php')

    const getConsProfileMutation1 = usePostMutation('getConsProfile','cons/cons_like_list_info.php');
    const getConsProfileMutation2 = usePostMutation('getConsProfile2', 'cons/cons_order_apply_info.php');

    const selOrderApplyMutation = usePostMutation('selOrderApply','cons/cons_order_apply_select.php'); //장비회사 선택

    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type:type ? type : '',
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }

    const alertAction = () =>{
        if(alertModal.type ==='error'){
            navigation.goBack();
        }
        else if(alertModal.type === 'choice_confirm'){
            selOrderApplyHandler();
            // navigation.navigate('ElectronicContract',{cat_idx:cat_idx,cot_idx:cot_idx,route_type:'Info'})
        }
        else if(alertModal.type === 'choice_success'){
            navigation.navigate('Board');
        }
        else if(alertModal.type === 'choice_fail'){
            navigation.goBack();
        }
    }

    const selOrderApplyHandler = async () => { //지원자 장비회사 선택
        const params = {
            mt_idx : mt_idx,
            cot_idx : cot_idx,
            cat_idx : cat_idx,
        }

        console.log(params);

        // dispatch(toggleLoading(true));
        const {data,result,msg} = await selOrderApplyMutation.mutateAsync(params);
        // dispatch(toggleLoading(false));

        if(result === 'true'){
            alertModalOn('지원자 선택이 완료되었습니다.','choice_success');
        }
        else{
            alertModalOn(msg,'');
        }
    }

    const getCompanyProfile = async () => {
        if(mpt_idx){
            const {data, result, msg} = await getConsProfileMutation1.mutateAsync({ //즐겨찾기 -> 장비회사
                mt_idx : mt_idx,
                mpt_idx : mpt_idx,
            })
            console.log(data);

            if(result === 'true'){
                setconsprofileInfo(data);
            }
            else{
                alertModalOn(msg,'error');
            }
        }
        else if(cot_idx && cat_idx){
            const {data, result, msg} = await getConsProfileMutation2.mutateAsync({ //장비회사 프로필
                cot_idx : cot_idx,
                cat_idx : cat_idx,
                mt_idx : mt_idx,
            })
            if(result === 'true'){
                setconsprofileInfo(data);
            }
            else{
                alertModalOn(msg,'error');
            }
        }
    }

    React.useEffect(()=>{
        console.log(route.params)
        getCompanyProfile();
    },[])

    // React.useEffect(()=>{
    //     dispatch(toggleLoading(consprofileDataLoading));
    //     if(consprofileData){
    //         console.log(consprofileData);
    //         setconsprofileInfo(consprofileData.data);
    //     }
    // },[consprofileData])
    return (
        <SafeAreaView style={{flex:1}}>
            <BackHeader title="장비회사 프로필"/>
            <BackHandlerCom />
            <ScrollView style={{flex:1}}>
                {consprofileInfo &&
                    <ProfileInfoCard
                        userProfileUrl = {consprofileInfo.data.img_url}
                        userName = {consprofileInfo.data.name}
                        age = {String(consprofileInfo.data.age)} 
                        gender = {consprofileInfo.data.gender} 
                        location = {consprofileInfo.data.equip}
                        equip={consprofileInfo.data.equip}
                        jobType = {consprofileInfo.data.pilot_type}
                        phone = {consprofileInfo.data.hp}
                        score_count = {consprofileInfo.data.score_count}
                        score = {consprofileInfo.data.score}
                        good = {Number(consprofileInfo.data.good)}
                    />
                }
                <View style={{ flexDirection:'row', backgroundColor:colors.WHITE_COLOR, justifyContent:'space-around', alignItems: 'center', }}>
                    <View style={tab === 0 ? TabStyle.tabViewOn : TabStyle.tabViewOff }>
                        <TouchableOpacity onPress={() => setTab(0)}>
                            <Text style={[ tab === 0 ? fontStyle.f_semibold && TabStyle.tabTextOn : fontStyle.f_light && TabStyle.tabTextOff]}>프로필</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tab === 1 ? TabStyle.tabViewOn : TabStyle.tabViewOff }>
                        <TouchableOpacity onPress={() => setTab(1)}>
                            <Text style={[ tab === 1 ? fontStyle.f_semibold && TabStyle.tabTextOn : fontStyle.f_light && TabStyle.tabTextOff]}>필수서류</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tab === 2 ? TabStyle.tabViewOn : TabStyle.tabViewOff }>
                        <TouchableOpacity onPress={() => setTab(2)}>
                            <Text style={[ tab === 2 ? fontStyle.f_semibold && TabStyle.tabTextOn : fontStyle.f_light && TabStyle.tabTextOff]}>부속장치</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {consprofileInfo &&
                    <>
                        {
                            tab === 0
                            ? ProfileRoute(consprofileInfo.profile)
                            : tab === 1
                            ? DocRoute(consprofileInfo.doc_check)
                            : SubRoute(consprofileInfo.sub)
                        }
                    </>
                }
                {isBtn &&
                    <TouchableOpacity onPress={() => alertModalOn('장비업체를 선정 하시겠습니까?','choice_confirm')}>
                        <View style={[styles.buttonStyle, {}]}>
                            <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold, ]}>장비회사 선정</Text>
                        </View>
                    </TouchableOpacity>
                }
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    // action={()=>} // 서류작성_임대계약페이지 만들어지면 연결
                    hide={alertModalOff}
                    type={alertModal.type}
                    action={alertAction}
                />
            </ScrollView>
        </SafeAreaView>

    )
}

const TabStyle = StyleSheet.create({
    tabViewOn : { flex: 1, borderBottomWidth: 3, borderColor: colors.MAIN_COLOR},
    tabViewOff : { flex: 1, borderBottomWidth: 1, borderColor: colors.BORDER_GRAY_COLOR1},
    tabTextOn : { color:colors.FONT_COLOR_BLACK, fontSize: 18,  textAlign: 'center', paddingVertical:10},
    tabTextOff : { color:colors.FONT_COLOR_GRAY, fontSize: 18,  textAlign: 'center', paddingVertical:10},
})