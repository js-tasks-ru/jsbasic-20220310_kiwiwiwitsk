function highlight(table) {
  // Получаем все строки таблицы
  let rows = table.tBodies[0].rows;

  for (let i = 0; i < rows.length; i++) {
    //Переменная для каждой строки
    let row = rows[i];
    // Переменные для столбцов Age, Gender, Status
    let age = row.children[1];
    let gender = row.children[2];
    let status = row.children[3];

    // Проверка наличия статуса data-available
    if (status.hasAttribute('data-available')) {
      // Добавление классов available и unavailable после проверки содержимого статуса data-available
      if (status.getAttribute('data-available') === 'true') {
        row.classList.add('available')
      } else {
        row.classList.add('unavailable')
      }
    } else {
      // Добавление статуса hidden при отсутсвии стасу data-available
      row.hidden = true;
    }

    // Проверка возраста
    if (age.innerHTML < 18) {
      row.style = "text-decoration: line-through";
    }

    // Добавление классов male и female после проверки содержимого gender
    if (gender.innerHTML === 'm') {
      row.classList.add('male')
    } else {
      row.classList.add('female')
    }
  }
}
