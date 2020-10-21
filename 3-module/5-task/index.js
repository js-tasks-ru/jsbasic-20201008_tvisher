/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arr =  str
  .split(',')
  .join('')
  .split(' ')
  .filter(item => isFinite(item))
  .sort((a,b) => {return a - b});

  let minMaxNum = {};
  minMaxNum.min = arr[0];
  minMaxNum.max = arr[arr.length -1];
  return minMaxNum;
}
