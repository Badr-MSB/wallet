import React from 'react'
import { ethers } from 'ethers'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ABI } from '../../MetaData/ABI/ABI'
import { ContractAddress } from '../../MetaData/ABI/ConstractAddress'



const Mint = () => {

    const { address, isConnected } = useAccount();
    //Contract Read 
    const { data, isError, isLoading } = useContractRead({
        address: ContractAddress,
        abi: ABI,
        functionName: 'name',
    })
    //Contract write
    const { config } = usePrepareContractWrite({
        address: ContractAddress,
        abi: ABI,
        functionName: 'safeMint',
        args: [address, 3],
    })
    const { data: MintingData, isLoading: MintingLoad, isSuccess, write: Mint_NFT } = useContractWrite(config)

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
            <h3>{data}</h3>
            <button onClick={() => { Mint_NFT?.() }} disabled={!isConnected}>
                Mint
            </button>
            {MintingLoad && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
    )
}
export default Mint;