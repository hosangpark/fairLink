import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Main } from './src/screen/Main';
import { RouterNavigatorParams } from './type/routerType';
import { toastConfig } from './src/util/toast/toastConfig';
import Toast from 'react-native-toast-message';
import { MyPageIndex } from './src/screen/mypage/MyPageIndex';
import SplashScreen from 'react-native-splash-screen';
import { Agreements } from './src/screen/signUp/Agreements';
import { SignIn } from './src/screen/SignIn';
import { OpenConstruction } from './src/screen/mypage/OpenConstruction';
import { MemberLine } from './src/screen/signUp/MemberLine';
import { MyInfo } from './src/screen/mypage/myInfo/MyInfo';
import { ApplicantStatus } from './src/screen/Board/ApplicantStatus';
import { FavoriteListIndex } from './src/screen/mypage/favorite/FavoriteListIndex';
import { FavoriteAdd } from './src/screen/mypage/favorite/FavoriteAdd';
import { EquimentsAdd } from './src/screen/mypage/favorite/EquimentsAdd';
import { EquimentsDetail } from './src/screen/mypage/favorite/EquimentsDetail';
import { CompanyProfile } from './src/screen/Board/CompanyProfile';
import { PilotProfile } from './src/screen/Board/PilotProfile';
import { DetailField } from './src/screen/Board/DetailField';
import { DetailWork } from './src/screen/Board/DetailWork';
import { Volunteer } from './src/screen/Board/Volunteer';
import { WorkReport } from './src/screen/document/WorkReport';
import { ElectronicContract } from './src/screen/Board/ElectronicContract';
import { SettingProfile } from './src/screen/mypage/settingProfile/SettingProfile';
import { FavoriteFilotIndex } from './src/screen/mypage/favorite/FavoriteFilotIndex';
import { MatchingEquipment } from './src/screen/Board/MatchingEquipment';
import { MyProfile } from './src/screen/mypage/settingProfile/MyProfile';
import { Auth } from './src/screen/Auth';
import { JoinInfo } from './src/screen/signUp/JoinInfo';
import { RegDocument } from './src/screen/signUp/RegDocument';
import { MatchingPilot } from './src/screen/Board/MatchingPilot';
import { Request } from './src/screen/Request/Request';
import { OpenRequest } from './src/screen/Request/OpenRequest';
import { AcquaintanceRequest } from './src/screen/Request/acqReq/AcquaintanceRequest';
import { useAppSelector } from './src/redux/store';
import { LoadingModal } from './src/modal/LoadingModal';
import { AcqReqStep1 } from './src/screen/Request/acqReq/AcqReqStep1';
import { HomeIndex } from './src/screen/home/HomeIndex';
import { RequestRouter } from './src/screen/Request/RequestRouter';
import { Board } from './src/screen/Board/Board';
import { ScaneDetailField } from './src/screen/Request/ScaneDetailField';
import { RequestPilot } from './src/screen/Board/RequestPilot';
import { MyInfoEqu } from './src/screen/mypage/myInfo/MyInfoEqu';
//navigator router ;;
// type ToastRef = Toast | null;

