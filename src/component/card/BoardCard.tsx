import React from 'react';
import { Text, TouchableOpacity, View ,Image,StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { CustomButton } from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePostMutation } from '../../util/reactQuery';
import { pilotCareerList } from '../utils/list';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { PdfViewerModal } from '../../modal/PdfViewerModal';
import { PdfViewerModal2 } from '../../modal/PdfViewerModal2';

export interface BoardCardItemType {
    apply_count? : number, //지원자수
    pilot_name?:string, //조종사 배치후 조종사 이름
    carrer : string,
    cat_idx : string,
    cot_idx : string, 
    start_date : string, //시작일
    end_date : string, //종료일
    location : string, //위치
    crt_name : string, //작업이름
    content : string, //작업내용
    equip : string, //장비정보
    career : string, //경력
    contract_idx : string,
    title : string,
    contract_check : string,
    met_company : string, //회사 이름
    mct_company : string,  //회사이름
    mpt_idx? : string,
    match_type? : string //장비&건설 검토상태
    cdwt_idx?:string,
    cont_pdf?:string,
    cont_webview?:string
}

type BoardCardType = {
    item : BoardCardItemType,
    title : string,
    refetch? : ()=>void;
}


export const BoardCard = ({
    item,
    title,
    refetch,
}:BoardCardType) => {
    const dispatch = useAppDispatch();
    const {mt_idx,mt_type} = useAppSelector(state=>state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const deleteOrderMutation = usePostMutation('deleteOrder' , mt_type === '2' ? 'equip/equip_request_cancel.php' : 'pilot/pilot_request_cancel.php');

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);
    const [pdfViewerModal, setPdfViewerModal] =React.useState(false);
    const [selPdfUrl, setSelPdfUrl] = React.useState('');
    const [selWebUrl, setselWebUrl] = React.useState('');
    const [contIdx, setContIdx] = React.useState('');

    const alertModalOn = (msg : string, type? : string) => {
        if(type){
            setAlertModal({
                ...alertModal,
                alert:true,
                msg : msg,
                type : type ? type : '',
            })
        }
    } 
    const alertModalOff = () =>{
        setAlertModal(()=>initialAlert)
    };

    const alertAction = () => {
        if(alertModal.type === 'delete_confirm'){
            deleteOrderHandler();
        }
        else if(alertModal.type === 'delete_success'){
            if(refetch) refetch();
        }
    }

    const deleteOrderHandler = async () => {
        
        dispatch(toggleLoading(true));
        const params = {
            mt_idx : mt_idx,
            cat_idx : item.cat_idx,
        }
        const {result,data,msg} = await deleteOrderMutation.mutateAsync(params);
        dispatch(toggleLoading(false));

        if(result === 'true'){
            alertModalOn('모집취소가 완료되었습니다.','delete_success')
        }
        else{
            alertModalOn(msg);
        }
        
    }

    const FlowEvent = () =>{
        if(mt_type=='1' ){
            if(title=="배차 모집중"){
                navigation.navigate('Volunteer',{cot_idx : item?.cot_idx, cat_idx:item?.cat_idx,isBtn:true})
            }
            else if(title === '계약진행중'){
                navigation.navigate('PilotProfile', {cat_idx : item?.cat_idx,cot_idx:item.cot_idx,isBtn:false})
            }
            else if(title === '작업중' || title === '작업완료'){
                navigation.navigate('CompanyProfile',{
                    cat_idx:item.cat_idx,
                    cot_idx:item.cot_idx,
                    mpt_idx:item.mpt_idx,
                    isBtn : false,
                });
            }
        } 
        else if(mt_type === '2'){
            if(title === '조종사 모집중' || title === '현장지원 완료'){
                console.log(item);
                navigation.navigate('Volunteer' , {cat_idx : item?.cat_idx,cot_idx:item?.cot_idx,isBtn : title === '조종사 모집중'})
            } else {
                navigation.navigate('PilotProfile',{cat_idx:item?.cat_idx,cot_idx:item?.cot_idx,mpt_idx:item.mpt_idx,isBtn:false})
            }
        }

        else if(mt_type==='4') {
            if(title === '현장지원 완료'){
                return;
            }
            // console.log(item);
            // navigation.navigate('PilotProfile',{cat_idx : item?.cat_idx,isBtn:false})
        } else {
            console.log(item);
            navigation.navigate('PilotProfile', {cat_idx : item?.cat_idx,cot_idx:item.cot_idx,isBtn:false})
        }
    }

    
    const consListDeleteMutation = usePostMutation('consListDelete','cons/cons_order_delete.php')
    const equipListDeleteMutation = usePostMutation('equipListDelete','equip/equip_order_delete.php')
    const pilotListDeleteMutation = usePostMutation('pilotListDelete','pilot/pilot_order_delete.php')

  const BoardInfrom = async (): Promise<void> => {
        try {
            const idxParams = {
            /** mt_idx 임의입력 수정필요 */
                mt_idx : mt_idx,
                cot_idx:item?.cot_idx,
            }
            const {result,data, msg} = 
            mt_type == '1'?  await consListDeleteMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipListDeleteMutation.mutateAsync(idxParams)
            :
            await pilotListDeleteMutation.mutateAsync(idxParams)

            if(result === 'true'){
                console.log("result",result)
                console.log("data",data.data)
                console.log("msg",msg)
            }
            else{
                console.log("else",result)
            }
        // }
        } catch(err) {
            console.log(err);
        }
    };
    
    return(
        <View>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                hide={alertModalOff}
                action={alertAction}
                type={alertModal.type}
            />
            <TouchableOpacity style={{margin:20,zIndex:9}} onPress={()=>
            {
                if(title=="배차 모집중"){
                    navigation.navigate('DetailField',{cot_idx:item.cot_idx,cat_idx:item.cat_idx})
                } else {
                    navigation.navigate('DetailWork',{cot_idx:item.cot_idx,cat_idx:item.cat_idx})
                }
            }}
            >
                <View style={[styles.card2Wrapper]}>
                    <View style={[styles.card2Location]}>
                        <Text style={[fontStyle.f_regular,{fontSize:16,marginRight:12,color:colors.FONT_COLOR_BLACK}]}>
                            {item.start_date}
                        </Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>
                            {item.location}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16}}>
                        <View style={{flex:1,paddingRight:30}}>
                            <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8,}]} numberOfLines={1}>
                                {item.crt_name}</Text>
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                                {item.content}</Text>
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                                {item.equip}</Text>
                            {mt_type=='4' &&
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:mt_type=='4'? 5:8}]} numberOfLines={1}>
                                경력 {pilotCareerList[Number(item.career)]}</Text>
                            }
                        </View>
                        <View>
                            <TouchableOpacity disabled={mt_type === '4'}  style={[styles.card2Profile]} onPress={FlowEvent}>
                                <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>
                                    {mt_type === '1' &&
                                        [
                                        title === '배차 모집중' ? 
                                        '지원자' : '조종사'
                                        ]
                                    }
                                    {mt_type === '2' &&
                                        [title === '조종사 모집중' ? 
                                        '지원자' : '조종사']
                                    }
                                    {mt_type === '4' &&
                                        [title === '현장지원 완료' ? 
                                        '장비회사' : '건설회사']
                                    }
                                </Text>
                                <Text style={[fontStyle.f_semibold,{fontSize:mt_type!=='4'? 20:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={2}>
                                    {mt_type === '1' && [title === '배차 모집중' ? [item.apply_count]+'명': item.pilot_name ]}
                                    {mt_type === '2' && [title === '조종사 모집중' ? [item.apply_count]+'명':  item.pilot_name ]}
                                    {mt_type === '4' &&
                                        [title === '현장지원 완료' ? 
                                        [item.met_company] : item.pilot_name] 
                                    }
                                </Text>
                                {mt_type !=='4' ?
                                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>경력 {pilotCareerList[Number(item.career)]}+</Text>
                                :
                                <>
                                    {item.mct_company?
                                        <>
                                            <Text style={[fontStyle.f_medium,{fontSize:14,color:colors.MAIN_COLOR}]}>건설회사</Text>
                                            <Text style={[fontStyle.f_semibold,{fontSize:mt_type!=='4'? 20:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]} numberOfLines={2}>
                                                {item.mct_company}
                                            </Text>
                                        </>
                                    :
                                    item.match_type == "Y"?
                                        <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.ORANGE_COLOR}]}>
                                            건설회사{'\n'}검토중
                                        </Text>
                                        :
                                        item.match_type == "N"?
                                        <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.ORANGE_COLOR}]}>
                                            장비회사{'\n'}검토중
                                        </Text>
                                        :
                                        <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.ORANGE_COLOR}]}>선정전</Text>
                                    }
                                </>
                                }
                                {}
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    {(mt_type === '2' && 
                        (title === '조종사 모집중' || title === '현장지원 완료')) &&
                        <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'모집취소'}
                        action={()=>{ alertModalOn('모집취소 하시겠습니까?','delete_confirm')}}
                        />
                    }
                    {mt_type !=="4" && title == "작업완료" &&
                        <CustomButton
                            style={{}}
                            labelStyle={{fontSize:16}}
                            label={'작업일보 승인대기'}
                            disabled={true}
                            action={()=>{navigation.navigate('Document',{cdwt_idx:''})}}
                        />
                    }
                    {mt_type =="1" && title == "계약진행중" &&
                    <>
                        {item.contract_idx !== ""?
                        <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'계약서 확인'}
                        action={()=>{navigation.navigate('ElectronicContract',{cot_idx:item.cot_idx,cat_idx:item.cat_idx,
                        contract_idx:item.contract_idx,route_type:'Info2'})}}
                        />
                        :
                        <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'계약서 작성'}
                        action={()=>{
                            navigation.navigate('ElectronicContract',{cot_idx:item.cot_idx,cat_idx:item.cat_idx,
                        contract_idx:item.contract_idx,route_type:'Info'})
                    }}
                        />
                        }
                    </>
                    }
                    {mt_type =="2" && title == "계약진행중" &&
                    <>
                        {item.contract_idx !== ""?
                        <CustomButton
                        style={{}}
                        labelStyle={{fontSize:16}}
                        label={'계약서 확인'}
                        action={()=>{
                            console.log(item.cont_pdf)
                            console.log(item.cont_webview)
                            setSelPdfUrl(item.cont_pdf);
                            setselWebUrl(item.cont_webview);
                            setContIdx(item.contract_idx);
                            setPdfViewerModal(true);
                        }}
                        />
                        :
                        null
                        }
                    </>
                    }
                    {mt_type !=='4' && title == "배차 모집중" &&
                        <CustomButton
                            style={{}}
                            labelStyle={{fontSize:16}}
                            label={'모집 취소'}
                            action={()=>{alertModalOn('모집 취소 하시겠습니까?','delete_confirm')}}
                        />
                    }
                    {mt_type=='4' && title == "현장지원 완료" &&
                        <CustomButton
                            style={{}}
                            labelStyle={{fontSize:16}}
                            label={'지원 취소'}
                            action={()=>{alertModalOn('지원 취소 하시겠습니까?','delete_confirm')}}
                        />
                    }
                    {mt_type=='4' && title == "작업중/작업예정" &&
                        <CustomButton
                            style={{}}
                            labelStyle={{fontSize:16}}
                            label={'작업일보 작성'}
                            action={()=>{navigation.navigate('Document',{cdwt_idx:item.cdwt_idx})}}
                        />
                    }
                </View>
            </TouchableOpacity>
            {PdfViewerModal2 &&
                <PdfViewerModal2
                    show={pdfViewerModal}
                    hide={()=>{setPdfViewerModal(false)}}
                    action={()=>{}}
                    pdfUrl={selPdfUrl}
                    webviewUrl={selWebUrl}
                    contract_idx={contIdx}
                    setSelPdfUrl={setSelPdfUrl}
                />
            }
        </View>
    )
}
const BoardCardstyle = StyleSheet.create({

})