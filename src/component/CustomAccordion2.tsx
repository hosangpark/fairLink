import React,{useState} from 'react';
import { CustomAccordionType2 } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { BoardCard } from './card/BoardCard';
import { UserInfoCard } from './card/UserInfoCard';


export const CustomAccordion2 = ({
    title,
    data,
    subtitle,
    action,
}:CustomAccordionType2) => {
  const [open,setOpen] = useState(false)
  

    return(
      <View style={{borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR}}>
        <TouchableOpacity 
            style={{flexDirection:'row',justifyContent:'space-between',height:60,backgroundColor:colors.WHITE_COLOR,alignItems:'center',paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR}}
            onPress={()=>{
                if(action)action(); setOpen(!open)
            }}
        >
          <View>
          <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>{title}</Text>
          <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.MAIN_COLOR}]}>{subtitle}</Text>
          </View>
          {open?
          <Image style={{width:24,height:24,marginLeft:15,transform:[{rotate:'180deg'}]}} source={require('../assets/img/ic_dropdown.png')}/>
          :
          <Image style={{width:24,height:24,marginLeft:15,}} source={require('../assets/img/ic_dropdown.png')}/>
          }
        </TouchableOpacity>
          {open&&
          <View>
          {data.map((item:any,index)=>{
            return(
              <View style={{padding:20}} key={index}>
                {/* <UserInfoCard
                  index={item.index}
                  empName={item.empName}
                  jobType={item.jobType}
                  location={item.location}
                  rating={item.rating}
                  recEmpCount={item.recEmpCount}
                  score={item.score}
                  userName={item.userName}
                  userProfileUrl={item.userProfileUrl}
                  isDelete={false}
                  isFavorite={'0'}
                  action={()=>{}}
                /> */}
              </View>
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

