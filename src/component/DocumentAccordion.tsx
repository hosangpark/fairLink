import React,{useState} from 'react';
import { DocumentAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList, StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { UserInfoCard2 } from './card/UserInfoCard2';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CustomButton } from './CustomButton';


const Sublistbox = ({
    title,
    index,
    item,
}:any)=>{
    const [check,setCheck] = useState(false)
    const [profileimg,setProfileimg] = useState<any>()
    const ModifyImage = (type: any) => {
    if (type == 'camera') {
      launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        maxWidth: 512,
        maxHeight: 512,
        saveToPhotos: true
      }, (res) => {
        if (res.didCancel != true) {
          setProfileimg(res.assets)
        }
      });
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          maxWidth: 512,
          maxHeight: 512,
          selectionLimit: 1,
        },
        (res: any) => {
          if (res.didCancel != true) {
            setProfileimg(res.assets)
          }
        }
      )
    }
    }
    return(
    <View key={index}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{setCheck(!check)}}>
                <Image style={{width:20,height:20,marginRight:10}} source={check?require('../assets/img/ic_check_on.png'):require('../assets/img/ic_check_off.png')}/>
            </TouchableOpacity>
            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:5}]}>
                {item.title}
            </Text>
            {item.registration? 
                <Text style={[fontStyle.f_semibold,DocumnetStyle.MaincolorText]}>
                    [완료]</Text>
                    :
                <Text style={[fontStyle.f_semibold,DocumnetStyle.GraycolorText]}>
                    [미완료]</Text>
            }
        </View>
        {title === '작업일보' ?
        <CustomButton
            action={()=>{console.log('작성하기')}}
            label={'작성하기'}
            style={{backgroundColor : colors.WHITE_COLOR,
            borderRadius:4,
            borderWidth:1,
            borderColor:colors.MAIN_COLOR,
            marginVertical:10,
            height:38,
            padding:0,
            justifyContent:'center'
            }}
            labelStyle={{color : colors.MAIN_COLOR,fontSize:16,}}
        />
        :
        <TouchableOpacity style={{width:92,height:92,marginVertical:20}} onPress={ModifyImage}>
            <Image resizeMode={'cover'} style={{width:'100%',height:'100%'}} source={profileimg?
            {uri:profileimg[0].uri}
            :
            require('../assets/img/b_menu3_off.png')}/>
        </TouchableOpacity>
        }
    </View>
    )
}

export const DocumentAccordion = ({
    title,
    subList,
}:DocumentAccordionType) => {

  const [openbox,setOpenbox] = useState(false)
  
    return(
      <View style={[DocumnetStyle.documentBox,]}>
        <TouchableOpacity style={[DocumnetStyle.documentBoxinTop]} onPress={()=>setOpenbox(!openbox)}>
            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                {title}</Text>
            {openbox?
            <Image style={{width:24,height:24,transform: [{rotate: '180deg'}]}} source={require('../assets/img/ic_dropdown.png')}/>
            :
            <Image style={{width:24,height:24,}} source={require('../assets/img/ic_dropdown.png')}/>
            }
        </TouchableOpacity>
        {openbox&&
        <View style={[DocumnetStyle.documentBoxinBox]}>
            {subList.map((item,index)=>{
            return(
            <Sublistbox
                title={title}
                item={item}
                key={index}
            />
            )
        })}
        </View>
        }
    </View>
    )
}

const DocumnetStyle = StyleSheet.create({
    documentBox:{borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:20},
    documentBoxinTop:{paddingHorizontal:20,paddingVertical:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
    documentBoxinBox:{borderTopWidth:1,borderColor:colors.BORDER_GRAY_COLOR,paddingVertical:30,paddingHorizontal:20},
    MaincolorText:{color:colors.MAIN_COLOR,fontSize:16},
    GraycolorText:{color:colors.GRAY_COLOR,fontSize:16},
})

