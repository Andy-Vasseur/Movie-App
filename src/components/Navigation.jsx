import Link from 'next/link';
import React from 'react';

// Styles
import { BiCameraMovie } from "react-icons/bi";

const Navigation = () => {
    return (
        <div className='Navigation'>
            <div className="Nav-logo">
                <Link href="/">
                    <BiCameraMovie />
                </Link>
            </div>

            <div className="Nav-title">
                <p>The Movie App</p>
            </div>

            <ul className="Nav-links">
                <Link href="/">
                    Home
                </Link>
                <Link href="/movies">
                    Movies
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
            </ul>
        </div>
    );
};

export default Navigation;