"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
    "The power of a gun can kill",
    "and the power of fire can burn",
    "the power of wind can chill",
    "and the power of a mind can learn",
    "the power of anger can rage",
    "inside until it tears u apart",
    "but the power of a smile",
    "especially yours can heal a frozen heart",
];

var Blockchain = {
    blocks: [],
};

// Genesis block
Blockchain.blocks.push({
    index: 0,
    hash: "000000",
    data: "",
    timestamp: Date.now(),
});

const verifyChain = () => {
  for (let i = 0; i < Blockchain.blocks.length; i++) {
    let block = Blockchain.blocks[i];
    let hashInput = block.index.toString()+ block.data + block.timestamp.toString() + block.hash; 
     if (Blockchain.blocks.length > 1) {
       if (block.data !== null 
          && block.data !== undefined 
          && block.prevHash !== null 
          && block.prevHash !== undefined
          && block.prevHash === Blockchain.blocks[i - 1].hash
        ) {
          console.log('valid block');
       } else {
         if (block.index === 0 && block.hash === '000000') {
            console.log('first block');
         } else {
            console.log('invalid block');
         }
       }
     }
   }
 };

const createBlock = () => {
  for (let x = Blockchain.blocks.length; x <= poem.length; x++) {
      let blockTime = Date.now();
      let hashInput = x.toString() + poem[x] + blockTime.toString() + Blockchain.blocks[x-1].hash;
      let newBlock = {
        index: x,
        hash: blockHash(hashInput),
        data: poem[x - 1],
        prevHash: Blockchain.blocks[x-1].hash,
        timestamp: blockTime,
      }
      Blockchain.blocks.push(newBlock);
  }    
};

function blockHash(input) {
    return crypto.createHash("sha256").update(input).digest("hex");
}

createBlock();
console.log(Blockchain)
verifyChain();
