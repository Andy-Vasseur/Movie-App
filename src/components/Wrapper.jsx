import Link from 'next/link';
import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

const Wrapper = () => {
    return (
        <div className='Wrapper'>
            <h1>The Movie App</h1>
            <ReactTypingEffect
                text="A new movie application, using NextJS & TheMovieDB"
                speed="60"
                eraseSpeed="20"
                eraseDelay="8000"
                typingDelay="800"
                cursorRenderer={cursor => <p>{cursor}</p>}
                displayTextRenderer={(text, i) => {
                    return (
                        <p>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                    <span
                                        key={key}
                                        style={i % 2 === 0 ? { color: 'white' } : {}}
                                    >{char}</span>
                                );
                            })}
                        </p>
                    );
                }}
            />
            {/* <p>A new movie application, using NextJS & TheMovieDB</p> */}
            <Link href="/movies">
                Go to Movies
            </Link>
        </div>
    );
};

export default Wrapper;