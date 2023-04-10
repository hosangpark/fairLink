import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

export const colors = { //색상 리스트;
    MAIN_COLOR : '#0E969F',
    SUB_COLOR : '',

    BACKGROUND_COLOR_GRAY1 : '#F5F5F5',
    BACKGROUND_COLOR_GRAY2 : '#F1F9F9',

    FONT_COLOR_BLACK : '#000000',
    FONT_COLOR_BLACK2 : '#374748',
    FONT_COLOR_BLACK3 : '#191919',
    FONT_COLOR_GRAY : '#A4A4A4',

    WHITE_COLOR : '#FFF',
    BLUE_COLOR : '#355AD9',
    SKY_BLUE_COLOR : '#6ECEFF',
    DEPP_SKY_BLUE : '#19D2DB',
    MINT_COLOR : '#1BCBAF',
    YELLOW_COLOR : '#F58300',
    ORANGE_COLOR : '#F58300',
    GRAY_COLOR : '#A4A4A4',
    LIGHT_BLUE_COLOR : '#4EB0E9',
    KAKAO_YELLOW : '#FEE500',
    
    BORDER_GRAY_COLOR : '#E1E1E1',
    BORDER_GRAY_COLOR1 : '#EFEFEF',
    BORDER_BLUE_COLOR : '#DAF3F5',
    
}

export const fontStyle = StyleSheet.create({
    k_bold : {
        fontFamily:'Kimm_bold'
    },
    s_regular : {
        fontFamily : 'SEBANG-Gothic-Regular'
    },
    s_bold : {
        fontFamily : 'SEBANG-Gothic-Bold'
    },
    f_light : {
        fontFamily:'Pretendard-Light'
    },
    f_regular : {
        fontFamily:'Pretendard-Regular'
    },
    f_medium : {
        fontFamily:'Pretendard-Medium'
    },
    f_semibold: {
        fontFamily:'Pretendard-SemiBold'
    },
    f_bold : {
        fontFamily:'Pretendard-Bold'
    },
})

export const flexStyle = {
    
}

export const swiperStyles = StyleSheet.create({
    swiperWrapper : {
        width:width,
        position:'relative',
    },
    swiperSlide : {
        justifyContent:'center',
        backgroundColor:'blue'
    },
    swiperImageWrapper : {
        resizeMode: 'cover',
    },
    swiperIndexArea : {
        position:'absolute',
        top:10,
        left:25,
        // width:60,
        paddingHorizontal:10,
        paddingVertical:3,
        height:31,
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius:16,
        zIndex:2,
    }

});

export const selectBoxStyle = StyleSheet.create({
    btnStyle : {
        backgroundColor:colors.WHITE_COLOR,
        borderRadius:4,
        borderWidth:1,
        borderColor:colors.BORDER_GRAY_COLOR1,
        flex:1,
        alignItems:'center',
        ...fontStyle.f_regular,
    },
    btnTextStyle : {
        ...fontStyle.f_regular,
        color:colors.FONT_COLOR_BLACK,
        textAlign:'left',
    },
    rowStyle: {backgroundColor:colors.WHITE_COLOR, borderBottomColor:colors.BORDER_GRAY_COLOR},
    rowTextStyle: {color:colors.FONT_COLOR_BLACK, textAlign: 'left',...fontStyle.f_regular},
})
export const selectBoxStyle2 = StyleSheet.create({
    btnStyle : {
        backgroundColor:colors.WHITE_COLOR,
        borderBottomWidth:1,
        borderColor:colors.BORDER_GRAY_COLOR1,
        flex:1,
        alignItems:'center',
        height:30,
        ...fontStyle.f_regular,
    },
    btnTextStyle : {
        ...fontStyle.f_regular,
        fontSize:16,
        color:colors.FONT_COLOR_BLACK,
        textAlign:'left',
    },
    rowStyle: {backgroundColor:colors.WHITE_COLOR, borderBottomColor:colors.BORDER_GRAY_COLOR},
    rowTextStyle: {color:colors.FONT_COLOR_BLACK, textAlign: 'left',...fontStyle.f_regular},
})

