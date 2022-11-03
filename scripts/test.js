// <Button size={{ base: 'small', md: 'medium', lg: 'large' }}

// size = { base: 'small', md: 'medium', lg: 'large' }
// size = "small"

// { base: 'red', md: '#333', lg: '#666' } => { base: 'red', sm: 'red', md: '#333', lg: '#666', xl: '#666' }
// { base: 'red', xl: '#666' } => { base: 'red', sm: 'red', md: 'red', lg: red', xl: '#666' }
// { md: '#333', lg: '#666' } => { md: '#333', lg: '#666', xl: '#666' }

const computeSizeObj = (obj) => {
  const SIZE = {
    base: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
  };

  const SIZE_ARRAY = Object.keys(SIZE);
  const sizeIterator = SIZE_ARRAY[Symbol.iterator]();
  let iterator = sizeIterator.next();

  for (let objKey in obj) {
    for (let sizeKey in SIZE) {
      if (objKey === sizeKey) {
        SIZE[sizeKey] = obj[objKey];
      }
    }
  }

  let key = "";
  while (!iterator.done) {
    if (SIZE[iterator.value]) {
      key = iterator.value;
      iterator = sizeIterator.next();
    } else {
      if (key) {
        SIZE[iterator.value] = SIZE[key];
      } else {
        iterator = sizeIterator.next();
      }
    }
  }
  return SIZE;
};

const obj1 = { base: "red", md: "#333", xl: "#666" };
const obj2 = { base: "red", xl: "#666" };
const obj3 = { md: "#333", lg: "#666" };

const r1 = computeSizeObj(obj1);
const r2 = computeSizeObj(obj2);
const r3 = computeSizeObj(obj3);

console.log(r1);
console.log(r2);
console.log(r3);
