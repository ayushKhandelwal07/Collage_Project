import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Appbar from "./Appbar";
import Navbar from "@/component/Navbar";
import { useNavigate } from "react-router-dom";
import Potential_disease from "./Potential_disease";

const genAI = new GoogleGenerativeAI("AIzaSyDKHdp3MU7ontu94mRR0Jxd94QS849PzzU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRecording, setIsRecording] = useState(false); // State to track recording status

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set to default language (you can change as needed)

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSearchTerm(speechResult); // Update search term with recognized speech
      onSearch(speechResult); // Pass recognized speech to the parent
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false); // Stop recording on error
    };

    recognition.onend = () => {
      setIsRecording(false); // Reset recording state when speech recognition ends
    };

    setIsRecording(true); // Start recording
    recognition.start(); // Start speech recognition
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

  return (
    <div className="flex justify-start items-center  bg-emerald-800 p-4 m-5 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2">
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
          className={`p-1 rounded-full ${isRecording ? "bg-red-500" : "bg-white hover:bg-red-500 hover:text-white"}`} // Change button color based on recording status
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

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [symptomDetails, setSymptomDetails] = useState(""); // To store the Gemini response
  const [symptomResponses, setSymptomResponses] = useState({}); // Store responses keyed by symptom
  

  const navigate = useNavigate();
  const potential = () => {
    navigate('/disease');
  }

  const handleSearch = async (term) => {
    // User message
    const userMessage = { text: term, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post("https://vinkas-en-biobert-model.hf.space/detect_symptoms", {
        text: term
      });

      const symptomsArray = response.data.detected_symptoms;
      const potentialDiseases = response.data.potential_diseases;
      localStorage.setItem("potentialDiseases", JSON.stringify(potentialDiseases)); // Save potential diseases to local storage
      console.log(localStorage.getItem("potentialDiseases"));
      
      // Logging detected symptoms
      console.log("Detected Symptoms: ", symptomsArray);

      // Storing detected symptoms
      const detectedSymptoms = [...new Set(symptomsArray)];

      // Example of creating a prompt for Gemini API for each symptom
      const geminiPromises = detectedSymptoms.map(async (symptom) => {
        const prompt = `What are the common reasons for ${symptom}? What are the recommended treatments for ${symptom}? How dangerous is ${symptom}? Please give a brief answer in 3-4 lines`;
        const geminiResponse = await model.generateContent(prompt);
        const geminiData = geminiResponse.response.text().replace(/#/g, "").replace(/\*/g, "");
        return { symptom, details: geminiData };
      });

      // Wait for all Gemini responses
      const responses = await Promise.all(geminiPromises);

      // Collecting responses
      const geminiResponses = {}; // Object to hold responses

      responses.forEach(({ symptom, details }) => {
        geminiResponses[symptom] = details; // Store each response keyed by symptom
      });

      setSymptomResponses(geminiResponses); // Update state

    } catch (error) {
      console.error("Error fetching data:", error);
      // You may want to handle errors accordingly
    }
  };

  return (
    <div className="">
      <Appbar />
      <Navbar />

      <div className="flex items-center justify-center mt-28 max-h-screen p-4">
        <div className="w-full bg-white-900 h-96  overflow-y-auto rounded-lg p-4">
          <style>
          </style>
          <div className="flex flex-col space-y-4 ">
            {messages.map((msg, index) => {
              if (msg.sender === "user") { // Only render user messages
                const timestamp = new Date().toLocaleString(); // Get current date and time
                return (
                  <div
                    key={index}
                    className="flex justify-end" // Align user messages to the right
                  >
                    <div className="max-w-xl p-2 rounded-lg text-black bg-green-600 text-left">
                      <p>{msg.text}</p>
                      <span className="text-xs text-blue-900">{timestamp}</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Render Detected Symptoms as Clickable Buttons Below User Messages */}
          <div className=" grid grid-cols-3 gap-2">
            {Object.keys(symptomResponses).map((symptom, index) => (
              <button
                key={index}
                className="p-2 mt-5 bg-blue-600 text-white rounded hover:translate-y-1 hover:shadow-xl hover:bg-blue-700"
                onClick={() => setSymptomDetails(prevDetails => prevDetails === symptomResponses[symptom] ? "" : symptomResponses[symptom])} // Toggle details on click
              >
                {symptom}
              </button>
            ))}
          </div>

          {/* Display the symptom details when clicked */}
          {symptomDetails && (
            <>
            <div className="mt-4 p-4 border rounded bg-green-50">
              <h3 className="font-bold">Symptom Details:</h3>
              <p className="text-green-800">{symptomDetails}</p>
            </div>
            <button onClick={potential} className="p-2 mt-4 bg-green-500 rounded">
            Click to Find the Information about the potential Disease
        </button>
        </>)}

          <SearchBar onSearch={(term) => {
            handleSearch(term);
            setSymptomResponses({}); // Clear symptom responses on search
            setSymptomDetails(""); // Clear symptom details on search
          }} />
          
        </div>
      </div>

    </div>
  );
};

export default ChatApp;