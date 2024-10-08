import React, { useEffect, useState } from 'react';
import Potential_disease from './Potential_disease';

function Chat() {
  const [diseases, setDiseases] = useState({});

  useEffect(() => {
    // Retrieve and parse potential diseases from localStorage
    const storedDiseases = JSON.parse(localStorage.getItem("potentialDiseases"));

    if (storedDiseases) {
      setDiseases(storedDiseases);  // Set the diseases if they exist
    } 
  }, []);

  return (
    <div>
      <h2>Potential Diseases:</h2>
      {/* Render the diseases correctly */}
      {Object.entries(diseases).length > 0 ? (
        <ul>
          {Object.entries(diseases).map(([disease, probability]) => (
            <li key={disease}>
              {disease}: {probability}
            </li>
          ))}
        </ul>
      ) : (
        <p>No potential diseases detected.</p>
      )}
      {/* Render Potential_disease component */}
      <Potential_disease disease={diseases} />
    </div>
  );
}

export default Chat;
