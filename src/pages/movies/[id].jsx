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

            <div className='Movie-content'>
                <div className="Movie-poster">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={400}
                        height={600}
                    />
                </div>

                <div className='Movie-info'>
                    <h1>{movie.title}</h1>
                    <div className="Movie-subinfo">
                        <span>Release date: {movie.release_date}</span>
                        <div>
                            {movie.genres && movie.genres.map((genre, index) => {
                                return (
                                    <li key={index}>
                                        {genre.name}
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default Movie;