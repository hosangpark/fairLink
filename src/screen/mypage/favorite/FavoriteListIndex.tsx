import React from 'react';

import {View} from 'react-native';
import { CustomButton } from '../../../component/CustomButton';
import { BackHeader } from '../../../component/header/BackHeader';
import { FlatList } from 'react-native-gesture-handler';
import { UserInfoCard } from '../../../component/card/UserInfoCard';
import { UserInfoCardType } from '../../../component/componentsType';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';

export const FavoriteListIndex = () => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

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
        {
            index:'3',
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
            index:'4',
            empName:'힘찬중기',
            jobType:'2',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
        {
            index:'5',
            empName:'힘찬중기',
            jobType:'2',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        }
    ]

    return(
        <View style={{flex:1}}>
            <BackHeader title={'즐겨찾기 장비 관리'} />
            <View style={{padding:20}}>
                <CustomButton 
                    action={()=>{navigation.navigate('FavoriteAdd')}}
                    label={'장비 추가하기'}
                />
                <FlatList 
                    data={tempList}
                    style={{marginTop:10}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
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
                                isDelete={true}
                                action={()=>{}}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}