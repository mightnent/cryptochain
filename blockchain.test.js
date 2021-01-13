const Blockchain = require('./blockchain');
const Block = require('./block');

describe('blockchain', () => {
    const blockchain = new Blockchain();

    it('is an array', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('add new block to chain', () => {
        const newData = "foobar";
        blockchain.addBlock({newData});
        len = blockchain.chain.length;
        expect(blockchain.chain[len-1].data).toEqual(newData);
    });
});