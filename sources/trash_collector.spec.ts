import { toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { MainGarbageBin } from "./output/trash_collector_MainGarbageBin";
import { inspect } from "util"

describe("contract", () => {
  it("forward messages", async () => {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();

    let owner = system.treasure("owner");
    let user1 = system.treasure("user1");
    let user2 = system.treasure("user2");

    let mgb = system.open(await MainGarbageBin.fromInit(owner.address));
    let mgb_tracker = system.track(mgb);

    await mgb.send(user1, { value: toNano("0.1") }, { $$type: 'TrashMessage', str: "Hello", to: user2.address });
    await system.run();

    expect(await mgb.getGetCount()).toEqual(1n);
    expect((await mgb.getGetLast()).last_message).toEqual("Hello");
    expect(((await mgb.getGetLast()).last_receiver)?.equals(user2.address)).toBeTruthy();
    expect(((await mgb.getGetLast()).last_sender)?.equals(user1.address)).toBeTruthy();

    let mgb_events = mgb_tracker.collect();
    expect(mgb_events).toMatchSnapshot();
    console.log(inspect(mgb_events, true, null, true));
  });
});
