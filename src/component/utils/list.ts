import { usePostMutation } from "../../util/reactQuery"

export const yearList = ()=>{
    let yearArray:string[] = [];
    for(let i=2010; i<=new Date().getFullYear(); i++){
        yearArray.push(String(i));
    }
    return yearArray;
}
export const monthList = () => {
    const tempArray = [];

    for(let i=1; i<=12; i++){
        tempArray.push(String(i));
    }
    return tempArray;
}

export const dayList = () => {
    const tempArray = [];

    for(let i=1; i<=31; i++){
        tempArray.push({
            key:String(i),
            name:String(i),
        });
    }

    return tempArray;
}

export const pilotCareerList = [
    '없음',
    '1년',
    '2년',
    '3년',
    '5년',
    '7년',
    '10년',
]

export const workList = [
    '작업일',
    '기상악화',
    '공정지연',
    '휴무',
    '기타사유',
]

export const pilotCarrerKeyList = [
    {key : '0' , name : '해당없음'},
    {key : '1' , name : '1년 이상'},
    {key : '2' , name : '2년 이상'},
    {key : '3' , name : '3년 이상'},
    {key : '4' , name : '5년 이상'},
    {key : '5' , name : '7년 이상'},
]

export const ageList = [
    {key : '0', name : '해당없음'},
    {key : '55', name : '55세 이하'},
    {key : '60', name : '60세 이하'},
]

export const scoreList = [
    {key : '0', name : '해당없음'},
    {key : '3', name : '3점이상'},
    {key : '4', name : '4점이상'},
    {key : '5', name : '5점'},
]
export const goodsList = [
    {key : '0', name :'해당없음'},
    {key : '1', name : '1개 이상'},
    {key : '5', name : '5개 이상'},
    {key : '10' , name : '10개 이상'},
]

export const payDateList = [
    {key : '0' , name : '직접입력'},
    {key : '1' , name : '당일지급'},
    {key : '2' , name : '작업종료 후 3일'},
    {key : '3' , name : '작업종료 후 7일'},
    {key : '4' , name : '매월 1일'},
    {key : '5' , name : '매월 15일'},
    {key : '6' , name : '매월 25일'},
    {key : '7' , name : '매월 30일'},
]

export const bankList = [
    {key : '1', name : '국민은행'},
    {key : '2', name : '기업은행'},
    {key : '3', name : '농협'},
    {key : '4', name : '신한은행'},
    {key : '5', name : '산업은행'},
    {key : '6', name : '우리은행'},
    {key : '7', name : '한국씨티'},
    {key : '8', name : '하나은행'},
    {key : '9', name : 'SC제일은행'},
    {key : '10', name : '경남은행'},
    {key : '11', name : '광주은행'},
    {key : '12', name : '대구은행'},
    {key : '13', name : '도이치'},
    {key : '14', name : '부산은행'},
    {key : '15', name : '산림조합중앙회'},
    {key : '16', name : '저축은행'},
    {key : '17', name : '새마을금고'},
    {key : '18', name : '수엽은행'},
    {key : '19', name : '신협은행'},
    {key : '20', name : '우체국'},
    {key : '21', name : '전북'},
    {key : '22', name : '제주'},
    {key : '23', name : '케이뱅크'},
    {key : '24', name : '토스뱅크'}
]

// export const deviceImgList = {
//     "브레이커" : require('../../assets/img/device1'),
//     "대바가지" : "device2",
//     "채바가지" : 'device3',
//     "쪽바가지" : "device4",
//     "리퍼" : 'device5',
//     "회전링크" : "device6",
//     "틸트로테이트" : 'device7',
//     "집게" : "device8",
//     "지게발" : 'device9',
//     "본크러셔" : "device10",

// }
export const deviceImgList = {
    "브레이커" : require('../../assets/img/device1.png'),
    "대바가지" : require('../../assets/img/device2.png'),
    "채바가지" : require('../../assets/img/device3.png'),
    "쪽바가지" : require('../../assets/img/device4.png'),
    "리퍼" : require('../../assets/img/device5.png'),
    "회전링크" : require('../../assets/img/device6.png'),
    "틸트로테이트" : require('../../assets/img/device7.png'),
    "집게" : require('../../assets/img/device8.png'),
    "지게발" : require('../../assets/img/device9.png'),
    "본크러셔" : require('../../assets/img/device10.png'),

}

export const speciesList = [ //공종 리스트
    '토공사',
    '기초공사',
    '철근콘크리트',
    '도로공사',
    '관로공사',
    '가설물설치해체',
    '철공공사',
    '지붕 및 홈통공사',
    '창호 및 유리공사',
    '칠공사(도장)',
    '단열공사',
    '철거공사',
    '자재운반 및 기타'
]

export const locationList = [
    '영흥','삼천포','본사','여수'
]

