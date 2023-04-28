import React,{useState} from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';
import { StatusDisplayHeader } from '../../../component/StatusDisplayHeader';
import { StatusDisplay } from '../../../component/StatusDisplay';
import { ImageModal } from '../../../modal/ImageModal';

export const RequiredDocuments = (route:any) => {

    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, paddingHorizontal: 20, paddingBottom: 20 }}>
            <View style={{ marginVertical: 20}}>
                <StatusDisplayHeader category={'차량서류'} />
                {route.DocData.차량서류.map((items:{title:string,file_url:string,file_check:string},i:number)=>{
                    return(
                        <StatusDisplay name={items.title} type={items.file_check} key={i} file_url={items.file_url}/>
                    )
                })}
            </View>
            <View style={{ marginVertical: 20}}>
                <StatusDisplayHeader category={'안전교육'} />
                {route.DocData.안전교육.map((items:{title:string,file_url:string,file_check:string},i:number)=>{
                    return(
                        <StatusDisplay name={items.title} type={items.file_check} key={i} file_url={items.file_url}/>
                    )
                })}
            </View>
            <View style={{ marginVertical: 20}}>
                <StatusDisplayHeader category={'자격증'} />
                {route.DocData.자격증.map((items:{title:string,file_url:string,file_check:string},i:number)=>{
                    return(
                        <StatusDisplay name={items.title} type={items.file_check} key={i} file_url={items.file_url}/>
                    )
                })}
            </View>
        </View>
    )
}