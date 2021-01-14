const Blockchain = require('./blockchain');
const Block = require('./block');

describe('blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain;
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
                    
                    //wrong
                    blockchain.chain[2].data = 'banaana';
                    //expect
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('the chain does not have any invalid elements', () => {
                it('returns true',()=>{
                    
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                    
                });
            });
        });

    });

    describe('replaceChain', () => {
        describe('when new chain is not longer',()=>{
            it('should not replace chain',()=>{
                //element zero is genesis block, which is an obj
                newChain.chain[0] = {new:'random'};//this is random key val pair
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain.chain);
            });
        });

        describe('when new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({newData:'apple'});
                newChain.addBlock({newData:'cidar'});
                newChain.addBlock({newData:'banana'});
            });
            describe('and chain is invalid', () => {
                it('should not replace chain',()=>{
                    newChain.chain[2].lastHash = 'tempered';
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(originalChain.chain);
                });
            });

            describe('and chain is valid', () => {
                it('should replace chain',()=>{
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);
                });
            });
        });
    });
});