export const Router = () => { 
    /** 
        router stack이 추가될때 넘겨야할 params가 있으면 RouterNavigatorParams에 타입을 선언해주세요.
    */
    const Stack = createStackNavigator<RouterNavigatorParams>(); 
    const loading = useAppSelector(state => state.isLoading);
    React.useEffect(()=>{
        setTimeout(()=>{
            try{
                SplashScreen.hide();
            }
            catch(err){
                console.log(err)
            }
        },2000)
    },[])
    

    return(
        <>
            <Stack.Navigator initialRouteName='Auth'>
                {/** page가 추가되면 페이지에 여기에 stack을 추가해주세요. */}

                {/** Auth */}
                <Stack.Screen 
                    name={"Auth"}
                    component={Auth}
                    options={{headerShown:false}}
                />
                {/** MAIN */}
                <Stack.Screen 
                    name={'Main'}
                    component={Main}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name={'Home'}
                    component={HomeIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'RequestRouter'}
                    component={RequestRouter}
                    options={{headerShown:false}}
                />
                {/* <Stack.Screen
                    name={'Board'}
                    component={Board}
                    options={{headerShown:false}}
                /> */}

                {/** USER  */}
                <Stack.Screen // 이용약관
                    name={'Agreements'}
                    component={Agreements}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 로그인
                    name={'SignIn'}
                    component={SignIn}
                    options={{headerShown:false}}
                />
                
                <Stack.Screen // 회원 구분
                    name={'MemberLine'}
                    component={MemberLine}
                    options={{headerShown:false}}
                />
                <Stack.Screen //회원정보 입력
                    name={'JoinInfo'}
                    component={JoinInfo}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'RegDocument'}
                    component={RegDocument}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'Request'}
                    component={Request}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'OpenRequest'}
                    component={OpenRequest}
                    options={{headerShown:false}}
                />
                {/* <Stack.Screen 
                    name={'AcquaintanceRequest'}
                    component={AcquaintanceRequest}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name={'AcqReqStep1'}
                    component={AcqReqStep1}
                    options={{headerShown:false}}
                /> */}

                 {/** board - 이력 및 현황 */}
                <Stack.Screen  // 이력 및 현황 - 현장세부내용
                    name={'DetailField'}
                    component={DetailField}
                    options={{headerShown:false}}
                />

                <Stack.Screen 
                    name={'ScaneDetailField'}
                    component={ScaneDetailField}
                    options={{headerShown:false}}
                />

                <Stack.Screen // 현장지원하기 - 현장세부내용 - 장비 및 조종사 매칭
                    name={'MatchingEquipment'}
                    component={MatchingEquipment}
                    options={{headerShown:false}}
                />
                <Stack.Screen //조종사 요청하기
                    name={'RequestPilot'}
                    component={RequestPilot}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name={'MatchingPilot'}
                    component={MatchingPilot}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 작업세부내용
                    name={'DetailWork'}
                    component={DetailWork}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 지원자현황
                    name={'Volunteer'}
                    component={Volunteer}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 지원자현황 - 장비회사 프로필
                    name={'CompanyProfile'}
                    component={CompanyProfile}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 지원자현황 - 조종사 프로필
                    name={'PilotProfile'}
                    component={PilotProfile}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 지원자현황 - 장비회사 프로필 - 전자계약
                    name={'ElectronicContract'}
                    component={ElectronicContract}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 작업중 - 작업일보
                    name={'WorkReport'}
                    component={WorkReport}
                    options={{headerShown:false}}
                />

                
                
                <Stack.Screen // 지원자 현황
                    name={'ApplicantStatus'}
                    component={ApplicantStatus}
                    options={{headerShown:false}}
                />
                
                {/** mypage */}
                <Stack.Screen  //마이페이지 ROOT
                    name={'MyPage'}
                    component={MyPageIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 현장 - 현장개설하기 & 수정하기
                    name={'OpenConstruction'}
                    component={OpenConstruction}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 즐겨찾기
                    name={'FavoriteList'}
                    component={FavoriteListIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 즐겨찾기 추가
                    name={'FavoriteAdd'}
                    component={FavoriteAdd}
                    options={{headerShown:false}}
                />
                <Stack.Screen //장비회사 - 장비현황 - 장비추가
                    name={'EquimentsAdd'}
                    component={EquimentsAdd}
                    options={{headerShown:false}}
                />
                <Stack.Screen //장비회사 - 장비현황 - 장비추가
                    name={'EquimentsDetail'}
                    component={EquimentsDetail}
                    options={{headerShown:false}}
                />
                <Stack.Screen // (장비) 나의 조종사 관리
                    name={'FavoriteFilotIndex'}
                    component={FavoriteFilotIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen // (건설, 조종사) 나의 정보,
                    name={'MyInfo'}
                    component={MyInfo}
                    options={{headerShown:false}}
                />
                <Stack.Screen // (장비회사) 나의 정보,
                    name={'MyInfoEqu'}
                    component={MyInfoEqu}
                    options={{headerShown:false}}
                />
                <Stack.Screen // (장비) 프로필 설정하기
                    name={'SettingProfile'}
                    component={SettingProfile}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name={'MyProfile'}
                    component={MyProfile}
                    options={{headerShown:false}}
                />
            </Stack.Navigator>
            <Toast config={toastConfig}/>
            <LoadingModal 
                isLoading={loading.isLoading}
            />
        </>
    )
}