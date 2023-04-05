import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Select from 'react-select';
import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';
import ScrollToTop from 'react-scroll-to-top';

const Movies = () => {
    // Calls API
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

    // React Select
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'Choose a filter...', label: 'Choose a filter...', isDisabled: true },
        { value: 'all', label: 'All movies & series' },
        { value: 'trending', label: 'Trending' },
        { value: 'top_rated', label: 'Top Rated' },
    ];

    // Filter movies by selected option
    const filteredMovies = selectedOption
        ? movies.filter((movie) => {
            if (selectedOption.value === 'trending') {
                return movie.popularity > 0;
            } else if (selectedOption.value === 'top_rated') {
                return movie.vote_average >= 8;
            } else {
                return true;
            }
        })
        : movies;

    return (
        <div className='Movies'>
            <Navigation />
            <h1>Movies</h1>

            <Select
                styles={{
                    control: (provided) => ({
                        ...provided,
                        width: '300px',
                        margin: '0 auto',
                        marginBottom: '3rem',
                        border: 'none',
                        borderRadius: '8px',
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
