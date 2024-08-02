import "@stdlib/ownable";
import "@stdlib/deploy";

message Trash {
str: String;
to: Address;
}

message ChangeTCOwner{
    address: Address;
}

struct LastMessage {
    last_message: String?;
    last_sender: Address?;
    last_receiver: Address?;
}

struct User {
    name: String;
        user_address: Address?;
        count: Int as uint32 = 0;

}

struct Asset {
    description: String;
}

trait Stats {
    count: Int;
    last_message: String?;
    last_sender: Address?;
    last_receiver: Address?;

    get fun get_count(): Int {
        return self.count;
    }

    get fun get_last(): LastMessage {
        return LastMessage {
            last_message: self.last_message,
            last_sender: self.last_sender,
            last_receiver: self.last_receiver,
        };
    }
}

contract MainGarbageBin with Ownable, Stats, Deployable {
    owner: Address;
    count: Int = 0;
    last_message: String? = null;
    last_sender: Address? = null;
    last_receiver: Address? = null;

    user_list: map<Int as uint256, User>;
    fund: map<Address, Asset>;

    init(owner: Address){
        self.owner = owner;
        self.user_list = emptyMap();
        self.fund = emptyMap();
    }

    receive("Repeat") {
        self.requireOwner(); // sender not owner from Ownable
        send(SendParameters{
            to: self.last_receiver!!, // unnaming to base type, check if in null
            value: 0,
            mode: SendRemainingValue,
            body: (self.last_message!!).asComment()
        });
        self.count = self.count +1;
    }

    receive("Return") {
              let ctx: Context = context();

              require(ctx.sender == self.owner, "Invalid sender");  // sender not owner from Ownable
        send(SendParameters{
            to: self.last_sender!!, // unnaming to base type, check if in null
            value: 0,
            mode: SendRemainingValue,
            body: (self.last_message!!).asComment(),
        });
        self.count = self.count +1;
    }

    receive(str: String) {
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingValue,
            body: str.asComment()
        });

        let ctx: Context = context();

        self.storeStats(ctx.sender, self.owner, str);
    }

    receive(msg: Trash) {

        let hash: Int = sha256(msg.str);

        send(SendParameters{
            to: msg.to,
            value: 0,
            mode: SendRemainingValue,
            body: msg.str.asComment()
        });

         let ctx: Context = context();

        self.storeStats(ctx.sender, msg.to, msg.str);
    }

    receive(msg: ChangeTCOwner) {

            self.requireOwner();
            self.owner = msg.address;
        }


    fun storeStats(sender: Address, reciver: Address, message: String) {
        self.count = self.count + 1;
        self.last_sender = sender;
        self.last_receiver = reciver;
        self.last_message = message;
    }

    // TODO: trash mixer
    // TODO trash random trash broadcats

    fun set_new_user(user: User) {
                 let ctx: Context = context();

let hash: Int = sha256(ctx.sender.asComment());

self.user_list.set(hash, user);

return true;
    }

    fun remove_user() {
                         let ctx: Context = context();

        let hash: Int = sha256(ctx.sender.asComment());

 let user: User = self.user_list.get(hash)!!;

 self.user_list.set(hash, null);
    }
}