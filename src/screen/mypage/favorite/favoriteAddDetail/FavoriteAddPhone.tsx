import React from 'react';
import {View, TextInput,Image,TouchableOpacity, ScrollView, FlatList, Text} from 'react-native';
import { colors, fontStyle } from '../../../../style/style';
import { UserInfoCard } from '../../../../component/card/UserInfoCard';
import { usePostMutation } from '../../../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { AlertModal, initialAlert } from '../../../../modal/AlertModal';
import { FavoriteListItemType } from '../../../screenType';
import { MarginCom } from '../../../../component/MarginCom';
import { toggleLoading } from '../../../../redux/actions/LoadingAction';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../../type/routerType';
import cusToast from '../../../../util/toast/CusToast';

type FavoriteAddPhone = {
    equFavType? : string;
}

export const FavoriteAddPhone = ({equFavType}:FavoriteAddPhone) => { //즐겨찾기 장비추가 (연락처);

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const {mt_idx, mt_type} = useAppSelector(state => state.userInfo);
    const [inputPhone , setInputPhone] = React.useState('');
    const [searchLikeList, setSearchLikeList] = React.useState<FavoriteListItemType[]>([]);

    const searchLikeMutation = usePostMutation('getHpSearchLikeList',
        mt_type === '1' ? 'cons/cons_like_search.php' : 'equip/equip_like_search.php'
    ); //연락처 검색 리스트 불러오기
    const addFavoriteUserMutation = usePostMutation('addFavoriteUser',
        mt_type === '1' ? 'cons/cons_like_add.php' : 'equip/equip_like_add.php'
    ); //즐겨찾기 추가
    
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (text:string, type?:string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:text,
            type : type ? type : '',
        })
    }
    const alertModalOff = ()=>{
        setAlertModal(()=>initialAlert);
    }
    const alertAction = () => {
        alertModalOff();
        if(alertModal.type === 'error'){
            navigation.goBack();
        }
        else if(alertModal.type === 'add_success'){
            getSearchHpLike();
        }
    }

    async function addFavoriteUser(mpt_idx : string){//즐겨찾기 추가

        console.log(mpt_idx);

        let params = {
            mt_idx : mt_idx,
            mpt_idx : mpt_idx,
            type : '',
        }

        if(mt_type === '2' && equFavType){
            params = {
                ...params,
                type : equFavType,
            }
        }

        console.log(params);

        dispatch(toggleLoading(true));
        const {result, msg} = await addFavoriteUserMutation.mutateAsync(params);
        dispatch(toggleLoading(false));

        if(result === 'true'){
            alertModalOn('즐겨찾기 장비에 정상적으로 추가되었습니다.','add_success');
        }
        else{
            if(msg === '이미 등록되어 있는 조종사입니다.'){
                cusToast(msg);
            }
            else{
                alertModalOn(msg,'error');
            }
        }

    }

    async function getSearchHpLike(){ //휴대폰검색
        if(inputPhone.length < 4){
            alertModalOn('뒷자리는 4자리로 입력해주세요.');
            return;
        }
        const params = {
            mt_idx : '23',
            type : 'hp',
            search_hp : inputPhone,
        }
        dispatch(toggleLoading(true));
        const {result, msg, data} = await searchLikeMutation.mutateAsync(params);
        dispatch(toggleLoading(false));

        if(result === 'true'){
            setSearchLikeList([...data.data]);
        }
        else{
            alertModalOn(msg,'error');
        }
    }

    return(
        <View style={{paddingBottom:60}}>
            <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flex:1}}>
                    <TextInput 
                        style={[fontStyle.f_regular,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}
                        placeholderTextColor={colors.BORDER_GRAY_COLOR}
                        placeholder='연락처를 입력해주세요. (뒷자리 4자리)'
                        numberOfLines={1}
                        keyboardType='number-pad'
                        onChangeText={(e)=>{setInputPhone(e)}}
                        value={inputPhone}
                        onSubmitEditing={()=>{getSearchHpLike();}}
                        maxLength={4}
                    />
                </View>
                <TouchableOpacity
                    style={{justifyContent:'center',alignItems:'center',width:25,height:25}}
                    onPress={getSearchHpLike}
                >
                    <Image 
                        source={require('../../../../assets/img/ic_search_g.png')}
                        style={{width:20,height:20}}
                    />
                </TouchableOpacity>
            </View>
            {searchLikeList.length > 0 ?   
            <FlatList 
                data={searchLikeList}
                style={{marginTop:10,paddingHorizontal:20}}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return(
                        <View style={{paddingVertical:15}}>
                        <UserInfoCard
                            index={String(index)}
                            item={item}
                            isDelete={false}
                            isFavorite
                            action={addFavoriteUser}
                        />
                        </View>
                    )
                }}
            />
            :
            <View>
                <MarginCom mt={30} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={[fontStyle.f_regular,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>검색된 목록이 존재하지 않습니다.</Text>
                </View>
            </View>
            }
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={alertModalOff}
                action={alertAction}
            />
        </View> 
    )
}