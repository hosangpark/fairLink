
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