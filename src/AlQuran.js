import React, { useState } from 'react';
import axios from 'axios';

const AlQuran = () => {
  const [chapterNumber, setChapterNumber] = useState('');
  const [verseNumber, setVerseNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [results, setResults] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChapterChange = (e) => {
    setChapterNumber(e.target.value);
  };

  const handleVerseChange = (e) => {
    setVerseNumber(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleChapterVerseSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://al-quran1.p.rapidapi.com/${chapterNumber}/${verseNumber}`,
        {
          headers: {
            'X-RapidAPI-Key': '04e4c10569msh836a6fa9330b8ecp16f7a8jsn1102a82e7fac',
            'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com',
          },
        }
      );
      setResults(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://al-quran1.p.rapidapi.com/corpus/${searchName}`,
        {
          headers: {
            'X-RapidAPI-Key': '04e4c10569msh836a6fa9330b8ecp16f7a8jsn1102a82e7fac',
            'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com',
          },
        }
      );
      setResultSearch(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <nav className="bg-white p-4">
        <h1 className="text-3xl font-semibold text-center">Al-Quran App</h1>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={searchName}
            onChange={handleSearchNameChange}
            placeholder="Enter Name"
            className="mr-2 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>
      </nav>
      <div className="mx-auto py-8 md:px-4">
        <div className="flex md:flex-row flex-col gap-3 md:gap-1 items-center mb-4">
          <input
            type="number"
            value={chapterNumber}
            onChange={handleChapterChange}
            placeholder="Chapter Number"
            className="mr-2 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={verseNumber}
            onChange={handleVerseChange}
            placeholder="Verse Number"
            className="mr-2 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleChapterVerseSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>
        {isLoading ? (
          <div className="p-1 text-center text-lg font-semibold">Loading...</div>
        ) : (
          <>
            {results && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                  Surah Name: {results?.surah_name}
                </h2>
                <h2 className="text-xl font-semibold mb-2">
                  Surah Name (Arabic): {results?.surah_name_ar}
                </h2>
                <p className="mb-2">Surah Meaning: {results?.translation}</p>
                <p className="mb-2">Total Verses: {results?.total_verses}</p>
                <div className="mb-2">
                  <p>Surah Description: {results?.description}</p>
                </div>
                <div>
                  {Object.values(results?.verses ?? {}).map((item, index) => (
                    <div key={index} className="mb-2">
                      <p className="mb-1 text-xl">
                        Verse {index + 1}: {item?.content}
                      </p>
                      <p className="text-gray-500">{item?.translation_eng}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!resultSearch ? null : (
              <div>
                {resultSearch.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      Surah Number: {item.surah_no}
                    </h2>
                    <p className="mb-1">Content: {item.content}</p>
                    <p className="mb-1">Verse Number: {item.verse_no}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlQuran;


// import React, { useState } from 'react';
// import { useQuery} from 'react-query';
// import axios from 'axios';

// const AlQuran = () => {
//   const [chapterNumber, setChapterNumber] = useState('');
//   const [verseNumber, setVerseNumber] = useState('');
//   const [searchName, setSearchName] = useState('');

//   const handleChapterChange = (e) => {
//     setChapterNumber(e.target.value);
//   };

//   const handleVerseChange = (e) => {
//     setVerseNumber(e.target.value);
//   };

//   const handleSearchNameChange = (e) => {
//     setSearchName(e.target.value);
//   };

//   const handleChapterVerseSearch = () => {
//     // Call the API using the useQuery hook
//   };

//   const handleSearch = () => {
//     // Call the API using the useQuery hook
//   };


//   const { data: results, isLoading: isResultsLoading } = useQuery(
//     ['chapterVerseSearch', chapterNumber, verseNumber],
//     async () => {
//       const response = await axios.get(
//         `https://al-quran1.p.rapidapi.com/${chapterNumber}/${verseNumber}`,
//         {
//           headers: {
//             'X-RapidAPI-Key': '04e4c10569msh836a6fa9330b8ecp16f7a8jsn1102a82e7fac',
//             'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com',
//           },
//         }
//       );
//       return response.data;
//     }
//   );

//   const { data: resultSearch, isLoading: isResultSearchLoading } = useQuery(
//     ['search', searchName],
//     async () => {
//       const response = await axios.get(
//         `https://al-quran1.p.rapidapi.com/corpus/${searchName}`,
//         {
//           headers: {
//             'X-RapidAPI-Key': '04e4c10569msh836a6fa9330b8ecp16f7a8jsn1102a82e7fac',
//             'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com',
//           },
//         }
//       );
//       return response.data;
//     }
//   );

//   return (
//     <div className="bg-blue-100 min-h-screen">
//       <nav className="bg-white p-4">
//         <h1 className="text-3xl font-semibold text-center">Al-Quran App</h1>
//         <div className="flex items-center mt-4">
//           <input
//             type="text"
//             value={searchName}
//             onChange={handleSearchNameChange}
//             placeholder="Enter Name"
//             className="mr-2 p-2 border border-gray-300 rounded-lg"
//           />
//           <button
//             onClick={handleSearch}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Search
//           </button>
//         </div>
//       </nav>
//       <div className="mx-auto py-8 md:px-4">
//         <div className="flex md:flex-row flex-col gap-3 md:gap-1 items-center mb-4">
//           <input
//             type="number"
//             value={chapterNumber}
//             onChange={handleChapterChange}
//             placeholder="Chapter Number"
//             className="mr-2 p-2 border border-gray-300 rounded-lg"
//           />
//           <input
//             type="number"
//             value={verseNumber}
//             onChange={handleVerseChange}
//             placeholder="Verse Number"
//             className="mr-2 p-2 border border-gray-300 rounded-lg"
//           />
//           <button
//             onClick={handleChapterVerseSearch}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Search
//           </button>
//         </div>
//         {isResultsLoading ? (
//           <div className="p-1 text-center text-lg font-semibold">Loading...</div>
//         ) : (
//           <>
//             {results && (
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-2">
//                   Surah Name: {results?.surah_name}
//                 </h2>
//                 <h2 className="text-xl font-semibold mb-2">
//                   Surah Name (Arabic): {results?.surah_name_ar}
//                 </h2>
//                 <p className="mb-2">Surah Meaning: {results?.translation}</p>
//                 <p className="mb-2">Total Verses: {results?.total_verses}</p>
//                 <div className="mb-2">
//                   <p>Surah Description: {results?.description}</p>
//                 </div>
//                 <div>
//                   {Object.values(results?.verses ?? {}).map((item, index) => (
//                     <div key={index} className="mb-2">
//                       <p className="mb-1 text-xl">
//                         Verse {index + 1}: {item?.content}
//                       </p>
//                       <p className="text-gray-500">{item?.translation_eng}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {isResultSearchLoading ? (
//               <div className="p-1 text-center text-lg font-semibold">Loading...</div>
//             ) : (
//               <>
//                 {resultSearch && (
//                   <div>
//                     {resultSearch.map((item, index) => (
//                       <div key={index} className="mb-4">
//                         <h2 className="text-xl font-semibold mb-2">
//                           Surah Number: {item.surah_no}
//                         </h2>
//                         <p className="mb-1">Content: {item.content}</p>
//                         <p className="mb-1">Verse Number: {item.verse_no}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlQuran