import React from 'react'
import { Web3Button } from '@web3modal/react'

function ConnectWallet() {

    return (
        <>
            <Web3Button balance='show' />
        </>
    )
}

export default ConnectWallet
