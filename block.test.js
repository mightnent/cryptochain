const Block = require("./block");
const {GENESIS_DATA} = require("./config");
const cryptoHash = require("./crypto-hash");

describe('Block', () => {
    const timestamp= "a time";
    const lastHash = "oldhash";
    const hash = "newhash";
    const data = ["info",'data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp,lastHash,hash,data,nonce,difficulty});

    it('has timestamp,lastHash,hash,data,nonce,dfficulty', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);        
    });

    describe('Genesis()',()=>{
        const genesisBlock = Block.genesis();
        
        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });
    
    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = "mined data";
        const mineBlock = Block.mineBlock({lastBlock,data});
        //mined block needs to be a block
        it('returns a Block instance', () => {
            expect(mineBlock instanceof Block).toBe(true);
        });
        it('sets lastHash to hash of lastBlock',()=>{
            expect(mineBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the data', () => {
            expect(mineBlock.data).toEqual(data);
        });

        it("sets time stamp",()=>{
            expect(mineBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a sha256 hash based on valid input', () => {
            expect(mineBlock.hash).toEqual(cryptoHash(mineBlock.timestamp,lastBlock.hash,mineBlock.difficulty,mineBlock.nonce,data));
        });

        it('sets a hash that matches the difficulty level', () => {
            expect(mineBlock.hash.substring(0,mineBlock.difficulty)).toEqual('0'.repeat(mineBlock.difficulty));
        });
    });
    
});