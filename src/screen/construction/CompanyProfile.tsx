import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { CustomWaveBox } from "../../component/CustomWaveBox";

export const CompanyProfile = () => {

    return (
        <ScrollView>
            <BackHeader title="장비회사 프로필"/>
            <ProfileInfoCard
                index = '0'
                jobType = '차주 겸 조종사' 
                userProfileUrl = '' 
                userName = '정우성' 
                score = {4.4} 
                rating = {41} 
                recEmpCount = {6} 
                location = '경남 진주시' 
                age = '42' 
                gender = '남' 
                phone = '010-1123-1111'
            />
            
            
            



        </ScrollView>
    )
}