import React from 'react'
import ConnectWallet from '../../Assets/ConnectWallet/ConnectWallet'

import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <h1 className='header logo'> Header</h1>
            <ConnectWallet />
        </div>
    )
}

export default Header