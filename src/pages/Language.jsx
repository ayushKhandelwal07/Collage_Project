import  { useState } from 'react';
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function UserPreferredLanguage() {
  const navigate = useNavigate();

  const LanguageRedirect = () => {
    navigate('/auth/signup')
  }

  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Function to handle language selection and show toast
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    if(language === 'English') toast.success(`${language} selected successfully`);
    if(language === 'हिन्दी') toast.success(`${language} सफलतापूर्वक चयनित`);
    if(language === 'ગુજરાતી') toast.success(`${language} સફળતાપૂર્વક પસંદ કરેલ`);
  };

  return (
    <div className='max-h-screen'>

      <div className='flex justify-center content-center mt-32 text-4xl font-bold text-emerald-500'>
      Choose Your Preferred Communication Language
      </div>
    
      <div className="flex justify-center bg-slate-50">
        {/* Toaster component to show notifications */}
        <Toaster />
        <div className="bg-white p-8 rounded-lg mt-36 shadow-lg h-1/5 w-1/3">
          {/* <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Choose Your Preferred Communication Language</h1> */}
          
          <div className='flex justify-between ml-5 mr-5 mt-8'>
            <button  onClick={() => handleLanguageSelect('English')} className=' bg-blue-500 px-4 text-white rounded transform transition hover:scale-110 hover:bg-green-500'>
              English
            </button>
            <button onClick={() => handleLanguageSelect('हिन्दी')} className='bg-blue-500 px-4 text-white rounded transform transition hover:scale-110 hover:bg-green-500'>
              हिन्दी
            </button>
            <button onClick={() => handleLanguageSelect('ગુજરાતી')} className='bg-blue-500 p-2 text-white rounded transform transition hover:scale-110 hover:bg-green-500'>
              ગુજરાતી
            </button>
          </div>  
        </div>
      </div>

      <div>
      
      <div className='flex justify-center mt-20'>
                  <button onClick={LanguageRedirect} className='bg-emerald-700 border-green-700 text-white w-lg text-xl rounded-lg p-3 border-none font-semibold w-1/6 transform transition hover:scale-105 hover:shadow-2xl'>Next page</button>
            </div>
      </div>

    </div>
  );
}

export default UserPreferredLanguage;
