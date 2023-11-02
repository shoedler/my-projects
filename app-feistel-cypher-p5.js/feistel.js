/* Globals */
let L, R, tL, fRK;
let keys = [];

/* Parameters */
const KEY_COUNT = 10;
const MESSAGE_LENGTH = 400;

function setup() {
  /* Generate arbitrary Test Message */
  let letters = Array.from('abcdefghijklmnopqrstuvwxyz ');
  let testMessage = '';
  for (let i = 0; i < MESSAGE_LENGTH; i++) {
    testMessage += letters[Math.floor(Math.random() * Math.floor(letters.length))];
  }

  /* Generate random Keys */
  for (let i = 0; i < KEY_COUNT; i++) {
    let key = new Byte();
    key.value = Math.floor(Math.random() * Math.floor(255));
    keys.push(key);
  }

  /* Run feistel */
  feistel(feistel(testMessage), true);
}

let feistel = (message, decrypt = false) => {
  /* Defeisteling requires the Keys order to be reversed */
  if (decrypt) {
    keys = keys.reverse();
    console.log('Feistel Cypher [Decrypting]');
  } else console.log('Feistel Cypher [Encripting]');
  console.log('Using ' + KEY_COUNT + ' Keys');
  console.log('Input: ' + message);

  /* Start Timer */
  let timer = Date.now();

  /* Make length of message even */
  if (message.length % 2 != 0) message += ' ';

  /* Convert Message to Byte Array */
  let chars = [];
  for (let i = 0; i < message.length; i++) {
    let Char = new Byte();
    Char.value = message[i].charCodeAt(0);
    chars.push(Char);
  }

  /* Initialize L and R by splitting Chars Array in half */
  R = [...chars];
  L = R.splice(0, R.length / 2);

  /* Do Rounds depending on amount of Keys */
  for (let i = 0; i < keys.length; i++) {
    fRK = [...crypt(R, keys[i])]; // Run crypt-function (f) on R and the current round's key
    tL = [...xor(L, fRK)]; // XOR L to result of crypt-function, which is fRK
    L = [...R]; // Swap L and R
    R = [...tL];
  }

  /* Finalize */
  let end = [...R, ...L]; // Swap L and R again, concat

  /* Create output string */
  let result = byteArrayToString(end);
  let time = Date.now() - timer;

  /* Log Output */
  console.log('Output: ' + result);
  console.log('Action took ' + time + 'ms');

  if (KEY_COUNT < 20) {
    console.log('Used Keys:');
    for (let i = 0; i < keys.length; i++) console.log('   #' + i + ' = 0x' + keys[i].value.toString(16));
  }

  console.log(' ');

  return result;
};

/* Encrypts R using the key K and returns the result
Expects L and R to be Arrays of type Byte */
const crypt = (R, K) => {
  /* Check if 'bytes' is an Array */
  if (!Array.isArray(R)) throw "'L' and 'R' must be an array!";

  /* Check if each Item in 'bytes' is an instance of the byte Class */
  R.forEach((b) => {
    if (!(b instanceof Byte)) throw "Each item in 'R' must be of an instance of the 'Byte' class!";
  });

  /* Check if K is an instance of the byte Class */
  if (!(K instanceof Byte)) throw "'K' must be of an instance of the 'Byte' class!";

  /* XOR Each Byte of R to K */
  let eR = [];
  for (let i = 0; i < R.length; i++) {
    eR.push(new Byte(R[i].bitwiseXor(K)));
  }

  return eR;
};

/* XOR's L to R and returns the result
Expects L and R to be Arrays of type Byte */
const xor = (L, R) => {
  /* Check if 'bytes' is an Array */
  if (!Array.isArray(L) || !Array.isArray(R)) throw "'L' and 'R' must be an array!";

  /* Check if each Item in 'bytes' is an instance of the byte Class */
  L.forEach((b) => {
    if (!(b instanceof Byte)) throw "Each item in 'L' must be of an instance of the 'Byte' class!";
  });
  R.forEach((b) => {
    if (!(b instanceof Byte)) throw "Each item in 'R' must be of an instance of the 'Byte' class!";
  });

  /* XOR L to R */
  let nL = [];
  for (let i = 0; i < L.length; i++) {
    nL.push(new Byte(L[i].bitwiseXor(R[i])));
  }

  return nL;
};

/* Converts Byte Array to String */
const byteArrayToString = (bytes) => {
  /* Check if 'bytes' is an Array */
  if (!Array.isArray(bytes)) throw "'bytes' must be an array!";

  /* Check if each Item in 'bytes' is an instance of the byte Class */
  bytes.forEach((b) => {
    if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!";
  });

  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    str += String.fromCharCode(bytes[i].value);
  }

  return str;
};
