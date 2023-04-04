import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

const Movie = () => {

    const router = useRouter();
    const { id } = router.query;

    const [movie, setMovie] = React.useState({});

    React.useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1455fc9a99d80cb88d2712a9f4ff900f&language=en-US`)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='Movie'>
            <Navigation />
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>

            <div className="Movie-poster">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                />
            </div>
        </div>
    );
};

export default Movie;