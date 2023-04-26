import React from 'react';
import {View, TextInput,Image,TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { colors, fontStyle } from '../../../../style/style';
import { UserInfoCard } from '../../../../component/card/UserInfoCard';

export const FavoriteAddPhone = () => {
    const tempList = [
        {
            index:'1',
            empName:'힘찬중기',
            jobType:'1',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
        {
            index:'2',
            empName:'힘찬중기',
            jobType:'2',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
    ]

    return(
        <View>
            
        <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flex:1}}>
                <TextInput 
                    style={[fontStyle.f_regular,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}
                    placeholderTextColor={colors.BORDER_GRAY_COLOR}
                    placeholder='연락처를 입력해주세요.'
                    numberOfLines={1}
                />
            </View>
            <TouchableOpacity
                style={{justifyContent:'center',alignItems:'center',width:25,height:25}}
                onPress={()=>console.log('add')}
            >
                <Image 
                    source={require('../../../../assets/img/ic_add_img.png')}
                    style={{width:20,height:20}}
                />
            </TouchableOpacity>
        </View>   
        <FlatList 
            data={tempList}
            style={{marginTop:10,paddingHorizontal:20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index})=>{
                return(
                    <View style={{paddingVertical:15}}>
                    <UserInfoCard
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
                    />
                    </View>
                )
            }}
        />
        </View> 
    )
}