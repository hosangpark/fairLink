import React,{useState} from 'react';
import {ScrollView, TouchableOpacity, View,Image,BackHandler,Alert} from 'react-native';
import {Text} from 'react-native';
import { styles, fontStyle, colors, swiperStyles } from '../../style/style';
import { TextBox } from '../../component/TextBox';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import Swiper from 'react-native-swiper';
import AutoHeightImage from 'react-native-auto-height-image';
import {Dimensions} from 'react-native';
import { HomeIndexType } from '../screenType';
import { LoginIntroModal } from '../../modal/LoginIntroModal';
import { ReqDispatchModal } from '../../modal/ReqDispatchModal';
import { CustomButton } from '../../component/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePostMutation, usePostQuery } from '../../util/reactQuery';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import cusToast from '../../util/toast/CusToast';

import { useNavigationState } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { PilotWorkListModal } from '../../modal/PilotWorkListModal';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { TextBoxType } from '../../component/componentsType';



export const HomeIndex = ({setTabIndex}:HomeIndexType) => {

	// const [userType,setUserType] = useState('1')
	const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
	const dispatch = useAppDispatch();
	const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
	const {data : reqCheckData , refetch:reqCheckRefetch} = usePostQuery('getConsReqCheck',{mt_idx:mt_idx},'cons/cons_require_check.php');
	const {data : myProfileData, refetch:myProfileRefetch} = usePostQuery('getMyProfileData' , {mt_idx:mt_idx}, 'equip/mypage_info.php');
	
	const pilotWorkCheckMutation = usePostMutation('pilotWorkCheck','pilot/pilot_work_check.php');
	const pilotWorkListMutation = usePostMutation('pilotWorkList' , 'pilot/pilot_work_list.php');

	const isFocused = useIsFocused();
	const { width } = Dimensions.get('window');
	const [exitApp , setExitApp] = React.useState(false);

	const EventList = usePostMutation('getEventListEventList' , 'home_event_list.php');
	const [tempListDate,settempListDate] = useState([
		{
			push_idx : "1", 
			type : '굴삭기',
			date:"05.10",
			title:"굴삭기",
			content:"content",
			link1:"link1",
			link2:"link1",
			link3:"link1",
		},
	])

	const [reqConModal, setReqConModal] = React.useState(false);
	const [pilotWorkModal, setPilotWorkModal] = React.useState(false);
	const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

	
	const getEventList = async() =>{
			dispatch(toggleLoading(true));
			const {data, result, msg} = await EventList.mutateAsync({mt_idx:mt_idx});
			dispatch(toggleLoading(false));

			if(result === 'true'){
					settempListDate(data.data);
			}
	}

	const alertModalOn = (msg:string, type?:string) => {
		setAlertModal({
			...alertModal,
			alert:true,
			msg:msg,
			type:type?type : '',
		})
	}
	const alertModalOff = () => {
		setAlertModal(()=>initialAlert);
	}
	const alertAction = () => {
		if(alertModal.type === 'none_req_con'){
			navigation.navigate('OpenConstruction',{isData:false});
		}
		if(alertModal.type === 'none_profile'){
			navigation.navigate('SettingProfile');
		}
	}
	const reqConModalHide = () =>{
		setReqConModal(false);
	}

	const tempAction = () => {
		console.log('d')
	}

	const reqConHandler = () => {
		console.log(mt_type);
		if(mt_type === '1'){
			if(reqCheckData){
				const reqCheck = reqCheckData.data.data.require_check;

				if(reqCheck === 'Y'){
					setReqConModal(true)
				}
				else{
					alertModalOn(`개설된 현장이 없습니다.\n현장개설을 먼저 해주세요.`,'none_req_con');
				}
			}
		}
		else if(mt_type === '2'){
			if(myProfileData){

				const profileCheck = myProfileData.data.data.profile_check;


				if(profileCheck === 'Y'){
					if(setTabIndex)setTabIndex(2);
					navigation.navigate('Request');
				}
				else{
					alertModalOn('작성된 프로필 정보가 없습니다.\n프로필 작성을 먼저해주세요.','none_profile');
				}
			}
		}
		else if(mt_type === '4'){
			if(myProfileData){

				const profileCheck = myProfileData.data.data.profile_check;


				if(profileCheck === 'Y'){
					if(setTabIndex)setTabIndex(2);
					navigation.navigate('Request');
				}
				else{
					alertModalOn('작성된 프로필 정보가 없습니다.\n프로필 작성을 먼저해주세요.','none_profile');
				}
			}
		}
	}

	const pilotCheckHandler = async () => {
		const {data,result,msg} = await pilotWorkCheckMutation.mutateAsync({
			mt_idx : mt_idx,
		});

		if(result === 'true'){
			if(data.data.work_check === 'N'){
				alertModalOn('조종사 또는 차주 및 장비업체만 이용가능한 메뉴입니다.');
			}
			else if(data.data.work_check === 'Y'){
				if(setTabIndex)setTabIndex(5);
				navigation.navigate('Document',{cdwt_idx:data.data.cdwt_idx});
			}
			else{
				setPilotWorkModal(true);
			}
		}
		else{
			alertModalOn(msg,'');
		}
	}

	const swiperPagination = (index : number,total : number) => { //스와이퍼 indexing
		return(
			<View style={[swiperStyles.swiperIndexArea]}>
				<Text style={[fontStyle.f_regular,{color:colors.MAIN_COLOR,fontSize:18}]}>{index+1} / {total}</Text>
			</View>
		)
	}

	const backAction = () => {
        var timeout;
        let tmp = 0;
           if(tmp==0){
              if ((exitApp == undefined || !exitApp) && isFocused) {
                 cusToast("한번 더 누르시면 종료됩니다");
                 setExitApp(true);
                 timeout = setTimeout(
                       () => {
                       setExitApp(false);
                       },
                       4000
                 );
              } else {
                // appTimeSave();
				if(timeout) clearTimeout(timeout);
                BackHandler.exitApp();  // 앱 종료
              }
              return true;
           }
	}

	React.useEffect(()=>{
			const backHandler = BackHandler.addEventListener(
					"hardwareBackPress",
					backAction
			);
			if(!isFocused){
					backHandler.remove();
			}
	},[isFocused,exitApp])

	React.useEffect(()=>{
		if(isFocused && setTabIndex){
			setTabIndex(1);
			reqCheckRefetch();
		}
	},[isFocused])

	React.useEffect(()=>{
		if(reqCheckData){
			// console.log("reqCheckData",reqCheckData);
		}
	},[reqCheckData])

	useFocusEffect(
		React.useCallback(() => {
				getEventList()
				return () => {}
		}, []),
	);

	return (
		<View style={{flex:1}}>
			<ReqDispatchModal 
				show={reqConModal}
				hide={reqConModalHide}
				action={tempAction}
				setTabIndex={setTabIndex}
			/>
			<AlertModal 
				show={alertModal.alert}
				hide={alertModalOff}
				msg={alertModal.msg}
				action={alertAction}
				type={alertModal.type}
			/>
			{/* {pilotWorkModal && */}
				<PilotWorkListModal 
					show={pilotWorkModal}
					hide={()=>setPilotWorkModal(false)}
					alertModalOn={alertModalOn}
					setTabIndex={setTabIndex}
				/>
			{/* } */}
			<ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
				<View style={[styles.bottomBorder,{backgroundColor:colors.WHITE_COLOR,padding:20}]}>
					<View style={[{flexDirection: 'row', alignItems: 'flex-end'}]}>
						<Text style={[fontStyle.k_bold, { color: colors.MAIN_COLOR, fontSize: 25 }]}>페어링크</Text>
						<Text style={[fontStyle.s_regular, { color: colors.MAIN_COLOR, fontSize: 16, marginLeft: 8 }]}>중장비 배차 시범서비스</Text>
					</View>
				</View>
				<View style={[styles.mainMenuWrapper,{backgroundColor:colors.WHITE_COLOR}]}>
					<View style={{flexDirection:'row',flex:1}}>
						{mt_type === '1' ?
							<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.BLUE_COLOR}]} onPress={reqConHandler}>
								<View>
									<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>배차</Text>
									<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>요청하기</Text>
								</View>
								<View style={{alignItems:'flex-end'}}>
									<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main1.png')} />
								</View>
							</TouchableOpacity>
						:	
							<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.BLUE_COLOR}]} onPress={()=>{reqConHandler()}}>
								<View>
									<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>현장</Text>
									<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>지원하기</Text>
								</View>
								<View style={{alignItems:'flex-end'}}>
									<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main1.png')} />
								</View>
							</TouchableOpacity>
						}
						<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.SKY_BLUE_COLOR}]} onPress={() => {if(setTabIndex)setTabIndex(3),navigation.navigate('Board')} }>
							<View>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>배차이력 및</Text>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>현황</Text>
							</View>
							<View style={{alignItems:'flex-end'}}>
								<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main2.png')} />
							</View>
						</TouchableOpacity>
					</View>
					<View style={{flexDirection:'row',flex:1}}>
						<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.DEPP_SKY_BLUE}]} onPress={()=>{if(setTabIndex)setTabIndex(4); navigation.navigate('MyPage')}}>
							<View>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>마이페이지</Text>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}></Text>
							</View>
							<View style={{alignItems:'flex-end'}}>
								<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main3.png')} />
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.MINT_COLOR}]} onPress={() =>{ 
							if(mt_type === '1'){
								alertModalOn('해당 서비스는 정식버전 출시 후 오픈예정입니다.')
							}
							else{
								pilotCheckHandler();
								
							}
						}}>
							{mt_type === '1'?
							<View>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>서류자동화</Text>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>서비스</Text>
							</View>
							:
							<View>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>작업일보</Text>
								<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>작성</Text>
							</View>	
							}
							<View style={{alignItems:'flex-end'}}>
								<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main4.png')} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={[{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY2,padding:20}]}>
					<Text style={[fontStyle.k_bold, { color: colors.MAIN_COLOR, fontSize: 20, marginBottom: 10 }]}>주요 이벤트</Text>
					{tempListDate.length === 0 ?
						<Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>생성된 주요 이벤트가 없습니다.</Text>
					:
						tempListDate.slice(0, 5).map((item:TextBoxType,index:number) => {
							return(
								<View key={index}>
									<TextBox 
										push_idx={item.push_idx}
										type={item.type}
										date={item.date}
										title={item.title}
										content={item.content}
										link1={item.link1}
										link2={item.link2}
										link3={item.link3}
									/>
								</View>
							)
						})
					}
					{/* <TextBox 
						type={2}
						boldText = '03.03'
						subText = '굴삭기'
						// rightText = '[모집완료]'
						rightText = {type ===1 ? 'dfd' : }
					/>
					<TextBox 
						type={1}
						boldText = '03.01'
						subText = '크레인 작업'
						rightText = '[모집중]'
					/>
					<TextBox 
						type={4}
						boldText = '02.28'
						subText = '크레인 작업'
						rightText = '[작업완료]'
					/> */}
				</View>
				
				
				<View style={swiperStyles.swiperWrapper}>
					<Swiper
						style={{height:Dimensions.get('window').width * 0.65}}
						renderPagination={swiperPagination}
					>
						<View style={swiperStyles.swiperSlide}>
							<AutoHeightImage width={width}  style={swiperStyles.swiperImageWrapper} source={require('../../assets/img/main_slide_1.png')}/>
						</View>
						<View style={swiperStyles.swiperSlide}>
							<AutoHeightImage  width={width} style={swiperStyles.swiperImageWrapper} source={require('../../assets/img/main_slide_2.png')}/>
						</View>
					</Swiper>
				</View>
			</ScrollView>
			{/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
			<CustomButton
					action={()=>{setUserType('1')}}
					label={'건설회사'}
					style={{...styles.whiteButtonStyle,flex:1,marginRight:10}}
					labelStyle={styles.whiteButtonLabelStyle}
			/>
			<CustomButton
					action={()=>{setUserType('2')}}
					label={'조종사'}
					style={{flex:1}}
			/>
			</View> */}
		</View>
	);
};