/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows;

    let status = row[i].cells[3];
    let statusAtribute = status.dataset.available;

    let gender = row[i].cells[2];
    let genderText = gender.innerHTML;

    let age = row[i].cells[1];
    let ageNum = age.innerHTML;

    if (ageNum < 18) {
      row[i].style = "text-decoration: line-through";
    }

    if (genderText.includes('m')) {
      row[i].classList.add("male");
    }

    if (genderText.includes('f')) {
      row[i].classList.add("female");
    }

    if (!statusAtribute) {
      row[i].setAttribute("hidden", '');
      continue;
    }

    if (statusAtribute.includes("true")) {
      row[i].classList.add("available");
    }

    if (statusAtribute.includes("false")) {
      row[i].classList.add("unavailable");
    }
  }
}
