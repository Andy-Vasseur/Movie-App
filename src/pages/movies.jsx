import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Select from 'react-select';
import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';
import ScrollToTop from 'react-scroll-to-top';

const Movies = () => {
    // Calls API to get movies
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios
            .get(
                'https://api.themoviedb.org/3/discover/movie?api_key=1455fc9a99d80cb88d2712a9f4ff900f&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
            )
            .then((res) => {
                setMovies(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Calls API to get genres
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=1455fc9a99d80cb88d2712a9f4ff900f&language=en-US')
            .then((res) => {
                setGenres(res.data.genres);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // React Select
    const [selectedOption, setSelectedOption] = useState(null);
    const options = genres.map((genre) => ({
        value: genre.id,
        label: genre.name,
    }));

    const filteredMovies = movies.filter((movie) => {
        if (selectedOption === null) return true;
        return movie.genre_ids.includes(selectedOption.value);
    });

    return (
        <div className='Movies'>
            <Navigation />
            <h1>Movies</h1>

            <Select
                styles={{
                    control: (provided) => ({
                        ...provided,
                        margin: '0 auto',
                        marginBottom: '3rem',
                        width: '300px',
                        border: 'none',
                        borderRadius: '8px',
                    }),
                    option: (provided) => ({
                        ...provided,
                        margin: '0 auto',
                        width: '300px',
                        color: 'black',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }),
                }}
                placeholder='Choose a filter...'
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />

            <ul className='Movies-trending'>
                {filteredMovies.map((movie) => (
                    <Link href={`/movies/${movie.id}`} className='Movie-card' key={movie.id}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.id}
                            width={300}
                            height={450}
                        />
                    </Link>
                ))}
            </ul>
            <ScrollToTop
                smooth
                top={400}
                width='28px'
                height='28px'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '40%',
                    width: '50px',
                    height: '50px',
                }}
                className='icon-hover'
            />
        </div>
    );
};

export default Movies;
