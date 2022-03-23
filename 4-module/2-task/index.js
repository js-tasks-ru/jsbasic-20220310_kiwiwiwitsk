function makeDiagonalRed(table) {
  // Цикл пройдет по всем рядам таблицы
  for (let i = 0; i < table.rows.length; i++) {
    // Если номер ряда соответствует номеру ячейки - её цвет изменится на красный
    table.rows[i].cells[i].style.background = 'red';
  }
}
