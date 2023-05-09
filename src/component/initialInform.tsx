export const initialdetailWorkInfo = {
        info : { //작업정보
            "crt_company" : "",
            "crt_director" : '',
            "crt_location" : '',
            "crt_m_name" : '' ,
            "crt_m_num" : '' ,
            "crt_name" : '',
        },
        contents: { //작업내용
            "crt_name": "현장A",
            "content": "철근자재 하역 및  정리",
            "date": "23.04.25",
            "species": "철근 콘크리트"
        },
        schedule: { //작업일정관리
            "count": 0,
            "list": []
        },
        equip: { //투입장비
            "equip_name": "굴착기 (2017년식)",
            "stand1": "02, 03",
            "stand2": "03C",
            "company": "규도령건설",
            "busi_num": "011-5242-154",
            "ceo": "규도령",
            "hp": "010-1111-1111"
        },
        pilot: { //투입조종사
            "name": "이름 (29세)",
            "career": "4",
            "score": 0,
            "good": 0,
            "hp": "010-1111-1111"
        },
        price: { //대금관리
            "all_price": 3500,
            "date": "23.04.25~23.05.30 (35일)",
            "price_type": "Y",
            "price": "100",
            "check_price": "100만원 * 35일 = 3500만원",
            "pay_date": "23.06.01",
            "met_bank": "14",
            "met_bank_num": "061-12-154083-2",
            "met_vholder": "이름",
            "bank_file": "https://fairlink.cafe24.com/images/uploads/met_file_9_4_ZnydOMT0.jpg"
        },
        document_equip: [ //서류관리-장비(차량) 서류
            {
                "title": "건설기계등록증",
                "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_2_6_6xUId8VO.jpg",
                "file_check": "1"
            },
            {
                "title": "보험증서",
                "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_4_6_8FCiNRmQ.jpg",
                "file_check": "1"
            },
            {
                "title": "장비제원표",
                "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_6_6_Yxnf9Jau.jpg",
                "file_check": "1"
            }
        ],
        document_qualification: [ //서류관리-자격 및 기타 서류
            {
                "title": "건설기계조종사면허증",
                "file_url": "",
                "file_check": "0"
            },
            {
                "title": "운전면허증",
                "file_url": "",
                "file_check": "0"
            },
            {
                "title": "이동식 크레인 조종교육이수증 또는 기중기 운전기능사",
                "file_url": "",
                "file_check": "0"
            }
        ],
        document_contract: [{
            const_idx : '',
            write_check: '',
            pdf_url : '',
        }], //서류관리-계약서류
        document_dailywork: [] //서류관리-작업일보
}


export const initialdetailFieldInfo = {
            crt_name:"",
            company:"",
            detail_location:"",
            cot_e_type:"",
            cot_e_year:"",
            cot_e_sub:"",
            cot_content:"",
            cot_career:"",
            cot_age:"",
            cot_score:"",
            cot_goods:"",
            cot_start_date:"",
            cot_end_date:"",
            cot_start_time:"",
            cot_end_time:"",
            cot_pay_type:"",
            cot_pay_price:"",
            cot_pay_date:"",
            cot_pay_etc:"" ,
            cot_m_name:"",
            cot_m_num:"",
    }
export const initialVolunteerInfo = {
    data:{
        crt_name:"",
        equip:"",
        year:"",
        sub:"",
        start_date:"",
        end_date:"",
        start_time:"",
        end_time:""
    },
    count:0,
    list:[
        {
            cat_idx: "",
            cot_idx: "",
            type: "",
            met_company: "",
            mpt_name: "",
            good: "",
            score: 0,
            score_count: "",
            equip: "",
            mpt_career: "",
            mpt_location: ""
        }
    ]
}
export const initialConsProfile = {
        "data": {
            "mpt_idx": "17",
            "type": "my",
            "img_url": "https://fairlink.cafe24.com/images/uploads/mpt_profile_15_rO0PJC7s.jpg",
            "name": "이름",
            "age": 29,
            "gender": "M",
            "equip": "굴착기 02, 03 03C",
            "hp": "010-1111-1111",
            "score": 0,
            "score_count": "0",
            "good": 0
        },
        "sub": [
            "채바가지",
            "대바가지"
        ],
        "profile": {
            "mpt_career": "4",
            "mpt_licence": "-",
            "mpt_equip_memo": "경력사항",
            "mpt_aspire": "포부"
        },
        "doc_check": {
            "차량서류": [
                {
                    "title": "건설기계등록증",
                    "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_2_6_6xUId8VO.jpg",
                    "file_check": "1"
                },
                {
                    "title": "보험증서",
                    "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_4_6_8FCiNRmQ.jpg",
                    "file_check": "1"
                },
                {
                    "title": "장비제원표",
                    "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_6_6_Yxnf9Jau.jpg",
                    "file_check": "1"
                }
            ],
            "안전교육": [
                {
                    "title": "특수형태근로자안전보건교육이수증",
                    "file_url": "https://fairlink.cafe24.com/images/uploads/met_file_8_6_7pfqnXM5.jpg",
                    "file_check": "1"
                },
                {
                    "title": "건설기초안전보건교육",
                    "file_url": "",
                    "file_check": "0"
                }
            ],
            "자격증": [
                {
                    "title": "건설기계조종사면허증",
                    "file_url": "",
                    "file_check": "0"
                },
                {
                    "title": "운전면허증",
                    "file_url": "",
                    "file_check": "0"
                },
                {
                    "title": "이동식 크레인 조종교육이수증 또는 기중기 운전기능사",
                    "file_url": "",
                    "file_check": "0"
                }
            ]
        }
}

export const initialElectorincInfo ={
        data:{
            cct_e_type:"",
            cct_e_reg_no:"",
            cct_e_style:"",
            cct_e_ocrdate2: "2022-01-01~2024-11-30", //보험가입현황
            cct_e_ocrdate1: "",  //정기검사여부
            cct_c_name: "",
            cct_c_location: "",
            cct_c_manage: "",
            cct_c_company: "",
            cct_c_file_check: "Y",
            cct_start_date: "",
            cct_end_date: "",
            cct_pay_price: "",
            cct_time: "1",
            cct_pay_check1: "",
            cct_pay_check2: ""
        },
        data1:{
            company: "",
            busi_num: "",
            name: "",
            birth_num: ""
        },
        data2:{
            company: "",
            busi_num: "",
            name: "",
            birth_num: ""
        }
}
