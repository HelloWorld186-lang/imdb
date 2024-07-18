import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { RiMovie2Line } from "react-icons/ri";

const Search = ({ initialMovies, totalResults, error }) => {
  const router = useRouter();
  const { movie: searchText, category } = router.query;
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=21b3507b&s=${searchText}${category ? `&type=${category}` : ''}&page=${page}`);
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    if (searchText) {
      fetchMovies();
    }
  }, [searchText, category, page]);

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < Math.ceil(totalResults / 10)) {
      setPage(page + 1);
    }
  };

  if (error) {
    return <div className="min-h-screen w-full text-center pt-16 text-2xl font-bold text-[#121212] dark:text-[#363636]">{error}</div>;
  }

  return (
    <div className="space-y-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Search Results for &apos;{searchText}&apos;</h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map(movie => (
            <Link key={movie.imdbID} href={`/movie/${movie.imdbID}`} passHref>
            <div className="bg-white dark:bg-[#121212] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer h-[550px] flex flex-col">
              <div className="h-[450px] relative">
                {movie.Poster == 'N/A' ? <RiMovie2Line className="w-full h-full text-center text-[#F5C518]"/> : <Image 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} 
                  alt={movie.Title}
                  layout="fill"
                  objectFit="cover"
                />}
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-2 truncate text-[#121212] dark:text-white">{movie.Title}</h2>
                <div>
                  <p className="text-[#363636] dark:text-gray-400">{movie.Year}</p>
                  <p className="text-[#363636] dark:text-gray-400 capitalize">{movie.Type}</p>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No results found.</div>
      )}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={handlePreviousClick} 
          disabled={page === 1}
          className="bg-[#F5C518] text-white px-4 py-2 rounded disabled:bg-gray-200 disabled:dark:bg-[#363636] transition-colors duration-300"
        >
          <GrFormPreviousLink className="inline mr-2" /> Previous
        </button>
        <button 
          onClick={handleNextClick}
          disabled={page >= Math.ceil(totalResults / 10)}
          className="bg-[#F5C518] text-white px-4 py-2 rounded disabled:bg-gray-200 disabled:dark:bg-[#363636] transition-colors duration-300"
        >
          Next <GrFormNextLink className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { movie: searchText, category } = context.query;
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=21b3507b&s=${searchText}${category ? `&type=${category}` : ''}&page=1`);
    const data = await response.json();
    if (data.Response === "True") {
      return {
        props: {
          initialMovies: data.Search || [],
          totalResults: parseInt(data.totalResults) || 0
        }
      };
    } else {
      return {
        props: {
          initialMovies: [],
          totalResults: 0,
          error: data.Error
        }
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialMovies: [],
        totalResults: 0,
        error: "An error occurred while fetching data."
      }
    };
  }
}

export default Search;