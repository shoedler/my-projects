let aIst = [];
let aSoll = [];

let wIn = null;
let wOut = null;

let bitAmount = 16;
let lampSize = 10;

let testIndex = 0;

const TEST_VALUES = [
  0x34fa, 0xff12, 0x1234, 0xa34c, 0x2322, 0x01ff, 0xff57, 0x4545, 0x2332, 0xfafa, 0x678e, 0xabe2, 0xfeac, 0x234f,
  0x343a, 0xaaaa,
];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // Create Checksum Values;
  for (let i = 0; i < bitAmount; i++) {
    aSoll.push(new UInt16(TEST_VALUES[i]));
    aIst.push(new UInt16(0));
  }

  // Create I/O
  wOut = new UInt16(0);
  wIn = new UInt16(0);

  frameRate(2);
}

function draw() {
  background(53);

  // Do Test
  if (testIndex == bitAmount) {
    // Test finished

    // Check if any Checksum of aIst is > 0 and display
    for (let i = 0; i < aIst.length; i++) {
      if (aIst[i].value != 0) {
        console.log(`Error at test index ${i}: it's ${aIst[i].value} instead of ${TEST_VALUES[i]}`);
        testIndex = i;
        wOut.value = Math.pow(2, testIndex);
        simulate();
        drawIO();
      }
    }
    noLoop();
  } else {
    simulate();

    // Turn on each separete bit
    wOut.value = Math.pow(2, testIndex);

    // Get Checksum
    aIst[testIndex].bytes = wIn.bitwiseXor(aSoll[testIndex].bytes);

    drawIO();

    testIndex++;
  }
}

const simulate = () => {
  wIn.value = TEST_VALUES[testIndex];

  // Add Error Value on index 12
  if (testIndex == 12) wIn.value = TEST_VALUES[12] - 0x8;
};

const drawIO = () => {
  stroke(0);
  fill(255);
  textAlign(LEFT, CENTER);
  text('Out', 30, 50);
  text('In', 30, 100);
  text('Soll', 30, 150);
  text('XOR', 30, 200);

  text(`=        0x${wOut.value.toString(16).padStart(4, '0')}`, 450, 50);
  text(`=        0x${wIn.value.toString(16).padStart(4, '0')}`, 450, 100);
  text(`=        0x${aSoll[testIndex].value.toString(16).padStart(4, '0')}`, 450, 150);
  text(`=        0x${aIst[testIndex].value.toString(16).padStart(4, '0')}`, 450, 200);

  textAlign(CENTER, CENTER);
  for (let i = 0; i < bitAmount; i++) {
    text('⊕', 100 + i * lampSize * 2, 125);
    text('↓', 100 + i * lampSize * 2, 175);
    text(i, 100 + i * lampSize * 2, 25);
  }

  stroke(255);

  wOut.bytes.forEach((byte, byteIndex) => {
    byte.bits.forEach((bit, index) => {
      let c = color(0, 0, 0, 0);
      if (bit) c = color(0, 200, 0, 255);
      fill(c);
      ellipse(100 + byteIndex * 8 * lampSize * 2 + index * lampSize * 2, 50, lampSize, lampSize);
    });
  });

  wIn.bytes.forEach((byte, byteIndex) => {
    byte.bits.forEach((bit, index) => {
      let c = color(0, 0, 0, 0);
      if (bit) c = color(0, 200, 0, 255);
      fill(c);
      ellipse(100 + byteIndex * 8 * lampSize * 2 + index * lampSize * 2, 100, lampSize, lampSize);
    });
  });

  aSoll[testIndex].bytes.forEach((byte, byteIndex) => {
    byte.bits.forEach((bit, index) => {
      let c = color(0, 0, 0, 0);
      if (bit) c = color(0, 200, 0, 255);
      fill(c);
      ellipse(100 + byteIndex * 8 * lampSize * 2 + index * lampSize * 2, 150, lampSize, lampSize);
    });
  });

  aIst[testIndex].bytes.forEach((byte, byteIndex) => {
    if (byte.value > 0) {
      byte.bits.forEach((bit, index) => {
        let c = color(100, 0, 0, 100);
        if (bit) c = color(250, 0, 0, 255);
        fill(c);
        ellipse(100 + byteIndex * 8 * lampSize * 2 + index * lampSize * 2, 200, lampSize, lampSize);
      });
    } else {
      let c = color(0, 0, 0, 255);
      byte.bits.forEach((bit, index) => {
        fill(c);
        ellipse(100 + byteIndex * 8 * lampSize * 2 + index * lampSize * 2, 200, lampSize, lampSize);
      });
    }
  });
};
