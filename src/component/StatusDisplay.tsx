import React,{useState} from "react";
import { View, Text, Image,TouchableOpacity } from 'react-native';
import { colors, fontStyle } from "../style/style";
import { ImageModal } from "../modal/ImageModal";

type StatusDisplayProps = {
    name: string,
    type: string, // 0: 미첨부, 1: 승인중, 2: 승인완료
    file_url: string, // 0: 미첨부, 1: 승인중, 2: 승인완료
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({name, type,file_url}) => {
    const images = [require('../assets/img/ic_circle_on.png'), require('../assets/img/ic_circle_off.png')];
    const image1 = images[type === "0" ? 0 : 1];
    const image2 = images[type === "1" ? 0 : 1];
    const image3 = images[type === "2" ? 0 : 1];

    const [show,setshow] = useState(false)

    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, paddingVertical: 10 }}>
            <TouchableOpacity style={{flex: 5,flexShrink:1}} onPress={()=>{
                if(file_url !== ""){
                    setshow(true)
                    console.log(file_url)
                }
            }}>
            <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK,}]}>{name}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 4, justifyContent: 'space-around' }}>
                <Image style={{ width: 14, height: 14, marginHorizontal: 4 }} source={ image1 }/>
                <Image style={{ width: 14, height: 14, marginHorizontal: 4 }} source={ image2 }/>
                <Image style={{ width: 14, height: 14, marginHorizontal: 4 }} source={ image3 }/>
            </View>
            <ImageModal
                show={show}
                action={()=>{}}
                hide={()=>{setshow(false)}}
                imgrl={file_url}
            />
        </View>
    )
}