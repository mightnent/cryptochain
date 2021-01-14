const Blockchain = require('./blockchain');
const Block = require('./block');

describe('blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('is an array', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block to chain', () => {
        const newData = "foobar";
        blockchain.addBlock({newData});
        len = blockchain.chain.length;
        expect(blockchain.chain[len-1].data).toEqual(newData);
    });
    
    describe('isValidBlock', () => {
        describe('when chain does not start with genesis block',()=>{
            it('returns false',()=>{
                blockchain.chain[0] = {data:'fake'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when chain has genesis and multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({newData:'apple'});
                blockchain.addBlock({newData:'cidar'});
                blockchain.addBlock({newData:'banana'});
            });

            describe('but lastHash is changed',()=>{
                it('returns false',()=>{
                    
                    //wrong
                    blockchain.chain[2].lastHash = 'tampered-hash';

                    //expect
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('when the chain contain block with invalid field', () => {
                it('returns false',()=>{
                    console.log(blockchain.chain);
                    //wrong
                    blockchain.chain[2].data = 'banaana';
                    //expect
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('the chain does not have any invalid elements', () => {
                it('returns true',()=>{
                    console.log(blockchain.chain[1].data);
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                    
                });
            });
        });

    });
});