export default function appendToEachArrayValue(array, appendString) {
  const tmpArray = [...array];
  let idx = 0;

  for (const val of tmpArray) {
    tmpArray[idx] = appendString + val;
    idx += 1;
  }
  return tmpArray;
}
