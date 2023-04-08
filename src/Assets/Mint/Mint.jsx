import React from 'react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { ABI } from '../../MetaData/ABI/ABI'
import { ContractAddress } from '../../MetaData/ABI/ConstractAddress'

const Mint = () => {

    const { address, isConnected } = useAccount();



    const handleMint = async () => {
        //connect mea contract

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        const contract = new ethers.Contract(ContractAddress, ABI, signer);
        console.log(contract)
        // call SafeMint
        let res = await contract.SafeMint(address, 1);
        console.log(res)

    }
    return (
        <div>
            <button onClick={handleMint} disabled={!isConnected}>
                Mint
            </button>
        </div>
    )
}
export default Mint;