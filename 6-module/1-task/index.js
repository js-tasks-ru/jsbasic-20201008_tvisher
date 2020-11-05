/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: '',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  get elem() {
    return this.table;
  }


  constructor(rows) {
    this.table = document.createElement('table');
    this.table.addEventListener('click', (event) => this.onClick(event));
    this.render(rows);
  }


  render(arr) {
    let tableToRow = arr.map(function (item) {
      return `<tr> <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td></tr>`
    }).join("");
    this.table.innerHTML = tableToRow;
  }


  onClick(event) {
    if (event.target.closest('button')) {
      event.target.closest('tr').remove();
    }
  }
}
