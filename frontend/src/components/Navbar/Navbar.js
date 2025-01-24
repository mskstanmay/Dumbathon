import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.brandName}>
                    ✨ Squad Buster
                </div>
                <div className={styles.navLinks}>
                    <Link to="/" className={styles.navLink}>
                        Todo List
                    </Link>
                    <Link to="/calendar" className={styles.navLink}>
                        Calendar
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
