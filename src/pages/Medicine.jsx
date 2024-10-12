import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Appbar from './Appbar';
import Navbar from '@/component/Navbar';

export default function Medicine() {
  const [medicineName, setMedicineName] = useState('');  
  const [contain, setContain] = useState('');  
  const [side_effect, setSide_effect] = useState('');  
  const [remember, setRemember] = useState('');  
  // name : responseData['name'],
  //           contain : responseData['components:'],
  //           side_effect : responseData['side_effect:'],
  //           to_remember : responseData['remember:']
  const [selectedFile, setSelectedFile] = useState(null);  
  const [loading, setLoading] = useState(false);  

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle image upload and AI text extraction
  const handleSearch = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    try {
      setLoading(true);

      // Create form data to send file to backend
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Send POST request to the internal API route
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log( "result of requesr" ,result)

      setMedicineName(result.name || 'N/A');
      setContain(result.contain || 'N/A');
      setSide_effect(result.side_effect || 'N/A');
      setRemember(result.to_remember || 'N/A');

    } catch (error) {
      console.error('Error extracting medicine data: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Appbar />
      <Navbar />
      <div className="flex justify-center items-center bg-emerald-800 p-4 m-5 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="flex mb-2 p-1 h-10 w-full">
          <Input 
            className='focus-green-800 flex-grow text-black bg-green-200 hover:bg-white hover:text-white' 
            type='file'
            onChange={handleFileChange}
          />
        </div>

        <div className="flex ml-4 mt-1">
          <button
            type="button"
            onClick={handleSearch}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Search'}
          </button>
        </div>
      </div>

      {medicineName && (
        <div className="bg-white p-4 m-4 rounded-md">
          <h3 className="text-lg font-semibold">Medicine Information</h3>
          <p><strong>Name:</strong> {medicineName}</p>
          <p><strong>Power:</strong> {contain}</p>
          <p><strong>side_effect:</strong> {side_effect}</p>
          <p><strong>Side Effects:</strong> {remember}</p>
        </div>
      )}
    </div>
  );
}
