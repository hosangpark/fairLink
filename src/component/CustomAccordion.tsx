import React,{useState} from 'react';
import { CustomAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { UserInfoCard } from './card/UserInfoCard';
import { UserInfoCard2 } from './card/UserInfoCard2';


export const CustomAccordion = ({
    title,
    data,
    action,
}:CustomAccordionType) => {
  const [open,setOpen] = useState(false)
  

    return(
      <View style={{}}>
        <TouchableOpacity 
            style={{flexDirection:'row',justifyContent:'space-between',height:60,backgroundColor:colors.WHITE_COLOR,alignItems:'center',paddingHorizontal:20}}
            onPress={()=>{
                if(action)action(); setOpen(!open)
            }}
        >
          <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>{title}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[fontStyle.f_medium,{color:colors.FONT_COLOR_BLACK2}]}>
              총 <Text style={{color:colors.MAIN_COLOR}}>{data.length}</Text>건
            </Text>
            <Image style={{width:24,height:24,marginLeft:15,transform:[{rotate:'180deg'}]}} source={require('../assets/img/ic_dropdown.png')}/>
          </View>
        </TouchableOpacity>
          {open&&
          <View>
          {data.map((item:any,index)=>{
            return(
              <UserInfoCard2
              key={index}
              jobType={item.jobType}
              location={item.location}
              score={item.score}
              userName={item.userName}
              workType={item.workType}
              complete={item.complete}
              />
            )
          })}
          </View>
          }


          {/* <FlatList
            style={{ paddingHorizontal: 20 }}
            data={items}
            initialNumToRender={8}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NodataView />}
            // ListFooterComponent={isListLoading ? <LoadingIndicator /> : null}
            renderItem={({ item }) => (
              <UserInfoCard2
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
          /> */}

      </View>
    )
}

