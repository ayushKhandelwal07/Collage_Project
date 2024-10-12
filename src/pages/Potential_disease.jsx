import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_HIGH_ONLY,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_HIGH_ONLY,
  },
 { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH},

  {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,}
];



const genAI = new GoogleGenerativeAI("AIzaSyAl73CKsaZeZqeFbUEXiu93i9P4CKy_g-0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });

function Chat() {
  const [diseases, setDiseases] = useState({});
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState('');  // To store API data for selected disease
  const [commonCause, setCommonCause] = useState('');    // To store common causes
  const [cure, setCure] = useState('');                  // To store cure
  const [severity, setSeverity] = useState('');          // To store severity

  // Fetch diseases from localStorage
  useEffect(() => {
    const storedDiseases = JSON.parse(localStorage.getItem("potentialDiseases"));
    if (storedDiseases) {
      setDiseases(storedDiseases);
      localStorage.clear();
    }
  }, []);

  // Fetch data from Gemini API based on selected disease
  const fetchDiseaseData = async (disease) => {
    try {
      const prompt = `Disease: ${disease}\n description of disease like what is it ` +
      `What are the common reasons for ${disease}?\n` +
      `What are the recommended treatments for ${disease}?\n` +
      `How dangerous is ${disease}?\n give answer of each of these question on new line with  tag Disease: , Reason: , Cure: , Severity:. Don't give unnecessary things, just four tags with details in text without ',' or any ':' sign between answer of 6-8 lines each.`;
      
      const response = await model.generateContent(prompt);
      const responseData = response.response.text().replace(/#/g, "").replace(/\*/g, "");
      console.log("Gemini API response: ", responseData);

      // Assuming the response is structured as expected
      const parsedResponse = {};
      responseData.split('\n').forEach((line) => {
        const [key, value] = line.split(': ');
        if (key && value) {
          parsedResponse[key.trim()] = value.trim();
        }
      });

      // Set the parsed response to state
      setDiseaseInfo(parsedResponse['Disease']);
      setCommonCause(parsedResponse['Reason']);
      setCure(parsedResponse['Cure']);
      setSeverity(parsedResponse['Severity']);

    } catch (error) {
      console.error("Error fetching disease data: ", error);
    }
  };

  // Handle disease selection
  const handleDiseaseClick = (disease) => {
    setSelectedDisease(disease);
    fetchDiseaseData(disease);  // Fetch Gemini API data for selected disease
  };

  return (
    <div className="p-6">
      <h2 className="flextext-black text-3xl pl-14 font-bold mb-4">Potential Diseases :</h2>
      
      {/* Buttons for each disease */}
      {Object.entries(diseases).length > 0 ? (
        <div className="flex px-14  gap-32">
          {Object.entries(diseases).map(([disease, probability]) => (
            <button
              key={disease}
              onClick={() => handleDiseaseClick(disease)}
              className=" w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-800 transform transition hover:scale-105">
              {disease}: {parseFloat(probability)*100}%
            </button>
          ))}
        </div>
      ) : (
        <p>No potential diseases detected.</p>
      )}

      {/* Display detailed disease info */}
      {selectedDisease && (
        <div className="mt-6 px-48 py-5 shadow-xl">  {/*main middle div */}
          <h3 className="text-4xl mb-8 text-emerald-800 font-bold">{selectedDisease}</h3>

          <div className="bg-[#e0f2e9] border-l-4 border-[#2a6049] text-[#2a6049] p-4 mb-8" role="alert"><p className="font-bold">Important Note:</p><p>This information is for educational purposes only and not a substitute for professional medical advice. If pain persists or worsens, please seek medical help.</p></div>
          {/* Layout for larger screens: two parts */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4"> */}
          <div className="flex gap-4 mt-4">

            {/* Left part: Disease description */}
            <div>
              <h4 className="text-2xl text-emerald-800 font-semibold">What is {selectedDisease}?</h4>
              <p className="text-lg mt-2 text-emerald-700">
                {diseaseInfo ? diseaseInfo : "Loading description..."}
              </p>
            </div>

            {/* Right part: Big disease name */}
            {/* <div className="flex items-center justify-center">
              <h4 className="text-4xl font-bold">{selectedDisease}</h4>
            </div> */}
          </div>

          {/* Below the two-part layout, common cause */}
          <div className="mt-6">
            <h4 className="text-2xl text-emerald-800 font-semibold">Common Causes of {selectedDisease}</h4>
            <p className="text-lg mt-2 text-emerald-700">
              {commonCause ? commonCause : "Loading common causes..."}
            </p>
          </div>

          {/* Cure */}
          <div className="mt-6">
            <h4 className="text-2xl text-emerald-800 font-semibold">Cure for {selectedDisease}</h4>
            <p className="text-lg  text-emerald-700 mt-2">
              {cure ? cure : "Loading cure..."}
            </p>
          </div>

          {/* Severity */}
          <div className="mt-6">
            <h4 className="text-2xl  text-emerald-800 font-semibold">Severity of {selectedDisease}</h4>
            <p className="text-lg text-emerald-700 mt-2">
              {severity ? severity : "Loading severity..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
