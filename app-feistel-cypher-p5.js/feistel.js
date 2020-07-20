/* Globals */
let L, R, tL, fRK
let Keys = [];

/* Parameters */
let KeyCount = 10;
let MessageLength = 400;


function setup()
{
    /* Generate arbitrary Test Message */
    let Letters = Array.from("abcdefghijklmnopqrstuvwxyz ");
    let TestMessage = "";
    for (let i = 0; i < MessageLength; i++)
    {
        TestMessage += Letters[(Math.floor(Math.random() * Math.floor(Letters.length)))];
    }

    /* Generate random Keys */ 
    for (let i = 0; i < KeyCount; i++)
    {
        let Key = new Byte(); 
        Key.value = Math.floor(Math.random() * Math.floor(255))
        Keys.push(Key);
    }

    /* Run feistel */
    feistel(feistel(TestMessage), true);
}


let feistel = (message, decrypt = false) =>
{  
    /* Defeisteling requires the Keys order to be reversed */
    if (decrypt) 
    {
        Keys = Keys.reverse();
        console.log("Feistel Cypher [Decrypting]");
    }

    else console.log("Feistel Cypher [Encripting]");
    console.log("Using " + KeyCount + " Keys");
    console.log("Input: " + message);
    
    
    /* Start Timer */
    let Timer = Date.now();

    /* Make length of message even */
    if (message.length % 2 != 0) message += " ";

    /* Convert Message to Byte Array */
    let Chars = [];
    for (let i = 0; i < message.length; i++) 
    {
        let Char = new Byte();
        Char.value = message[i].charCodeAt(0);
        Chars.push(Char);
    }

    /* Initialize L and R by splitting Chars Array in half */
    R = [...Chars]
    L = R.splice(0, R.length / 2);

    /* Do Rounds depending on amount of Keys */
    for (let i = 0; i < Keys.length; i++)
    {
        fRK = [...crypt(R, Keys[i])]; // Run crypt-function (f) on R and the current round's key
        tL =  [...XOR(L, fRK)];       // XOR L to result of crypt-function, which is fRK
        L =   [...R];                 // Swap L and R
        R =   [...tL]; 
    }

    /* Finalize */
    let End = [...R, ...L]; // Swap L and R again, concat

    /* Create output string */
    let Result = ByteArrayToString(End);
    let Time = Date.now() - Timer;
    
    /* Log Output */
    console.log("Output: " + Result);
    console.log("Action took " + Time + "ms");

    if (KeyCount < 20)
    {
        console.log("Used Keys:");
        for (let i = 0; i < Keys.length; i++) console.log("   #" + i + " = 0x" + Keys[i].value.toString(16));
    }

    console.log(" ");
    
    return Result
}


/* Encrypts R using the key K and returns the result
Expects L and R to be Arrays of type Byte */
let crypt = (R, K) =>
{
    /* Check if 'bytes' is an Array */
    if (!Array.isArray(R)) throw "'L' and 'R' must be an array!" 
    
    /* Check if each Item in 'bytes' is an instance of the byte Class */
    R.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'R' must be of an instance of the 'Byte' class!" });

    /* Check if K is an instance of the byte Class */
    if (!(K instanceof Byte)) throw "'K' must be of an instance of the 'Byte' class!";

    /* XOR Each Byte of R to K */
    let eR = [];
    for (let i = 0; i < R.length; i++)
    {
        eR.push(new Byte(R[i].bitwiseXor(K)));
    } 

    return eR  
} 

/* XOR's L to R and returns the result
Expects L and R to be Arrays of type Byte */
let XOR = (L, R) =>
{
    /* Check if 'bytes' is an Array */
    if (!Array.isArray(L) || !Array.isArray(R)) throw "'L' and 'R' must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    L.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'L' must be of an instance of the 'Byte' class!" });
    R.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'R' must be of an instance of the 'Byte' class!" });

    /* XOR L to R */
    let nL = [];
    for (let i = 0; i < L.length; i++)
    {
        nL.push(new Byte(L[i].bitwiseXor(R[i])));
    } 

    return nL  
}

/* Converts Byte Array to String */
let ByteArrayToString = (bytes) =>
{
    /* Check if 'bytes' is an Array */
    if (!Array.isArray(bytes)) throw "'bytes' must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!" });

    let str = "";
    for (let i = 0; i < bytes.length; i++)
    {
        str += String.fromCharCode(bytes[i].value);
    }

    return str;
}