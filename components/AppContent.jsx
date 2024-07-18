import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { RiMovie2Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

function AppContent({ Component, pageProps }) {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const { theme, toggleTheme } = useTheme();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [year, setYear] = useState();
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    let y = date.getFullYear();
    setYear(y);
  }, []);

  const handleClick = () => {
    if (searchText.trim()) {
      router.push(`/search/${searchText}${category ? `?category=${category}` : ''}`);
    }
  }

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
    setIsSelectOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-[#121212] dark:text-gray-100">
      <nav className="bg-white dark:bg-[#121212] shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <Link href="/">
            <span className='flex gap-x-1 items-center text-[#F5C518] text-2xl font-bold mb-4 md:mb-0 cursor-pointer'>
              <RiMovie2Line />
              MovieMood
            </span>
          </Link>
          <div className='w-full md:w-1/2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2'>
            <div className='w-full flex bg-gray-100 dark:bg-white text-black rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#F5C518]'>
              <div className='relative'>
                <select 
                  value={category} 
                  onChange={handleSelectChange}
                  onFocus={() => setIsSelectOpen(true)}
                  onBlur={() => setIsSelectOpen(false)}
                  className='h-10 text-left w-full md:w-auto bg-transparent focus:outline-none px-2 appearance-none bg-gray-100 pr-8'
                >
                  <option value="" className='bg-gray-100'>All</option>
                  <option value="movie" className='bg-gray-100'>Movie</option>
                  <option value="series" className='bg-gray-100'>Series</option>
                  <option value="episode" className='bg-gray-100'>Episode</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  {isSelectOpen ? <FaCaretUp/> : <FaCaretDown/>}
                </div>
              </div>
              <input 
                className='h-10 w-2/3 md:flex-grow bg-transparent focus:outline-none px-2' 
                type="text" 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
              />
              <button className='h-10 px-4 font-bold text-xl bg-[#F5C518] text-white' onClick={handleClick}>
                <IoIosSearch/>
              </button>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 text-gray-[#121212] dark:bg-[#363636] dark:text-gray-100 mt-4 md:mt-0"
          >
            {theme === 'light' ? <MdDarkMode size={24}/> : <MdLightMode size={24}/>}
          </button>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Component {...pageProps} searchText={searchText} category={category} />
      </main>
      <footer className="bg-white dark:bg-[#121212] text-center p-4">
        © {year} MovieMood. All rights reserved.
      </footer>
    </div>
  );
}

export default AppContent;