import Navigation from '@/components/Navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Movies = () => {

    const [trending, setTrending] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=1455fc9a99d80cb88d2712a9f4ff900f')
            .then((res) => {
                setTrending(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='Movies'>
            <Navigation />
            <h1>Movies</h1>

            <ul className="Movies-trending">
                {trending.map((movie) => (
                    <Link href={`/movies/${movie.id}`} className='Movie-card' key={movie.id}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={450}
                        />
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Movies;