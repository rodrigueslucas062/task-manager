import React from 'react';
import Navbar from '../Navbar/Navbar';
import { BackgroundAnimated } from './BackgroundAnimated';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>
                <BackgroundAnimated />
                {children}
            </main>
        </div>
    );
};

export default Layout;