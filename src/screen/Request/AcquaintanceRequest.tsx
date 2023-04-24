import React,{useState} from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle } from "../../style/style";
import { UserInfoCard } from "../../component/card/UserInfoCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../type/routerType";
import { CustomButton } from "../../component/CustomButton";

export const AcquaintanceRequest = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [check,setCheck] = useState('0')
    const Checkbridge = (e:string)=>{
      if(check==e){
        setCheck('0')
      } else {
        setCheck(e)
      }
    }
    return (
      <SafeAreaView style={{flex:1}}>
        <BackHeader title="지인배차 회사선택" />
        <ScrollView style={{flex:1}}>
          <View style={{ backgroundColor: colors.WHITE_COLOR, paddingHorizontal: 40,paddingVertical:10,alignItems:'center'}}>
              <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK,fontSize:16,lineHeight:25,textAlign:'center'}]}>등록된 즐겨찾기 장비회사 중에서 {"\n"}배차요청할 회사를 선택해주세요.</Text>
          </View>
          <View style={{margin:20}}>
            <View style={{marginVertical:15}}>
              <UserInfoCard 
                  index="1"
                  empName='힘찬중기'
                  jobType='1'
                  location='[경남]'
                  rating={23}
                  score={5}
                  recEmpCount={64}
                  userName='김경태'
                  userProfileUrl=''
                  isDelete={false}
                  isCheck={check}
                  action={e=>Checkbridge(e)}
              />
            </View>
            <View style={{marginVertical:15}}>          
              <UserInfoCard 
                  index="2"
                  empName='힘찬중기'
                  jobType='1'
                  location='[경남]'
                  rating={23}
                  score={5}
                  recEmpCount={64}
                  userName='김경태'
                  userProfileUrl=''
                  isDelete={false}
                  isCheck={check}
                  action={e=>Checkbridge(e)}
              />
            </View>
          </View>

        </ScrollView>
        <CustomButton
          style={{}}
          label='선택완료'
          action={()=>{}}
        />
      </SafeAreaView>
    )
}