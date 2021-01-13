const Block = require("./block");
const {GENESIS_DATA} = require("./config");

describe('Block', () => {
    const timestamp= "a time";
    const lastHash = "oldhash";
    const hash = "newhash";
    const data = "info";
    const block = new Block({timestamp,lastHash,hash,data});

    it('has timestamp,lastHash,hash and data', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.timestamp).toEqual(timestamp);        
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
        
    });
    
});