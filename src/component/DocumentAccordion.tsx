import React,{useState} from 'react';
import { DocumentAccordionType } from './componentsType';
import { Text, TouchableOpacity, View,Image,FlatList, StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { NodataView } from './NodataView';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CustomButton } from './CustomButton';
import { ImageModal } from '../modal/ImageModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';
import { DocumentRouterNavigatorParams } from '../../type/DocumentRouterType';
import { MarginCom } from './MarginCom';
import { useAppSelector } from '../redux/store';
import { PdfViewerModal } from '../modal/PdfViewerModal';
import { AlertModal } from '../modal/AlertModal';

type SublistBoxType = {
    bigTitle : string,
    title? : string,
    index?: string,
    fileuri? : string,
    filecheck? : string,
    checkFileList : string[],
    checkFileHandler : (uri:string, type : 'add'|'del',title:string) => void,
    cdwt_idx? : string,
    cdwt_date? : string,
}

const Sublistbox = ({
    bigTitle,
    title,
    index,
    fileuri,
    filecheck,
    checkFileList,
    checkFileHandler,
}:SublistBoxType)=>{
    // const [check,setCheck] = useState(false)
    const [show,setshow] = useState<boolean>(false)
    const {mt_type} = useAppSelector(state=>state.userInfo);
    return(
    <View key={index}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{
                const isCheck = checkFileList.filter(el=>el === fileuri).length !== 0;
                if(fileuri && title){
                    if(isCheck){
                        checkFileHandler(fileuri,'del',bigTitle);
                    }
                    else{
                        checkFileHandler(fileuri,'add',bigTitle)
                    }
                }
            }}>
                <Image style={{width:20,height:20,marginRight:10}} source={checkFileList.filter(el=>el === fileuri).length !== 0 ?require('../assets/img/ic_check_on.png'):require('../assets/img/ic_check_off.png')}/>
            </TouchableOpacity>
            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:5,flexShrink:1}]}>
                {title}
            </Text>
            {filecheck == "0" ? 
                <Text style={[fontStyle.f_semibold,DocumnetStyle.GraycolorText]}>
                    [미등록]
                </Text>
            : filecheck === '1' ? 
                <Text style={[fontStyle.f_semibold,DocumnetStyle.GraycolorText]}>
                    [승인중]
                </Text>
            :
                <Text style={[fontStyle.f_semibold,DocumnetStyle.MaincolorText]}>
                    [완료]
                </Text>
            }
        </View>
        {(title === '작업일보' && mt_type !== '1') ?
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
                labelStyle={{color : colors.MAIN_COLOR,fontSize:16}}
            />
        :
        <TouchableOpacity style={{width:92,height:92,marginVertical:20}} onPress={()=>{setshow(true)}}>
            <Image resizeMode={'cover'} style={{width:'100%',height:'100%'}} source={fileuri==""?
            require('../assets/img/b_menu3_off.png')
            :
            {uri:fileuri}
            }/>
        </TouchableOpacity>
        }
        {fileuri &&
            <ImageModal
                show={show}
                action={()=>{}}
                hide={()=>{setshow(false)}}
                imgrl={fileuri}
            />
        }
    </View>
    )
}

