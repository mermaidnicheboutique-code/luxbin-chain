// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinEthSwap.sol";

contract DeploySwap is Script {
    function run() external {
        // LUXBIN token on Base
        address luxbinToken = 0x66b4627B4Dd73228D24f24E844B6094091875169;
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy swap contract
        LuxbinEthSwap swap = new LuxbinEthSwap(luxbinToken);
        
        console.log("LuxbinEthSwap deployed to:", address(swap));
        console.log("Owner:", swap.owner());
        
        vm.stopBroadcast();
    }
}
