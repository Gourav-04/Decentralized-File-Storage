import FileStorage from "./artifacts/contracts/FileStorage.sol/FileStorage.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./Components/FileUpload";
import Display from "./Components/Display";
import Total from "./Components/Total";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      loadProvider(provider);
    } catch (error) {
      // alert("Metamask is not installed.Please install metamask wallet and set account there");
    }
  }, []);

  const loadProvider = async (provider) => {
    if (provider) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      let acc= await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      let contractAddress = "0x496c3457F0C436Fc51c40de889024f20023d7Fe6";

      const contract = new ethers.Contract(
        contractAddress,
        FileStorage.abi,
        signer
      );
      setContract(contract);
      setProvider(provider);
    }
  };
  return (
    <>
      <header>
        <div className="cont">
          <ul>
            <li className="item"><a href="#">Home</a></li>
            <li className="item"><a href="#">About</a></li>
            <li className="item"><a href="#">Services</a></li>
            <li className="item"><a href="#">Contact us</a></li>
            <input type="text" className="item" id="inp" placeholder="Search Here" />
          </ul>
        </div>
      </header>

      <section>
        <h1 className="head1">Decentralized File Storage System</h1>
        <p className="desc1">(This is a decentralized file storage system built on the blockchain.)</p>
        <div className="account">Account : {account ? account : "Not connected"}</div>

        <div className="add">
          <FileUpload
            account={account}
            contract={contract}
          />
        </div>
        <div >
        <Display contract={contract}/>
        </div>
        <div className="total">
         <Total contract={contract}/>
        </div>
      </section>

      <footer>
        &copy; Gs Community. All rights reserved.
      </footer>

    </>
  );
}

export default App;