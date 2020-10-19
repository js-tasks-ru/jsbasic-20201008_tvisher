/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let sum = 0; // переменная в которую записываем итог каждого прохода цикла
  for (let key in salaries) {
    if(typeof salaries[key] === "number") { //проверка что в значение ключа число
      sum += salaries[key]; // каждый проход цикла прибавляет к переменной число
    }
  }
  return sum;
}