type AccessoriesList = {
    '굴착기': string[];
    '덤프트럭': string[];
    '고소작업차': string[];
    '크레인': string[];
    '펌프카': string[];
    '지게차': string[];
    '고소작업대': string[];
    '물차기': string[];
  }

export const accessoriesList :AccessoriesList[] = [ //장비 부속부품
    {
        '굴착기' : [
            '브레이커',
            '대바가지',
            '채바가지',
            '리퍼',
            '회전링크',
            '틸트로테이트',
            '집게',
            '지게발',
            '기타(직접입력)'
        ],
        '덤프트럭' : ['기타(직접입력)'],
        '고소작업차' : ['기타(직접입력)'],
        '크레인' : ['기타(직접입력)'],
        '펌프카' : ['기타(직접입력)'],
        '지게차' : ['기타(직접입력)'],
        '고소작업대' : [],
        '물차기':[
            '기타(직접입력)'
        ]
    }
]

export const equUploadList = [ //장비회사 업로드 리스트 (회원가입)
    {key : '1', name : '사업자등록증'},
    {key : '2', name : '건설기계등록증'},
    {key : '3', name : '자동차등록증'},
    {key : '4', name : '보험증서'},
    {key : '5', name : '안점검사 합격증명'},
    {key : '6', name : '장비제원표'},
    {key : '7', name : '비파괴검사필증'},
    {key : '8', name : '특수형태근로자안전보건교육'},
    {key : '9', name : '통장사본'},
    {key : '10', name : '장비사진'},
]

export const equProfileUploadList = [ //장비회사 업로드 리스트 (프로필 수정)
    {key : '1', name : '건설기계등록증'},
    {key : '2', name : '자동차등록증'},
    {key : '3', name : '보험증서'},
    {key : '4', name : '안점검사 합격증명'},
    {key : '5', name : '장비제원표'},
    {key : '6', name : '비파괴검사필증'},
    {key : '7', name : '특수형태근로자안전보건교육'},
    {key : '8', name : '장비사진'},
]

export const pilotUploadList = [ //조종사 업로드 리스트 (회원가입 및 프로필 수정)
    {key : '1', name : '건설기계조종사면허증'},
    {key : '2', name : '운전면허증'},
    {key : '3', name : '건설기계조종사 안전교육이수증'},
    {key : '4', name : '건설기초안전보건교육'},
    {key : '5', name : '화물운송종사자 자격증'},
    {key : '6', name : `이동식 크레인조종교육이수증\n또는 기중기운전기능사`},
    {key : '7', name : '통장사본'},
]
export const pilotProfileUploadList = [ //조종사 업로드 리스트 (회원가입 및 프로필 수정)
    {key : '1', name : '건설기계조종사면허증'},
    {key : '2', name : '운전면허증'},
    {key : '3', name : '건설기계조종사 안전교육이수증'},
    {key : '4', name : '건설기초안전보건교육'},
    {key : '5', name : '화물운송종사자 자격증'},
    {key : '6', name : `이동식 크레인조종교육이수증\n또는 기중기운전기능사`},
]
    // '고소작업차(굴절)' : 

export const EquimentsDetailDocList = [ //장비 세부정보 서류
    {key : '1', name : '건설기계등록증/차량등록증'},
    {key : '2', name : '보험증서'},
    {key : '3', name : '비파괴검사필증'},
    {key : '4', name : '제원표'},
    {key : '5', name : '안전검사합격증명서'},
    {key : '6', name : `안정인증서`},
    {key : '7', name : `장비사진`},
]

export const getEquipListConverter = (equipList:object[]) => { //장비 타입 return
    let tempArray : string[] = [];

    equipList.forEach((item:any,index:number)=>{
        tempArray.push(Object.keys(item)[0]);
    }) 

    return tempArray;
}

export const getEquipStandConverter = (equipList:object[],key:string) => { //장비규격 return

    if(equipList && equipList.length > 0 && key !== ''){
        const selIdx = equipList.findIndex(el => Object.keys(el)[0] === key);

        const tempArray : string[] = [];

        Object.values(equipList[selIdx])[0].forEach((item:any , index:number) => {
            tempArray.push(Object.keys(item)[0]);
        })


        return tempArray;
    }
}

export const getEquStaDetailCon = (equipList:object[],key:string,subKey:string) => {

    if(equipList && equipList.length > 0 && key !== '' && subKey !== ''){
        const selIdx = equipList.findIndex(el => Object.keys(el)[0] === key);

        const subList = Object.values(equipList[selIdx])[0]

        // console.log(subList[subKey]);
        let tempArray : string[] = [];

        Object.values(equipList[selIdx])[0].forEach((item:any , index:number) => {
            if(Object.keys(item)[0] === subKey){
                
                Object.values(item)[0].forEach((item:any)=>{
                    tempArray.push(item);
                })
            }
        })

        return tempArray;
    }
}


export const accessoriesConvert = (key:string) => {
    return accessoriesList[0][key]

}