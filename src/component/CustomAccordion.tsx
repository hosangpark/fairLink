import React,{useState} from 'react';
import { CustomAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { BoardCard } from './card/BoardCard';


export const CustomAccordion = ({
    data,
    userType,
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
          <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>{data.title}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[fontStyle.f_medium,{color:colors.FONT_COLOR_BLACK2}]}>
              총 <Text style={{color:colors.MAIN_COLOR}}>{data.count}</Text>건
            </Text>
            {open?
            <Image style={{width:24,height:24,marginLeft:15,transform:[{rotate:'180deg'}]}} source={require('../assets/img/ic_dropdown.png')}/>
            :
            <Image style={{width:24,height:24,marginLeft:15,}} source={require('../assets/img/ic_dropdown.png')}/>
            }
          </View>
        </TouchableOpacity>
          {open&& data.list!==null?
          <View>
            {data.list.map((item:any,index)=>{
              return(
                <BoardCard
                  key={index}
                  item={item}
                  title={data.title}
                />
              )
            })}
          </View>
          :
          null
          }
      </View>
    )
}

