/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let liArr = friends
  .map(item => {return (item.firstName + ' ' + item.lastName)})
  .map(item => {return (item = `<li> ${item} </li>` )})
  .join("");

  let list = document.createElement('ul');
  list.innerHTML = `${liArr}`;
  return list;
}
