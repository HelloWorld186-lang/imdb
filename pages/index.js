import { useState, useEffect } from 'react';
import Image from 'next/image';

import inception from '../public/inception.jpg';
import godfather from '../public/godfather.jpg';
import interstellar from '../public/insteller.jpg';
import pulpfiction from '../public/pulpfiction.jpg';
import darkknight from '../public/darkknight.jpg';

import BradPitt from '../public/BradPitt.jpg'
import DenzelWashington from '../public/DenzelWashington.jpg'
import LeonardoDiCaprio from '../public/LeonardoDiCaprio.jpg'
import TomHanks from '../public/TomHanks.jpg'

import CateBlanchett from '../public/CateBlanchett.jpg'
import MerylStreep from  '../public/MerylStreep.jpg'
import ScarlettJohansson from '../public/ScarlettJohansson.jpg'
import ViolaDavis from '../public/ViolaDavis.jpg'

const movies = [
  { id: 1, title: 'Inception', poster: inception, year: 2010, rating: 8.8 },
  { id: 2, title: 'The Dark Knight', poster: darkknight, year: 2008, rating: 9.0 },
  { id: 3, title: 'Interstellar', poster: interstellar, year: 2014, rating: 8.6 },
  { id: 4, title: 'Pulp Fiction', poster: pulpfiction, year: 1994, rating: 8.9 },
  { id: 5, title: 'The Godfather', poster: godfather, year: 1972, rating: 9.2 },
];

const categories = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation',
  'Adventure', 'Fantasy', 'Crime', 'Mystery', 'Documentary', 'Biography', 'History',
  'Hollywood', 'Bollywood', 'Tollywood', 'Anime', 'Chinese Cinema', 'Mollywood', 'Kollywood'
];

const popularActors = [
  { id: 1, name: 'Tom Hanks', photo: TomHanks },
  { id: 2, name: 'Leonardo DiCaprio', photo: LeonardoDiCaprio },
  { id: 3, name: 'Denzel Washington', photo: DenzelWashington},
  { id: 4, name: 'Brad Pitt', photo: BradPitt},
];

const popularActresses = [
  { id: 1, name: 'Meryl Streep', photo: MerylStreep },
  { id: 2, name: 'Viola Davis', photo: ViolaDavis},
  { id: 3, name: 'Scarlett Johansson', photo: ScarlettJohansson },
  { id: 4, name: 'Cate Blanchett', photo: CateBlanchett},
];

export default function Home() {
  const [currentPoster, setCurrentPoster] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % movies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen dark:bg-black dark:text-white bg-gray-100 text-[#121212]">
      <main className="container mx-auto px-4 py-8">
        <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] mb-12">
          <div className="relative w-full h-full">
            <Image
              src={movies[currentPoster].poster}
              alt={movies[currentPoster].title}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{movies[currentPoster].title}</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400">{movies[currentPoster].year}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-l-4 border-[#F5C518] px-1">What to Watch</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category}
                className="p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base
                           dark:bg-[#121212] dark:hover:bg-[#363636] bg-white hover:bg-gray-100
                           transition duration-300"
              >
                {category}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-l-4 border-[#F5C518] px-1">Most Popular Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="rounded-lg overflow-hidden shadow-lg dark:bg-[#121212] bg-white transition duration-300 hover:scale-105"
              >
                <div className="relative h-64 sm:h-80">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-sm sm:text-base text-[#363636] dark:text-[#363636]">
                    {movie.year} • IMDb {movie.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-l-4 border-[#F5C518] px-1">Most Popular Actors</h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {popularActors.map((actor) => (
              <div key={actor.id} className="text-center transition duration-300 hover:scale-105">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-2">
                  <Image
                    src={actor.photo}
                    alt={actor.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <p className="font-medium text-sm sm:text-base">{actor.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-l-4 border-[#F5C518] px-1">Most Popular Actresses</h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {popularActresses.map((actress) => (
              <div key={actress.id} className="text-center transition duration-300 hover:scale-105">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-2">
                  <Image
                    src={actress.photo}
                    alt={actress.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <p className="font-medium text-sm sm:text-base">{actress.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}