import React,{useState} from 'react';
import { CustomAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { UserInfoCard } from './card/UserInfoCard';


export const CustomAccordion = ({
    title,
    total,
    action,
}:CustomAccordionType) => {
  const [items,setItems] = useState([
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'[경남]',
      rating:23,
      score:5,
      recEmpCount:64,
      userName:'김경태',
      userProfileUrl:'',
    },
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'[경남]',
      rating:23,
      score:5,
      recEmpCount:64,
      userName:'김경태',
      userProfileUrl:'',
    },
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'[경남]',
      rating:23,
      score:5,
      recEmpCount:64,
      userName:'김경태',
      userProfileUrl:'',
    },
  ])

    return(
      <View style={{}}>
        <TouchableOpacity 
            style={{flexDirection:'row',justifyContent:'space-between',height:60,backgroundColor:colors.WHITE_COLOR,alignItems:'center',paddingHorizontal:20}}
            onPress={()=>{
                if(action)action();
            }}
        >
          <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>{title}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[fontStyle.f_medium,{color:colors.FONT_COLOR_BLACK2}]}>
              총 <Text style={{color:colors.MAIN_COLOR}}>{total}</Text>건
            </Text>
            <Image style={{width:24,height:24,marginLeft:15,transform:[{rotate:'180deg'}]}} source={require('../assets/img/ic_dropdown.png')}/>
          </View>
        </TouchableOpacity>
          <FlatList
            style={{ paddingHorizontal: 20 }}
            data={items}
            initialNumToRender={8}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NodataView />}
            // ListFooterComponent={isListLoading ? <LoadingIndicator /> : null}
            renderItem={({ item }) => (
              <UserInfoCard
                  empName={item.empName}
                  jobType={item.jobType}
                  location={item.location}
                  rating={item.rating}
                  score={item.score}
                  recEmpCount={item.recEmpCount}
                  userName={item.userName}
                  userProfileUrl={item.userProfileUrl}
              />
            )}
          />

      </View>
    )
}

