import React,{useState} from 'react';
import {ScrollView, TouchableOpacity, View,Image,BackHandler,Alert} from 'react-native';
import {Text} from 'react-native';
import { styles, fontStyle, colors, swiperStyles } from '../../style/style';
import { TextBox } from '../../component/TextBox';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import Swiper from 'react-native-swiper';
import AutoHeightImage from 'react-native-auto-height-image';
import {Dimensions} from 'react-native';
import { HomeIndexType } from '../screenType';
import { LoginIntroModal } from '../../modal/LoginIntroModal';
import { ReqDispatchModal } from '../../modal/ReqDispatchModal';
import { CustomButton } from '../../component/CustomButton';
import { useAppSelector } from '../../redux/store';
import { usePostQuery } from '../../util/reactQuery';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import cusToast from '../../util/toast/CusToast';
// import PushNotification from 'react-native-push-notification'; //push...noti
import { useNavigationState } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

type tempItem = {
	type : number, //리스트타입
	subText : string, //이벤트이름
}

export const HomeIndex = ({setTabIndex}:HomeIndexType) => {

	// const [userType,setUserType] = useState('1')
	const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
	const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
	const {data : reqCheckData , refetch:reqCheckRefetch} = usePostQuery('getConsReqCheck',{mt_idx:mt_idx},'cons/cons_require_check.php');
	const {data : myProfileData, refetch:myProfileRefetch} = usePostQuery('getMyProfileData' , {mt_idx:mt_idx}, 'equip/mypage_info.php');
	const isFocused = useIsFocused();
	const { width } = Dimensions.get('window');
   const [exitApp , setExitApp] = React.useState(false);

	const tempListDate = [
		{type : 1, subText : '굴삭기' },
		{type : 2, subText : '크레인' },
		{type : 3, subText : '굴삭기 2' },
		{type : 1, subText : '굴삭기' },
	]

	const [reqConModal, setReqConModal] = React.useState(false);

	const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

	
  const routes = useNavigationState(state => state.routes);
  // const navigationRouteName = routes.length ? routes[routes.length - 1].name : '';
  // const navigationRoute = routes[routes.length - 1];


  const callScreen = (remoteMessage:any, isDirectMove = false) => {
    console.log('callScreen', remoteMessage.data, isDirectMove)
    console.log('message', remoteMessage.data, isDirectMove)
    let message = (remoteMessage.data.message || remoteMessage.data.body);
    let title = (remoteMessage.data.title);

    // if (remoteMessage.data?.type == 'chat-rev' || remoteMessage.data?.type == 'chat_add') {

    if (isDirectMove) {
      console.log('111111',remoteMessage)
      // if (remoteMessage.data?.type == 'chat-rev' || remoteMessage.data?.type == 'chat-send') {
      //   //채팅수락알림, 메시지도착알림
      //   navigation.navigate('HomeIndex');
      // } else if (remoteMessage.data?.type == 'chat_add' || remoteMessage.data?.type == 'product_edit' || remoteMessage.data?.type == 'product_add') {
      //   //채팅요청알림, 상품금액변경알림
      //   navigation.navigate('HomeIndex');
      // } else if (remoteMessage.data?.type == 'review_add') {
      //   //후기수신
      //   navigation.navigate('HomeIndex');
        
      // }
    } else {
      console.log('22222',remoteMessage)

    }

  }

  /** */
//   const sendLocalNotificationWithSound = (onRemote:any) => {
//     console.log('sendLocalNotificationWithSound', onRemote);

//     // if (Platform.OS == 'ios') {
//     //   PushNotificationIOS.addNotificationRequest({
//     //     id: onRemote.data.notificationId
//     //       ? onRemote.data.notificationId
//     //       : new Date().toString(),
//     //     title: (onRemote.title),
//     //     subtitle: '',
//     //     body: (onRemote.body ? onRemote.body : onRemote.message),
//     //     sound: 'default',
//     //     // sound: 'buzy1.wav',
//     //   });
//     // } else {
//       PushNotification.localNotification({
//         channelId: onRemote.channelId ?? 'default',
//         id: onRemote.data.notificationId,
//         title: (onRemote.title),
//         message: (onRemote.message),
//         soundName: 'default',
//         playSound: true,
//         // smallIcon: 'ic_stat_ic_notification',
//         color: '#FFFFFF',
//         largeIcon: '',
//         largeIconUrl: '',
//         priority: 'high',

//         // bigPictureUrl?: string | undefined;
//         // bigLargeIcon?: string | undefined;
//         // bigLargeIconUrl?: string | undefined;

//         vibrate: true,
//         groupSummary: true,
//         userInfo: onRemote.data,
//         // badge: 0,
//       });
//     // }
//   };


// const fcmSetting = () => {
//     // if (Platform.OS === 'ios') {
//     //   PushNotificationIOS.setApplicationIconBadgeNumber(0);
//     // }

//     PushNotification.configure({
//         /** firebaseToken */
//       onRegister: function (token:any) {
//         console.log('TOKEN:', token);
//       },

//       // (required) Called when a remote is received or opened, or local notification is opened
//       onNotification: async function (notification:any) {
//         console.log('NOTIFICATION 작동여부:', notification);
//         if (typeof notification.id == 'undefined')
//           notification.id = new Date().toString();
//         if (notification.foreground) {

//           // callScreen(notification);
//           if (notification.userInteraction) {
//             //클릭했을때 -> 팝업말고 바로 이동

//             console.log('포그라운드에서 푸시 클릭했을때.');
//             if (notification.id == '') notification.id = new Date().toString();
//             callScreen(notification, true);
//           } else if (notification.data.title) {

//             // //채팅방
//             // if (navigationRouteName == 'MessageRoom' &&
//             //   (navigationRoute.params.items.chr_id == notification.data.room_idx ||
//             //     navigationRoute.params.items.room_id == notification.data.room_idx)) {

//             // } else {
//             //   //내부 노티를 써서 일부러 푸시를 띄움
//             //   sendLocalNotificationWithSound(notification);
//             // }
//             sendLocalNotificationWithSound(notification);
//             // process the notification

//             console.log('포그라운푸시.', navigationRoute, navigationRouteName);
//           }
//         } else {
//           //백그라운드일때는 터치에만 반응 -> ios앱 푸시 눌러서 앱 켯을때도 여기로 들어옴.
//           console.log(
//             '백그라운드 푸시',
//             notification,
//             navigationRoute,
//             // navigation.dangerouslyGetState().index,
//             // navigation.dangerouslyGetState().index.routes,
//           );

//           if (notification.userInteraction) {            
//             callScreen(notification, true);
//           }else{
//             // if (Platform.OS === 'ios') {
//             //   PushNotificationIOS.getApplicationIconBadgeNumber(function (number) {
//             //     PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
//             //   });
//             // }
//           }

          
//         }
//         // notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },

//       // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//       onAction: function (notification:any) {
//         console.log('ACTION:', notification.action);
//         console.log('NOTIFICATION:', notification);

//         // process the action
//       },

//       // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//       onRegistrationError: function (err:any) {
//         console.error(err.message, err);
//       },

//       // IOS ONLY (optional): default: all - Permissions to register.
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },

//       // Should the initial notification be popped automatically
//       // default: true
//       popInitialNotification: true,
//       requestPermissions: true,
//     });
//   }
//   React.useEffect(() => {
//     fcmSetting();

//   }, [])

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

	React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
			// fcmSetting()
			callScreen(remoteMessage)
      //forground 푸시
    });
    return unsubscribe;
  });



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

						<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.MINT_COLOR}]} onPress={() => 
							alertModalOn('해당 서비스는 정식버전 출시 후 오픈예정입니다.')}
						>

							<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>서류자동화</Text>
							<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>서비스</Text>
							<View style={{alignItems:'flex-end'}}>
								<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main4.png')} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={[{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY2,padding:20}]}>
					<Text style={[fontStyle.k_bold, { color: colors.MAIN_COLOR, fontSize: 20, marginBottom: 10 }]}>주요 이벤트</Text>
					{tempListDate.map((item:tempItem,index:number) => {
						return(
							<View key={index}>
								<TextBox 
									type={item.type}
									subText={item.subText}
									rightText={item.type === 1 ? 'dfd' : item.type === 2 ? 'afdasdf' : '121321'}
								/>
							</View>
						)
					})}
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