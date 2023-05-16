
/** 3자리마다 콤마 */
const get_numeric = (str:string) => {
if (!str){str = '0'}
var abdc = str.toString().replace(/[^\d-]/g, '');
return !abdc ? 0 : parseInt(abdc, 10);
}

export const comma = (str:string) => {
    if (!str) return '0';

    var abdc = get_numeric(str).toString();
    return abdc.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }


/** 핸드폰 정규식 */
export const phone_numeric = (str:string) => {
    if (!str) return '0';
    if(str.length>12)return str.slice(0,13)

    return str.replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

/** 생일 정규식 */
export const birth_numeric = (str:string) => {
    if (!str) return '';
    if(str.length>9)return str.slice(0,10)

    return str.replace(/[^0-9]/g, '')
  .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

/** 사업자 정규식 */
export const busi_numeric = (str:string) => {
    if (!str) return '';
    if(str.length>11)return str.slice(0,12)

    return str.replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}


/** 이메일 형식 확인 */
export const email_Check = (id: string) => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (id == '') {
        return {
            result: false,
            msg: '이메일을 입력해주세요.',
        }
    }
    else if (!emailReg.test(id)) {
        return {
            result: false,
            msg: '올바르지 않은 이메일입니다.',
        }
    }
    else {
        return {
            result: true,
            msg: '',
        }
    }
}
