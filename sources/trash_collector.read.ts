import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { MainGarbageBin } from "./output/trash_collector_MainGarbageBin";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let owner = Address.parse("UQDi4ro4LI8WdK2IW0HEYM4MRu0vQsaK-1F46uYD0V4BVxCY");
    let init = await MainGarbageBin.init(owner);
    let contract_address = contractAddress(0, init);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    let contract = await MainGarbageBin.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getGetCount()));
})();
