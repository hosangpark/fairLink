import { usePostMutation } from "../../util/reactQuery"

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
        '덤프트럭' : [],
        '고소작업차' : ['기타(직접입력)'],
        '크레인' : ['기타(직접입력)'],
        '펌프카' : ['기타(직접입력)'],
        '지게차' : ['기타(직접입력)'],
        '고소작업대' : []
    }
]

export const equUploadList = [
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
    // '고소작업차(굴절)' : 
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


export const accessoriesConvert = (key: string) => {

    return accessoriesList[0][key]

}