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
 *      }
 *
 */
export default class UserTable {
  // Свойство elem
  table = null;

  constructor(rows) {
    this.rows = rows;
    // elem присвоена ссылка на table
    this.table = document.createElement('table');
    // Вызов функции, заполняищий table
    this.tableFiller();
  };

  // Геттер вернет ссылку на table
  get elem() {
    return this.table;
  };

  tableFiller() {
    // Создание элементов tHead и tBody внутри table
    let tHead = this.table.createTHead();
    let tBody = this.table.createTBody();

    // Заполнение tHead по заданному шаблону
    tHead.innerHTML = `
    <tr>
       <th>Имя</th>
       <th>Возраст</th>
       <th>Зарплата</th>
       <th>Город</th>
       <th></th>
    </tr>`;

    // Заполнение tBody элементами массива rows и добавление button последним td
    for (const row of this.rows) {
      tBody.innerHTML += `
      <tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>
      `;
    };

    // Собираем все кнопки в переменную button и циклом проходим по каждой
    const buttons = this.table.querySelectorAll('button');

    for (const button of buttons) {
      button.addEventListener('click', (e) => {
        // Удаляем tr, в котором находится button при событии click
        e.target.parentNode.parentNode.remove();
      })
    };
  }
}
