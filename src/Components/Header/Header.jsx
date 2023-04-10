import React from 'react'
import ConnectWallet from '../../Assets/ConnectWallet/ConnectWallet'

import './Header.css'
import logo from '../../Images/Montains.png'

const Header = () => {
    return (
        <div className='header'>

            <h1 className='header logo'> Header</h1>
            <img  className='header logo' />
            <ConnectWallet />
        </div>
    )
}

export default Header