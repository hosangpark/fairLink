import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';
import { StatusDisplayHeader } from '../../../component/StatusDisplayHeader';
import { StatusDisplay } from '../../../component/StatusDisplay';

type RequiredDocumentsType = {
    doc : {
        [key:string]:{
            file_check? : string,
            file_url? : string,
            title? : string,
        }[]
    }
}

export const RequiredDocuments = ({doc}:RequiredDocumentsType) => {

    const [titleList, setTitleList] = React.useState<string[]>([]);
    const [valueList, setValueList] = React.useState<{ file_check?: string; file_url?: string; title?: string }[][]>([]);


    React.useEffect(()=>{
        const keyList = Object.keys(doc);

        const valueList : { file_check?: string; file_url?: string; title?: string }[][] = [];
        // console.log(Object.values(doc[keyList[0]]));
        keyList.map((item) => {
            valueList.push(doc[item]);
        })

        setTitleList([...keyList]);
        setValueList([...valueList]);


    },[])

    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, paddingHorizontal: 20, paddingBottom: 20,flex:1 }}>
            {titleList.map((titleItem,index) => {
                return(
                    <View style={{ marginVertical: 20}}>
                        <StatusDisplayHeader category={titleItem} />
                        {valueList[index].map((item,index) => {
                            console.log(item);
                            return(
                                <StatusDisplay name={item.title ? item.title : ''} type={item.file_check ? item.file_check : '1'} file_url={item.file_url ? item.file_url : ''}/>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}