export const DocumentAccordion = ({
    title,
    subList,
    allCheck,
    checkFileList,
    checkFileHandler,
}:DocumentAccordionType) => {

    const {mt_type} = useAppSelector(state => state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & DocumentRouterNavigatorParams>>();

    const [openbox,setOpenbox] = useState(false);
    const [pdfViewerModal, setPdfViewerModal] =React.useState(false);
    const [selPdfUrl, setSelPdfUrl] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false);

    React.useEffect(()=>{
        if(title === '계약 서류' || title === '작업일보'){
            console.log(subList);
        }
    },[])
  
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
        {openbox &&
            <>
            {title !== '계약 서류' ? 
            <>
                {subList.length === 0 && title === '작업일보' ? 
                    <View style={{padding:20, alignItems:'center',justifyContent:'center'}}>
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{`작성된 작업일보가 없습니다.\n 작업일보를 작성해주세요.`}</Text>
                        <CustomButton
                            action={()=>{
                                subList.length == 0?
                                setAlertModal(true)
                                :
                                navigation.navigate('Document',{cdwt_idx : subList[0].cdwt_idx})
                            }}
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
                            labelStyle={{color : colors.MAIN_COLOR,fontSize:16}}
                        />
                    </View>
                : mt_type === '1' && title === '작업일보' ? 
                    subList.length === 0 ? 
                        <View style={[DocumnetStyle.documentBoxinBox]}>
                            <Text>작성된 작업일보가 존재하지 않습니다.</Text>
                        </View>
                    :
                    <View>
                        {PdfViewerModal &&
                            <PdfViewerModal 
                                show={pdfViewerModal}
                                hide={()=>{setPdfViewerModal(false)}}
                                action={()=>{}}
                                pdfUrl={selPdfUrl}
                                setSelPdfUrl={setSelPdfUrl}
                            />
                        }
                        <View style={[DocumnetStyle.documentBoxinBox]}>
                            <TouchableOpacity 
                            onPress={()=>{
                                const keyName = 'document_dailywork'

                                allCheck(keyName,title)
                            }}
                            style={{marginBottom:20}}
                            >
                                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.MAIN_COLOR,textAlign:'right'}]}>전체선택</Text>
                            </TouchableOpacity>
                            {subList.map((item,index) => {
                                return(
                                    <View key={index}>
                                        {item.pdf_url !== '' &&
                                            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', marginBottom:20}} key={index}>
                                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                                    <TouchableOpacity onPress={()=>{
                                                        const isCheck = checkFileList.filter(el=>el === item.pdf_url).length !== 0;
                                                        if(item.pdf_url && title){
                                                            if(isCheck){
                                                                checkFileHandler(item.pdf_url,'del',title);
                                                            }
                                                            else{
                                                                checkFileHandler(item.pdf_url,'add',title)
                                                            }
                                                        }
                                                    }}>
                                                        <Image style={{width:20,height:20,marginRight:10}} source={checkFileList.filter(el=>el === item.pdf_url).length !== 0 ?require('../assets/img/ic_check_on.png'):require('../assets/img/ic_check_off.png')}/>
                                                    </TouchableOpacity>
                                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{item.cdwt_date} 작업일지</Text>
                                                </View>
                                                <TouchableOpacity onPress={()=>{
                                                    if(item.pdf_url){
                                                        setSelPdfUrl(item.pdf_url);
                                                        setPdfViewerModal(true);
                                                    }
                                                }}>
                                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.MAIN_COLOR}]}>보기</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                :
                    <View style={[DocumnetStyle.documentBoxinBox]}>
                        {subList.length !== 0 ? 
                        <>
                        <TouchableOpacity onPress={()=>{
                            const keyName = title === '장비(차량) 서류' ? 'document_equip' :
                                title === '자격 및 기타 서류' ? 'document_qualification' : 
                                title === '계약 서류' ? 'document_contract' : 
                                'document_dailywork'

                            allCheck(keyName,title)
                        }}>
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.MAIN_COLOR,textAlign:'right'}]}>전체선택</Text>
                        </TouchableOpacity>
                        <MarginCom mb={5} />
                        {subList.map((item,index)=>{
                        return(
                            <Sublistbox
                                bigTitle={title}
                                title={item.title}
                                filecheck={item.file_check}
                                fileuri={item.file_url}
                                key={index}
                                checkFileList={checkFileList}
                                checkFileHandler={checkFileHandler}
                            />
                        )
                        })}
                    </>
                    :
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>첨부된 서류가 존재하지 않습니다.</Text>
                    }
                    
                    </View>
                }
            </>
            :
            <View style={[DocumnetStyle.documentBoxinBox]}>
                {subList[0].pdf_url === '' ?
                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>작성된 계약 서류가 존재하지 않습니다.</Text>
                :   
                    <View>
                        <TouchableOpacity>
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.MAIN_COLOR,textAlign:'right'}]}>전체선택</Text>
                        </TouchableOpacity>
                        <MarginCom mb={5} />

                        <Text>{subList[0].pdf_url}</Text>
                    </View>
                }
            </View>
            }
            </>
        }
        <AlertModal
            show={alertModal}
            msg={'작성가능한 작업일보가 없습니다.'}
            hide={()=>setAlertModal(false)}
        />
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

