function makeFriendsList(friends) {
  // Создаем список ul и присваиваем его переменной friendsList
  let friendsList = document.createElement('ul');

  // Проходим по всем объектам массива friends
  for (let friend of friends) {
    // С помощью свойства innerHTML при каждой итерации цикла добавляем в список
    // элемент li, который содержит строку, составленную из firstName и lastName объекта  
    friendsList.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`
  }

  return friendsList
}
