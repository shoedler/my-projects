class Byte
{
    constructor(bits = [false, false, false, false, false, false, false ,false], signedness = false)
    {
        this.bits = bits;
        this.signedness = signedness; // Not implemented yet
    }

    get value() { return GetBinary([new Byte(this.bits)]); }
    set value(val)     { SetBinary([new Byte(this.bits)], val); }

    bitwiseAnd = (byte)  => { return BitwiseAnd([new Byte(this.bits)], [byte])[0].bits; }
    bitwiseOr = (byte)   => { return BitwiseOr ([new Byte(this.bits)], [byte])[0].bits; }
    bitwiseXor = (byte)  => { return BitwiseXor([new Byte(this.bits)], [byte])[0].bits; }
    shiftLeft = (amount) => { this.bits = ShiftLeft([new Byte(this.bits)], amount)[0].bits; }
}

class UInt16
{
    constructor(value = 0)
    {
        this.bytes = [new Byte(), new Byte()]; 
        this.value = value;
    }

    get value() { return GetBinary(this.bytes); }
    set value(val)     { SetBinary(this.bytes, val); }

    bitwiseAnd = (bytes) => { return BitwiseAnd(this.bytes, bytes); }
    bitwiseOr = (bytes)  => { return BitwiseOr (this.bytes, bytes); }
    bitwiseXor = (bytes) => { return BitwiseXor(this.bytes, bytes); }
    shiftLeft = (amount) => { this.bytes = ShiftLeft (this.bytes, amount);}
}

class UInt32 extends UInt16 { constructor() {super(); super.bytes = [new Byte(), new Byte(), new Byte(), new Byte()]} }

let SetBinary = (bytes, Value) =>
{   
    /* Check if 'bytes' is an Array */
    if (!Array.isArray(bytes)) throw "'bytes' must be an array!";

    /* Check if each Item in 'bytes' is an instance of the 'byte' Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!"});

    /* Check if 'Value' does not contain Decimals an is bigger than 0 */
    if ((!Number.isInteger(Value)) || (Value < 0)) throw "'Value' cannot contain Decimal or be < 0. Currently it's: " + Value;

    /* Check if the specified 'Value' fits into the specified 'bytes' */
    if (Value > Math.pow(2, ((bytes.length) * 8)) - 1) throw "'Value' to big ('Value' must be < " + Math.pow(2, ((bytes.length) * 8)) + ") but is: " + Value;

    let bytePointer = bytes.length;

    for (let i = bytes.length * 8 - 1; i >= 0; i--)
    {
        bytePointer -= Number.isInteger((i + 1) / 8) ? 1 : 0; /* Decrease 'bytePointer' if 'i' is dividable by 8 */
        
        bytes[bytePointer].bits[i - (bytePointer * 8)] = (Value - Math.pow(2, i) >= 0) ? true : false;
        
        Value -= ((Value - Math.pow(2, i) >= 0) && (Value != 0)) ? Math.pow(2, i) : 0;
    }

    if (Value != 0) throw "Something went wrong..."
}

let GetBinary = (bytes) =>
{
    /* Check if 'bytes' is an Array */
    if (!Array.isArray(bytes)) throw "bytes must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!"});

    let sum = 0
    let bytePointer = -1

    for (let i = 0; i < bytes.length * 8; i++) 
    { 
        bytePointer += (Number.isInteger(i / 8)) ? 1 : 0; /* Increase 'bytePointer' if 'i' is dividable by 8 */
        
        sum += bytes[bytePointer].bits[i - (bytePointer * 8)] ? Math.pow(2, i) : 0; 
    }

    return sum
}

let BitwiseAnd = (bytes, bytesTwo) =>
{   
    /* Check if 'bytes' and 'bytesTwo' is an Array */
    if (!Array.isArray(bytes) || !Array.isArray(bytesTwo)) throw "bytes and bytesTwo must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!" });
    bytesTwo.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytesTwo' must be of an instance of the 'Byte' class!" });

    /* Check if both arrays are the same length */
    if (bytes.length != bytesTwo.length) throw "'bytes' and 'bytesTwo' must be the same length!";


    let ret = []
    for (let i = 0; i < bytes.length; i++) ret.push(new Byte());

    for (let i = 0; i < bytes.length; i++)
    {
        for (let j = 0; j < 8; j++) ret[i].bits[j] = (bytes[i].bits[j] && bytesTwo[i].bits[j]);
    }

    return ret;
}

let BitwiseOr  = (bytes, bytesTwo) =>
{   
    /* Check if 'bytes' and 'bytesTwo' is an Array */
    if (!Array.isArray(bytes) || !Array.isArray(bytesTwo)) throw "bytes and bytesTwo must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!" });
    bytesTwo.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytesTwo' must be of an instance of the 'Byte' class!" });

    /* Check if both arrays are the same length */
    if (bytes.length != bytesTwo.length) throw "'bytes' and 'bytesTwo' must be the same length!";


    let ret = []
    for (let i = 0; i < bytes.length; i++) ret.push(new Byte());

    for (let i = 0; i < bytes.length; i++)
    {
        for (let j = 0; j < 8; j++) ret[i].bits[j] = (bytes[i].bits[j] || bytesTwo[i].bits[j]);
    }

    return ret;
}

let BitwiseXor = (bytes, bytesTwo) =>
{   
    /* Check if 'bytes' and 'bytesTwo' is an Array */
    if (!Array.isArray(bytes) || !Array.isArray(bytesTwo)) throw "bytes and bytesTwo must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!" });
    bytesTwo.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytesTwo' must be of an instance of the 'Byte' class!" });

    /* Check if both arrays are the same length */
    if (bytes.length != bytesTwo.length) throw "'bytes' and 'bytesTwo' must be the same length!";


    let ret = []
    for (let i = 0; i < bytes.length; i++) ret.push(new Byte());

    for (let i = 0; i < bytes.length; i++)
    {
        for (let j = 0; j < 8; j++) ret[i].bits[j] = ((bytes[i].bits[j] || bytesTwo[i].bits[j]) && !(bytes[i].bits[j] && bytesTwo[i].bits[j]));
    }

    return ret;
}

let ShiftLeft  = (bytes, amount) =>
{
    /* Check if 'bytes' is an Array */
    if (!Array.isArray(bytes)) throw "bytes must be an array!"

    /* Check if each Item in 'bytes' is an instance of the byte Class */
    bytes.forEach(b => { if (!(b instanceof Byte)) throw "Each item in 'bytes' must be of an instance of the 'Byte' class!" });

    /* Check if there is enough room (room = zeros, or 'false') to shift */
    bytes[bytes.length - 1].bits.slice((8 - amount)).forEach(b => { if (b) throw "Not enough room in to shift!"; });

    let bits = [];
    bytes.forEach(b => { bits = bits.concat(b.bits); });

    bits = new Array(amount).fill(false).concat(bits.splice(0, bits.length - amount));
    
    let ret = [];
    while (bits.length / 8 > 0) ret.push(new Byte(bits.splice(0, 8)));
   
    return ret;
}