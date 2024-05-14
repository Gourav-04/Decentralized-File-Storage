// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    mapping(address => string[]) private userFiles;

    // Adding files to blockchain
    function uploadFile(string memory url) public {
        userFiles[msg.sender].push(url);
    }


    function getFile(uint fileindex) public view returns (string memory) {
        require(fileindex>0 && fileindex <= userFiles[msg.sender].length, "Index out of bounds");
        return userFiles[msg.sender][fileindex-1];
    }

    function getFileCount() public view returns (uint) {
        return userFiles[msg.sender].length;
    }
    
}
