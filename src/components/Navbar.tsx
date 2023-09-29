import "../css/Navbar.css"
import React, { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";

const Navbar: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [active,setActive] = useState(false);

  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };


  const isActive = () => {
      window.scrollY > 0 ? setActive (true) : setActive(false);
  }

  return (
    <div className={ "navbar" }>
    <div className='container'>
        <div className='logo'>
            <span className='text'>transactcode</span>
            <span className='dot'>...</span>
        </div>
        <div className='links'>
            <span>Home</span>
            <span>AboutUs</span>
            <span><button
          onClick={onConnectWallet}
          className={ "button px-6 py-2 rounded-sm text-xs font-semibold text-white cursor-pointer"}
        >
          💳{" "}
          {account
            ? account.slice(0, 4) +
              "..." +
              account.slice(account.length - 4, account.length)
            : "Connect"}
          </button></span>
          {account ?  <button className={ "button"}>Sell</button> : ""}
        </div>
    </div>    
</div>
  );
}
export default Navbar
