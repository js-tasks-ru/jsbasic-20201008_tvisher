/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let test = str.toLowerCase();
  if (test.includes('xxx') || test.includes('1xbet')) {
    return true;
  } else {
    return false;
  }
}
