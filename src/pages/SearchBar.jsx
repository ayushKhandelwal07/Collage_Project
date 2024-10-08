import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import { GoogleGenerativeAI } from "@google/generative-ai";
import Appbar from "./Appbar";
import Navbar from "@/component/Navbar";
const genAI = new GoogleGenerativeAI("AIzaSyBCDbrnNZNDStjhSMhW4dqC57ySXlzvZTE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// SearchBar Component
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN'; // Set the language to Hindi
    recognition.lang = 'gu-IN'; // Set the language to Gujarati
    recognition.lang = 'en-US'; // Set the language to English // Taking user preference for language

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSearchTerm(speechResult);
      onSearch(speechResult); // Pass recognized speech to the parent
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    if (searchTerm.trim() === "") return;
    onSearch(searchTerm);
    setSearchTerm(""); // Clear input field
  };

  SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };
  

  return ( // lower search bar logic
    <div className="flex justify-start items-center bg-emerald-800 p-4 m-5 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="flex mr-4 p-1 h-10">
        <input
          className="rounded-full w-60 p-2 focus:outline-none bg-emerald-800 text-slate-100"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
        />
      </div>


      <div className="flex pr-10"> 
        <button
          className="bg-white p-1 rounded-full hover:bg-red-500 hover:text-white"
          onClick={handleVoiceSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 stroke-emerald-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      </div>
      
      <div className="flex pl-20">
        <button
          type="button"
          onClick={handleSearchClick}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-800  font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
          Search
        </button>
      </div>

    </div>
  );
};


// ChatApp Component
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
   //gemini logic
  const handleSearch = async (term) => {
    // User message (appears on the right)
    const userMessage = { text: term, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Get diseases from the medical model API
      const response_data = await axios.post("https://vinkas-en-biobert-model.hf.space/detect_symptoms", {
        text: term
      });
      console.log(response_data.data.detected_symptoms)

      const data = response_data.data;
      const diseases = data.potential_diseases;``
      const probality = diseases.match(/-?\d+(\.\d+)?/g);
    
      console.log(diseases)
      console.log(probality*100)

      // Create prompt for Gemini API
      const prompt = `Disease: ${diseases}\n` +
        `What are the common reasons for ${diseases}?\n` +
        `What are the recommended treatments for ${diseases}?\n` +
        `How dangerous is ${diseases}?\n  give answer of each of these question on new line with  tag Disease : , Reason : ,Cure : , Severity :dont give any unneccery things just four tags with datails`

      // Get detailed information from the Gemini API
      const geminiResponse = await model.generateContent(prompt);
      // console.log(geminiResponse)
      console.log(geminiResponse.response.text()); 
      const geminiData = geminiResponse.response.text().replace(/#/g, "").replace(/\*/g, "");

      // Mock bot message with detailed response (appears on the left)
      const botMessage = {
        text: geminiData, // Replace with actual response data
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error fetching data:", error);
      const botMessage = {
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };


  return (
    <div className="">
      <Appbar />
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-5/6 h-4/5 bg-white-900 shadow-xl rounded-lg p-4">
          <div className="flex flex-col space-y-4 h-96 overflow-y-auto">
            {messages.map((msg, index) => {
              const timestamp = new Date().toLocaleString(); // Get current date and time
              return (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xl p-2 rounded-lg text-black ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-left"
                        : "bg-blue-400 text-right text-black"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs text-blue-900">{timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
