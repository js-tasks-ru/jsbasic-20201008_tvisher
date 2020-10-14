/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  let shortPhrase = str.substr(0, +maxlength - 1);
  if (str.length > 19) {
    return shortPhrase + "…"; 
  } else {return shortPhrase;}
}
