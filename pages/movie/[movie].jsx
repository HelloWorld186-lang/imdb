import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { FaStar, FaImdb } from 'react-icons/fa';
import { RiMovie2Line } from "react-icons/ri";

const Movie = ({ data, error }) => {
  const [movieDetails, setMovieDetails] = useState(data);
  const router = useRouter();

  useEffect(() => {
    setMovieDetails(data);
  }, [data]);

  if (router.isFallback) {
    return <div className="min-h-screen w-full text-center pt-16 text-2xl font-bold text-[#121212] dark:text-[#363636]">Loading</div>;
  }

  if (error) {
    return <div className="min-h-screen w-full text-center pt-16 text-2xl font-bold text-[#121212] dark:text-[#363636]">{error}</div>;
  }

  if (!movieDetails) {
    return <div className="min-h-screen w-full text-center pt-16 text-2xl font-bold text-[#121212] dark:text-[#363636]">No movie details available.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-screen">
      <div className="md:w-1/3">
        {movieDetails.Poster == 'N/A' ? <RiMovie2Line className="w-full h-full text-center text-[#F5C518]"/> : <Image 
          src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/placeholder.png'}
          alt={movieDetails.Title}
          width={300}
          height={445}
          layout="responsive"
          className="rounded-lg shadow-lg"
        />}
      </div>
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold mb-2">{movieDetails.Title}</h1>
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{movieDetails.imdbRating}</span>
          <FaImdb className="text-yellow-400 ml-4 mr-1" size={20} />
          <span>{movieDetails.imdbVotes} votes</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{movieDetails.Year} • {movieDetails.Rated} • {movieDetails.Runtime}</p>
        <div className="mb-4">
          {movieDetails.Genre.split(', ').map((genre, index) => (
            <span key={index} className="inline-block bg-gray-200 dark:bg-[#121212] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{genre}</span>
          ))}
        </div>
        <p className="mb-4">{movieDetails.Plot}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Director</h2>
            <p>{movieDetails.Director}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Writer</h2>
            <p>{movieDetails.Writer}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Actors</h2>
            <p>{movieDetails.Actors}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Language</h2>
            <p>{movieDetails.Language}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Country</h2>
            <p>{movieDetails.Country}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Awards</h2>
            <p>{movieDetails.Awards}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const { movie } = context.params;
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=21b3507b&i=${movie}`);
    const data = await response.json();
    if (data.Response === "True") {
      return {
        props: {
          data: data,
        }
      };
    } else {
      return {
        props: {
          data: null,
          error: data.Error
        }
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
        error: "An error occurred while fetching movie details."
      }
    };
  }
}