export const styles = StyleSheet.create({
    header_ : {
        height: 50,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center'
    },

    buttonStyle : {
        backgroundColor:colors.MAIN_COLOR,
        width:'100%',
        alignItems:'center',
        padding:10,
        borderRadius:4,
        borderWidth:1,
        borderColor:colors.MAIN_COLOR,
    },
    buttonLabelStyle : {
        color:colors.WHITE_COLOR,
        fontSize:18,
    },
    whiteButtonStyle : {
        backgroundColor : colors.WHITE_COLOR,
        width:'100%',
        alignItems:'center',
        padding:10,
        borderRadius:4,
        borderWidth:1,
        borderColor:colors.MAIN_COLOR,
    },
    whiteButtonLabelStyle : {
        color : colors.MAIN_COLOR,
        fontSize:18
    },
    ScreenContainer: {
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
    },

    cardWrapper : {
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:30,
        backgroundColor:colors.WHITE_COLOR,
        borderColor:colors.BORDER_GRAY_COLOR,
        borderRadius:8,
    },
    cardJobArea:{
        position:'absolute',
        top:-10,
        left:20,
        zIndex:2,
        backgroundColor:colors.WHITE_COLOR,
        borderWidth:1,
        borderRadius:16,
        paddingHorizontal:10,
        paddingVertical:2,
    },
    cardProfileSize:{
        width:90,
        height:90,
        alignItems:'center',
        justifiContent:'center',
        backgroundColor:'black',
    },
    cardReqEmpBtn : {
        backgroundColor:colors.MAIN_COLOR,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        paddingVertical:3,
        marginTop:5,
    },
    cardInfoArea:{
        backgroundColor:colors.BACKGROUND_COLOR_GRAY1,
        borderColor:colors.BORDER_GRAY_COLOR,
        borderRadius:4,
        padding:10,
        width:'100%',
        marginTop:15,
    },
    mainMenuWrapper: {
        flex: 1,
        padding:20
    },
    mainMenu: {
        flex: 1,
		margin: 8,
        borderRadius: 8,
        paddingTop:20,
        paddingLeft:20,
    },
    mainMenuImg:{
        width:110,
        height:100,
    },
    border : {
        borderColor:colors.BORDER_GRAY_COLOR,
        borderWidth:1,
    },
    deepBorder : {
        borderColor:colors.BORDER_GRAY_COLOR1,
        borderWidth:1,
    },
    topBorder : {
        borderColor:colors.BORDER_GRAY_COLOR,
        borderTopWidth:1,
    },
    deepTopBorder : {
        borderColor:colors.BORDER_GRAY_COLOR1,
        borderTopWidth:1,
    },
    bottomBorder : {
        borderColor:colors.BORDER_GRAY_COLOR1,  
        borderBottomWidth:1,
    },
    deepBottomBorder : {
        borderColor:colors.BORDER_GRAY_COLOR,  
        borderBottomWidth:1,
    },
    textBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        paddingVertical:15,
        marginBottom:10,
        borderWidth: 1,
        borderRadius: 8, 
    },
    TitleText:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        marginBottom:30,
    },
    SubTitleText:{
        marginBottom:26,
    },
    OrengeStart:{
        fontSize:16,
        color:'#F58300',
        letterSpacing:7
    },
    TextInputBox:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:colors.BORDER_GRAY_COLOR,
        borderRadius:4,
        justifyContent:'space-between',
    },
    textLabel: {
        color: colors.FONT_COLOR_BLACK,
        fontSize: 16,
        marginVertical: 10
    },
    textInput: {
        color: colors.FONT_COLOR_BLACK,
        backgroundColor: colors.BACKGROUND_COLOR_GRAY1,
        fontSize: 16,
        marginVertical: 10,
        borderWidth: 1, 
        borderColor: colors.BORDER_GRAY_COLOR, 
        height: 46, 
        paddingHorizontal: 20, 
        borderRadius: 4
    }
});

export const modalStyle = StyleSheet.create({

    modalWrapper : {
        backgroundColor:colors.WHITE_COLOR,
        borderRadius:8,
        bordercolor:colors.BORDER_GRAY_COLOR,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    loginIntroModal : {
        paddingTop:30,
        paddingBottom:20,
        paddingHorizontal:30,
    },
    alertModal : {
        paddingTop:40,
        paddingBottom:30,
        paddingHorizontal:20,
    },
    lastDispatchModal : {
        paddingHorizontal:20,
        paddingVertical:30,
    },
    title : {
        fontSize:18,
        color:colors.FONT_COLOR_BLACK,
    },
    contents : {
        fontSize:18,
        color:colors.FONT_COLOR_BLACK,
    }
})
