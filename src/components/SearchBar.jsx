import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN'; // Set the language to Hindi
    recognition.lang = 'gu-IN'; // Set the language to Gujarati
    recognition.lang = 'en-US'; // Set the language to English // Taking user preference for language

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSearchTerm(speechResult);
      console.log('Recognized speech:', speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };

    const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  return (<>

    <div className='flex justify-start items-center bg-emerald-800 p-4 m-5 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2'> 
      <div className='flex mr-4 p-1 h-10'>
        <input className='rounded-full w-60 p-2 fill border-emerald-800 bg-emerald-800 '
          type="text"
          value={searchTerm}  
          onChange={handleInputChange}
          placeholder=" Enter your prompt..."
        />
      </div>

      <div className='flex'>
        <button className='bg-white p-1 rounded-full bg-emerald-800 hover:bg-red-500 hover:text-white' onClick={handleVoiceSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-emerals-800"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
        </button>
      </div>

      <div className='flex pl-20'> 
        <button onClick type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
      </div>

    </div>
 
  
  </>
  );
};

export default SearchBar;