import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { MainGarbageBin } from "./output/trash_collector_MainGarbageBin";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    // Parameters
    let testnet = true;
    let packageName = "trash_collector_MainGarbageBin.pkg";
    let owner = Address.parse("UQDi4ro4LI8WdK2IW0HEYM4MRu0vQsaK-1F46uYD0V4BVxCY");
    let init = await MainGarbageBin.init(owner);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
