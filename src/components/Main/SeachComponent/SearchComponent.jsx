"use client"
import { Input, Spinner } from '@nextui-org/react';
import { BarChart3, CircleX, PackageSearch, Search, TimerIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { searchContext } from "@/src/components/useContextProvider/ContextProvider";


const SearchComponent = () => {
  const router = useRouter(); // برای تغییر URL
  const pathname = usePathname();


  const { searchTextContext, setSearchTextContext } = useContext(searchContext);



  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [abortController, setAbortController] = useState(null);


  useEffect(() => {
    // اگر درخواست قبلی وجود داشت، آن را لغو کن
    if (abortController) {
      abortController.abort();
    }

    const controller = new AbortController();
    setAbortController(controller); // ذخیره کردن AbortController جدید

    const fetchData = async () => {
      if (search && !pathname.includes("/search")) {
        setLoading(true); // شروع بارگذاری
        try {
          const response = await fetch(`/api/search?q=${search}&navbar="true`, {
            signal: controller.signal, // ارسال سیگنال برای لغو درخواست
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResults(data);
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Fetch error:', error);
          }
        } finally {
          setLoading(false); // پایان بارگذاری
        }
      } else {
        setResults([]); // اگر جستجو خالی است، نتایج را پاک کن
      }
    };

    // استفاده از setTimeout برای ایجاد تأخیر در درخواست
    const timerId = setTimeout(() => {
      fetchData();
    }, 300); // 300 میلی ثانیه

    // پاکسازی اثر
    return () => {
      clearTimeout(timerId); // پاک کردن تایمر
      controller.abort(); // لغو درخواست
    };
  }, [search]); // وابستگی به جستجو

  const [history, setHistory] = useState([]);

  const requestSearch = () => {
    if (!history.includes(search)) {
      const newHistory = [...history, search];
      setHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    }
    if (pathname.includes("/search")) {

    } else {
      router.push(`/search?q=${search}`)
    }
  }

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Save search to history and localStorage when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault(); // جلوگیری از رویداد پیش‌فرض
      // Check if the search term already exists in the history
      requestSearch()
      clearSearch(); // Optional: Clear input after adding to history
    }
  };

  // Function to remove an item from history
  const removeFromHistory = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const clearSearch = () => {
    setSearch("")
    setSearchTextContext("")
  }
  return (
    <div className='relative'>
      {/* بخش اصلی جستجو */}
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setSearchTextContext(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        className={`inputNextUi paddingControl z-10 caret-black !rounded-sm ${(search && !pathname.includes("/search")) ? "SearchLabel" : ""}`}
        placeholder='جست و جو ...'
        startContent={
          <Search className='mr-2 cursor-pointer' color='var(--color-2)' onClick={requestSearch} />
        }
        endContent={
          <>
            {search && <CircleX onClick={() => {
              setSearch('')
              setSearchTextContext("")

            }} className='ml-2 cursor-pointer text-red-400' />}
          </>
        }
      />

      {search && !pathname.includes("/search") && <div className='absolute bg-white w-96 h-min pb-8 rounded-bl-md rounded-br-md boxShadow3 z-[1]' >

        {!pathname.includes("/search") && history.length > 0 && (
          <div className="rounded p-3">
            <div className="flex justify-between mb-2">
              <div className='flex gap-2 items-center'>
                <TimerIcon size={18} className='text-gray-700' />
                <h3 className='text-gray-700 text-sm vazirMedium'> سرچ اخیر</h3>
              </div>
              {/* <button onClick={clearHistory} className="text-red-500">Clear</button> */}
            </div>

            <div className='flex gap-2 recentSearch overflow-x-auto mx-2'>
              {history.map((item, index) => {
                return (
                  <div className='flex gap-2 border rounded-full w-min items-center py-1 px-3' key={`recent-${index}`}>
                    <Link onClick={clearSearch} href={`/search?q=${item}`} className=" text-gray-600 text-sm cursor-pointer">{item}</Link>
                    <X className='text-gray-600 cursor-pointer' size={14} onClick={() => removeFromHistory(index)} />
                  </div>

                )
              }
              )}
            </div>

          </div>
        )}

        {loading && <div className="w-full mt-6 flex justify-center items-center">
          <Spinner />
        </div>} {/* نمایش بارگذاری */}

        {results && results?.category && results?.category.length > 0 && !loading &&
          <>
            <div className="flex justify-between p-3">
              <div className='flex gap-2 items-center'>
                <BarChart3 size={18} className='text-gray-700' />
                <h3 className='text-gray-700 text-sm vazirMedium'>  دسته بندی</h3>
              </div>
            </div>

            <div className='px-3 py-0'>
              {results?.category.map((e, i) => {
                return (
                  <div className='border-t border-gray-200 ' key={`search-${i}`}>

                    <Link onClick={clearSearch} className='hover:!bg-gray-300 transition-all duration-300 rounded-md h-min w-full flex' href={`/product/${e.route}`}>
                      <div className='flex items-center gap-2 my-2'>
                        <Search className='mr-2' color='var(--color-2)' />
                        <div>
                          <p className='text-gray-800 text-md'>
                            {e.title}
                          </p>
                          <p className='text-gray-500 text-sm'>
                            {e.description}
                          </p>
                        </div>
                      </div>

                    </Link>

                  </div>
                )
              }
              )}

            </div>

          </>
        }
        {results && results?.product && results?.product.length > 0 && !loading &&
          <>
            <div className="flex justify-between p-3">
              <div className='flex gap-2 items-center'>
                <PackageSearch size={18} className='text-gray-700' />
                <h3 className='text-gray-700 text-sm vazirMedium'>  محصولات </h3>
              </div>
            </div>

            <div className='px-3 py-0'>
              {results?.product.map((e, i) => {
                return (
                  <div className='border-t border-gray-200 rounded-md' key={`searchProduct-${i}`}>
                    <Link onClick={clearSearch} className='hover:!bg-gray-300 transition-all duration-300 rounded-md h-min w-full flex' href={`/product/${e.routeCategory}/${e.id_Product}`}>
                      <div className='flex items-center gap-2 my-2'>
                        <Search className='mr-2' color='var(--color-2)' />
                        <div>
                          <p className='text-gray-800 text-md'>
                            {e.title}
                          </p>
                          <p className='text-gray-500 text-sm'>
                            {e.subtitle}
                          </p>
                        </div>
                      </div>

                    </Link>
                  </div>
                )
              }
              )}
            </div>
          </>
        }
        {results && results?.product && results?.category && !results?.product.length > 0 && !results?.category.length > 0 && !loading &&
          <div className="w-full mt-6 flex justify-center items-center">
            <p className='vazirMedium text-sm text-gray-700'>چیزی جهت نمایش وجود ندارد</p>
          </div>
        }

      </div>}


    </div>
  );
};

export default SearchComponent;
