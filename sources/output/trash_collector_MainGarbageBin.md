# TACT Compilation Report
Contract: MainGarbageBin
BOC Size: 1582 bytes

# Types
Total Types: 13

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## TrashMessage
TLB: `trash_message#7572f318 str:^string to:address = TrashMessage`
Signature: `TrashMessage{str:^string,to:address}`

## ChangeTCOwner
TLB: `change_tc_owner#cdb5cc1b address:address = ChangeTCOwner`
Signature: `ChangeTCOwner{address:address}`

## LastMessage
TLB: `_ last_message:Maybe ^string last_sender:Maybe address last_receiver:Maybe address = LastMessage`
Signature: `LastMessage{last_message:Maybe ^string,last_sender:Maybe address,last_receiver:Maybe address}`

## User
TLB: `_ name:^string user_address:Maybe address count:uint32 = User`
Signature: `User{name:^string,user_address:Maybe address,count:uint32}`

## Asset
TLB: `_ description:^string = Asset`
Signature: `Asset{description:^string}`

# Get Methods
Total Get Methods: 3

## owner

## get_count

## get_last

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender