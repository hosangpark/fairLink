import { StyleSheet } from 'react-native';

export const colors = { //색상 리스트;
    MAIN_COLOR : '#0E969F',
    SUB_COLOR : '',

    BACKGROUND_COLOR_GRAY1 : '#F5F5F5',

    FONT_COLOR_BLACK : '#000000',
    FONT_COLOR_BLACK2 : '#374748',
    WHITE_COLOR : '#FFF',
    BLUE_COLOR : '#355AD9',
    YELLOW_COLOR : '#F58300',
    GRAY_COLOR : '#A4A4A4',
    LIGHT_BLUE_COLOR : '#4EB0E9',
    
    BORDER_GRAY_COLOR : '#E1E1E1',
    BORDER_BLUE_COLOR : '#DAF3F5',
    
}

export const flexStyle = {
    
}

export const styles = StyleSheet.create({

    buttonStyle : {
        backgroundColor:colors.MAIN_COLOR,
        width:'100%',
        alignItems:'center',
        padding:10,
        borderRadius:4,
    },
    buttonLabelStyle : {
        color:colors.WHITE_COLOR,
        fontSize:18,
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
		flexDirection: 'row',
		justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 30,
        padding: 0 ,
    },
    mainMenu: {
        flex: 1,
		width: 167,
		height: 167,
		margin: 8,
        borderRadius: 8,
        backgroundColor: '#00000017'
    },
    textBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        margin: 4,
        borderWidth: 1,
        borderRadius: 8, 
    }
});

export const fontStyle = StyleSheet.create({
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

export const modalStyle = StyleSheet.create({
    modalWrapper : {
        backgroundColor:colors.WHITE_COLOR,
        borderRadius:8,
        bordercolor:colors.BORDER_GRAY_COLOR,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:40,
        paddingBottom:30,
        paddingHorizontal:30,
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
