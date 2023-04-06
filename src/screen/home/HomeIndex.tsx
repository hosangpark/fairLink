import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import { styles, fontStyle, colors } from '../../style/style';
import { TextBox } from '../../component/TextBox';

export const HomeIndex = ({navigation}:any) => {

	return (
		<ScrollView style={{ flex:1, margin: 20, }}>
			<View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 25,}}>
				<Text style={[fontStyle.f_bold, { color: colors.MAIN_COLOR, fontSize: 25 }]}>페어링크</Text>
				<Text style={[fontStyle.f_medium, { color: colors.MAIN_COLOR, fontSize: 16, marginLeft: 8 }]}>중장비 배차 시범서비스</Text>
			</View>
			<View style={[styles.mainMenuWrapper]}>
				<TouchableOpacity onPress={() => navigation.navigate('Video') }>
					<View style={[styles.mainMenu]}>
						<Text>이미지</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Board') }>
					<View style={[styles.mainMenu]}>
						<Text>이미지</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Release') }>
					<View style={[styles.mainMenu]}>
						<Text>이미지</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('MyPage') }>
					<View style={[styles.mainMenu]}>
						<Text>이미지</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={{flex:1}}>
				<Text style={[fontStyle.f_bold, { color: colors.MAIN_COLOR, fontSize: 20, marginBottom: 10 }]}>주요 이벤트</Text>
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
		</ScrollView>
	);
};