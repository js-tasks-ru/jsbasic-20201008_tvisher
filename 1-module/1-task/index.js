/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if(n == 1 || n == 0){
    return 1;
  }
  let result = n;
  for (let i = 0 ; i < n; i++){
    n -= 1;
    result *= n ;
  }
  return result; 
}
