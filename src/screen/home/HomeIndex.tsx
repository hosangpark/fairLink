import React from 'react';
import {ScrollView, TouchableOpacity, View,Image} from 'react-native';
import {Text} from 'react-native';
import { styles, fontStyle, colors, swiperStyles } from '../../style/style';
import { TextBox } from '../../component/TextBox';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import Swiper from 'react-native-swiper';
import AutoHeightImage from 'react-native-auto-height-image';
import {Dimensions} from 'react-native';


export const HomeIndex = () => {

	const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
	const { width } = Dimensions.get('window');
	const swiperPagination = (index : number,total:number) => {
		// await setSwiperState({
		// 	...swiperState,
		// 	page : index+1,
		// })

		return(
			<View style={[swiperStyles.swiperIndexArea]}>
				<Text style={[fontStyle.f_regular,{color:colors.MAIN_COLOR,fontSize:18}]}>{index+1} / {total}</Text>
			</View>
		)
	}

	return (
		<ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
			<View style={[styles.bottomBorder,{backgroundColor:colors.WHITE_COLOR,padding:20}]}>
				<View style={[{flexDirection: 'row', alignItems: 'flex-end'}]}>
					<Text style={[fontStyle.k_bold, { color: colors.MAIN_COLOR, fontSize: 25 }]}>페어링크</Text>
					<Text style={[fontStyle.s_regular, { color: colors.MAIN_COLOR, fontSize: 16, marginLeft: 8 }]}>중장비 배차 시범서비스</Text>
				</View>
			</View>
			<View style={[styles.mainMenuWrapper,{backgroundColor:colors.WHITE_COLOR}]}>
				<View style={{flexDirection:'row',flex:1}}>
					<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.BLUE_COLOR}]} onPress={() => navigation.navigate('Video') }>
						<View>
							<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>배차</Text>
							<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>요청하기</Text>
						</View>
						<View style={{alignItems:'flex-end'}}>
							<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main1.png')} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.SKY_BLUE_COLOR}]} onPress={() => navigation.navigate('Board') }>
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
					<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.DEPP_SKY_BLUE}]} onPress={() => navigation.navigate('Release') }>
						<View>
							<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}>마이페이지</Text>
							<Text style={[fontStyle.k_bold,{fontSize:18,color:colors.WHITE_COLOR}]}></Text>
						</View>
						<View style={{alignItems:'flex-end'}}>
							<Image style={styles.mainMenuImg} source={require('../../assets/img/ic_main3.png')} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.mainMenu,{backgroundColor:colors.MINT_COLOR}]} onPress={() => navigation.navigate('MyPage') }>
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
				<TextBox 
					type={2}
					boldText = '03.03'
					subText = '굴삭기'
					rightText = '[모집완료]'
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
				/>
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
	);
};