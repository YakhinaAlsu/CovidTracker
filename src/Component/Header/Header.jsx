import React from 'react';
import s from './Header.module.css'



function Header () {
    return (
        <header className={s.header}>
        <img className={s.img} src='https://s3.xopic.de/openwho-public/channels/6eOt8B4vkv8b0W9BPb0pwa/logo_v1.png'/>
        <h2 className={s.title}>Статистика по коронавирусу</h2>
        </header>
    )
}

export default Header