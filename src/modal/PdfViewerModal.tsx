import React from 'react';
import { ImageModalType, PdfViewerModalType } from './modalType';
import {ActivityIndicator, View,TouchableOpacity,Image,Text} from 'react-native'
import Modal from 'react-native-modal'
import { colors, fontStyle } from '../style/style';
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview';
export const PdfViewerModal = ({
    show,
    action,
    hide,
    pdfUrl,
    setSelPdfUrl,
}:PdfViewerModalType) => {

    const [isError , setIsError] = React.useState(false);
    const PdfPage = React.useCallback(()=>{
        return(
            <>
                {pdfUrl !== '' &&
                // <WebView 
                //     source={{uri:pdfUrl}}
                //     bounces={true}
                    
                // />
                    <Pdf
                        trustAllCerts={false}
                        source={{uri:pdfUrl}}
                        onLoadComplete={(numberOfPages,filePath) => {
                            if(isError){
                                setIsError(false);
                            }
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        key={pdfUrl}
                        onPageChanged={(page,numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            setIsError(true);
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}

                        style={{flex:9,backgroundColor:colors.WHITE_COLOR}}
                    />
                }
            </>
        )
    },[isError,pdfUrl])

    return(
        <Modal 
            isVisible={show}
            onBackdropPress={()=>{
                // if(action){
                //     action();
                // }
                // hide();
            }}
            onBackButtonPress={()=>{
                setIsError(false);
                setSelPdfUrl('');
                hide();
            }}
            animationIn  ={"fadeIn"}
            animationOut ={"fadeOut"}
            animationInTiming  = {100}
            animationOutTiming = {100}
            useNativeDriver={true}
            style={[{margin:0,justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:9999,backgroundColor:'transparent'}]}
            >
            <View style={{width:'100%',height:'100%'}}>
                <View style={{backgroundColor:colors.WHITE_COLOR,justifyContent:'center',alignItems:'flex-end',padding:20}} >
                    <TouchableOpacity style={{height:30,width:30}} onPress={()=>{
                        setIsError(false);
                        setSelPdfUrl('');
                        hide();
                    }}>
                        <Image style={{width:20,height:20}} source={require('../assets/img/ic_x.png')}/>
                    </TouchableOpacity>
                    {/* <Image resizeMode={'contain'} style={{width:'100%',height:'100%',zIndex:999}} source={{uri:pdfUrl}}/> */}
                    
                </View>
                <View style={{flex:9}}>
                    {!isError ?
                        <PdfPage />
                    :
                    <View style={{backgroundColor:colors.WHITE_COLOR,flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>문서가 손상되었거나, 존재하지 않습니다.</Text>
                    </View>
                    }
                </View>
            </View>
        </Modal>
    )
}
