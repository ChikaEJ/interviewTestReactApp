import styles from "./Footer.module.css";
import React from 'react';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span>Almaty 2024</span>
            <h4>developed by Chingiz Eraliev</h4>
        </footer>
    );
};

export default Footer;