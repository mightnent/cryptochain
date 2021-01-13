const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];

    }

    addBlock({newData}){
        const newBlock = Block.mineBlock({
            lastBlock:this.chain[this.chain.length-1],
            data:newData
        });
        this.chain.push(newBlock);
    }
}

module.exports = Blockchain;