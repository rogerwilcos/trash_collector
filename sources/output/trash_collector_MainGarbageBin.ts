import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type TrashMessage = {
    $$type: 'TrashMessage';
    str: string;
    to: Address;
}

export function storeTrashMessage(src: TrashMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1970467608, 32);
        b_0.storeStringRefTail(src.str);
        b_0.storeAddress(src.to);
    };
}

export function loadTrashMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1970467608) { throw Error('Invalid prefix'); }
    let _str = sc_0.loadStringRefTail();
    let _to = sc_0.loadAddress();
    return { $$type: 'TrashMessage' as const, str: _str, to: _to };
}

function loadTupleTrashMessage(source: TupleReader) {
    let _str = source.readString();
    let _to = source.readAddress();
    return { $$type: 'TrashMessage' as const, str: _str, to: _to };
}

function storeTupleTrashMessage(source: TrashMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.str);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserTrashMessage(): DictionaryValue<TrashMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTrashMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTrashMessage(src.loadRef().beginParse());
        }
    }
}

export type ChangeTCOwner = {
    $$type: 'ChangeTCOwner';
    address: Address;
}

export function storeChangeTCOwner(src: ChangeTCOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3451243547, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadChangeTCOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3451243547) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'ChangeTCOwner' as const, address: _address };
}

function loadTupleChangeTCOwner(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'ChangeTCOwner' as const, address: _address };
}

function storeTupleChangeTCOwner(source: ChangeTCOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserChangeTCOwner(): DictionaryValue<ChangeTCOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeTCOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeTCOwner(src.loadRef().beginParse());
        }
    }
}

export type LastMessage = {
    $$type: 'LastMessage';
    last_message: string | null;
    last_sender: Address | null;
    last_receiver: Address | null;
}

export function storeLastMessage(src: LastMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.last_message !== null && src.last_message !== undefined) { b_0.storeBit(true).storeStringRefTail(src.last_message); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.last_sender);
        b_0.storeAddress(src.last_receiver);
    };
}

export function loadLastMessage(slice: Slice) {
    let sc_0 = slice;
    let _last_message = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _last_sender = sc_0.loadMaybeAddress();
    let _last_receiver = sc_0.loadMaybeAddress();
    return { $$type: 'LastMessage' as const, last_message: _last_message, last_sender: _last_sender, last_receiver: _last_receiver };
}

function loadTupleLastMessage(source: TupleReader) {
    let _last_message = source.readStringOpt();
    let _last_sender = source.readAddressOpt();
    let _last_receiver = source.readAddressOpt();
    return { $$type: 'LastMessage' as const, last_message: _last_message, last_sender: _last_sender, last_receiver: _last_receiver };
}

function storeTupleLastMessage(source: LastMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.last_message);
    builder.writeAddress(source.last_sender);
    builder.writeAddress(source.last_receiver);
    return builder.build();
}

function dictValueParserLastMessage(): DictionaryValue<LastMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLastMessage(src)).endCell());
        },
        parse: (src) => {
            return loadLastMessage(src.loadRef().beginParse());
        }
    }
}

export type User = {
    $$type: 'User';
    name: string;
    user_address: Address | null;
    count: bigint;
}

export function storeUser(src: User) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeAddress(src.user_address);
        b_0.storeUint(src.count, 32);
    };
}

export function loadUser(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _user_address = sc_0.loadMaybeAddress();
    let _count = sc_0.loadUintBig(32);
    return { $$type: 'User' as const, name: _name, user_address: _user_address, count: _count };
}

function loadTupleUser(source: TupleReader) {
    let _name = source.readString();
    let _user_address = source.readAddressOpt();
    let _count = source.readBigNumber();
    return { $$type: 'User' as const, name: _name, user_address: _user_address, count: _count };
}

function storeTupleUser(source: User) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeAddress(source.user_address);
    builder.writeNumber(source.count);
    return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUser(src)).endCell());
        },
        parse: (src) => {
            return loadUser(src.loadRef().beginParse());
        }
    }
}

export type Asset = {
    $$type: 'Asset';
    description: string;
}

export function storeAsset(src: Asset) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.description);
    };
}

export function loadAsset(slice: Slice) {
    let sc_0 = slice;
    let _description = sc_0.loadStringRefTail();
    return { $$type: 'Asset' as const, description: _description };
}

function loadTupleAsset(source: TupleReader) {
    let _description = source.readString();
    return { $$type: 'Asset' as const, description: _description };
}

function storeTupleAsset(source: Asset) {
    let builder = new TupleBuilder();
    builder.writeString(source.description);
    return builder.build();
}

function dictValueParserAsset(): DictionaryValue<Asset> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAsset(src)).endCell());
        },
        parse: (src) => {
            return loadAsset(src.loadRef().beginParse());
        }
    }
}

 type MainGarbageBin_init_args = {
    $$type: 'MainGarbageBin_init_args';
    owner: Address;
}

function initMainGarbageBin_init_args(src: MainGarbageBin_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function MainGarbageBin_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMainGarbageBin_init_args({ $$type: 'MainGarbageBin_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MainGarbageBin_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
}

const MainGarbageBin_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TrashMessage","header":1970467608,"fields":[{"name":"str","type":{"kind":"simple","type":"string","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeTCOwner","header":3451243547,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LastMessage","header":null,"fields":[{"name":"last_message","type":{"kind":"simple","type":"string","optional":true}},{"name":"last_sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"last_receiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"User","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"user_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Asset","header":null,"fields":[{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
]

const MainGarbageBin_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_count","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_last","arguments":[],"returnType":{"kind":"simple","type":"LastMessage","optional":false}},
]

const MainGarbageBin_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Repeat"}},
    {"receiver":"internal","message":{"kind":"text","text":"Return"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TrashMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeTCOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MainGarbageBin implements Contract {
    
    static async init(owner: Address) {
        return await MainGarbageBin_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await MainGarbageBin_init(owner);
        const address = contractAddress(0, init);
        return new MainGarbageBin(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MainGarbageBin(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MainGarbageBin_types,
        getters: MainGarbageBin_getters,
        receivers: MainGarbageBin_receivers,
        errors: MainGarbageBin_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Repeat' | 'Return' | string | TrashMessage | ChangeTCOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Repeat') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Return') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TrashMessage') {
            body = beginCell().store(storeTrashMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeTCOwner') {
            body = beginCell().store(storeChangeTCOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_count', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetLast(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_last', builder.build())).stack;
        const result = loadTupleLastMessage(source);
        return result;
    }
    
}