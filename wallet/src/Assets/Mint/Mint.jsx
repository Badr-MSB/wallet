import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ABI } from '../../MetaData/ABI/ABI'
import { ContractAddress } from '../../MetaData/ABI/ConstractAddress'

import './Mint.css'

const Mint = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [value, setValue] = useState(1);
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
        args: [address, value],
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

    useEffect(() => {
        if (isSuccess) {
            setIsFlipped(isSuccess);
        }
    }, [isSuccess]);

    const handleMoreMint = () => {
        setIsFlipped(!isFlipped);
    }
    return (

        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className='card-face card-front'>
                <h3>{data}</h3>
                <input id='tockenId' 
                className='tokenid' 
                defaultValue={1}
                type='number' 
                onChange={(event) => { setValue(event.target.value) }} >
                </input>
                <button onClick={() => { Mint_NFT?.() }} disabled={!isConnected} className='button'>
                    Mint
                </button >
                {MintingLoad && <div>Check Wallet</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </div>
            <div className='card-face card-back'>
                <h1>
                    NFT Minted
                </h1>
                <button onClick={handleMoreMint} className='button'>Mint More ?</button>
            </div>

        </div>
    )
}
export default Mint;