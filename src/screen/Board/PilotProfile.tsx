import React, {useState} from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';

import { SafeAreaView } from "react-native-safe-area-context";
import { AlertModal } from "../../modal/AlertModal";
import { AlertClearType } from "../../modal/modalType";
import { initialAlert } from "../../modal/AlertModal";
import { Profile } from "./pilotProfileDetail/Profile";
import { RequiredDocuments } from "./pilotProfileDetail/RequiredDocuments";
import { BackHandlerCom } from "../../component/utils/BackHandlerCom";
import { PilotProfileItemType, PilotProfileType } from "../screenType";
import { usePostQuery } from "../../util/reactQuery";
import { useAppSelector } from "../../redux/store";




export const PilotProfile = ({route}:PilotProfileType) => {

    const {cat_idx,mpt_idx} = route.params;
    const {mt_idx} = useAppSelector(state => state.userInfo);

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [tab, setTab] = useState(0);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const [pilotProfile, setPilotProfile] = React.useState<PilotProfileItemType>();

    const {data : profileData, isLoading : profileLoading, isError : profileError} = usePostQuery('getPilotProfile',{
        mt_idx : mt_idx,
        mpt_idx : mpt_idx,
        cat_idx : cat_idx,
    },'equip/pilot_profile.php');
    
    
    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: '장비업체를 선정 하시겠습니까?',
            type:'confirm',
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }

    const FirstRoute = () => (
        <Profile info={pilotProfile?.profile}/>
    );

    const SecondRoute = () => (
        <>
            {pilotProfile &&
                <RequiredDocuments doc={pilotProfile.doc}/>
            }
        </>
            // <>
            // </>
    );


    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    React.useEffect(()=>{
        if(profileData){
            // console.log(profileData);
            if(profileData.result === 'true'){
                setPilotProfile(profileData.data);
            }
            else{

            }

        }
    },[profileData])

    return (
        <SafeAreaView style={{flex:1}}>
            <BackHeader title="조종사 프로필"/>
            <BackHandlerCom />
            <ScrollView style={{flex:1}}>
                {pilotProfile &&
                    <ProfileInfoCard
                        userProfileUrl = {pilotProfile.data.img_url}
                        userName = {pilotProfile.data.name}
                        age = {String(pilotProfile.data.age)} 
                        gender = {pilotProfile.data.gender} 
                        location = {pilotProfile.data.location}
                        equip={pilotProfile.data.equip}
                        // jobType = {pilotProfile.data.type}
                        phone = {pilotProfile.data.hp}
                        score_count = {pilotProfile.data.score_count}
                        score = {pilotProfile.data.score}
                        good = {Number(pilotProfile.data.good)}
                        mpt_idx = {mpt_idx}
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
                </View>
                {
                    tab === 0
                    ? FirstRoute()
                    : SecondRoute()
                }
                <TouchableOpacity onPress={() => alertModalOn('','test')}>
                    <View style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold, ]}>조종사 선택 완료</Text>
                    </View>
                </TouchableOpacity>
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    action={()=>navigation.navigate('ElectronicContract',{cot_idx:cot_idx,cat_idx:cat_idx})} // 서류작성_임대계약페이지 만들어지면 연결
                    hide={alertModalOff}
                    type={alertModal.type}
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