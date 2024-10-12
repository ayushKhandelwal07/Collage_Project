import { useNavigate } from 'react-router-dom';
import doc_img from '../assets/doctor-svgrepo-com.svg'


function Navbar() {
      const navigate = useNavigate();

      const disease = () => { navigate('/search') }
      const skin = () => { navigate('/skin') }
      const medicine = () => { navigate('/medicine') }

      

  return (
  <div className='flex justify-center content-center'>
                  <div className='flex justify-between content-center my-2 text-xl font-medium border fixed p-4 border-black rounded-full w-2/3'>
                        
                        <div  className='ml-10'>
                              <img  src={doc_img} height={50} width={50} alt="Doctor" />
                        </div>
                              
                        <div className='flex mt-3 relative group text-lg'>
                              <div className='text-slate-800 hover:text-black'>
                                    <button onClick={disease}>
                                          Disease Finder 
                                    </button>
                                    <div className='bg-green-900 h-[2px] w-0 group-hover:w-full transition-all duration-300'></div>
                              </div>
                        </div>
                        <div className='flex mt-3 relative group text-lg'>
                              <div className='text-slate-800 hover:text-black'>
                                    <button onClick={skin}>
                                          Skin Disease Detector
                                    </button>
                                    <div className='bg-green-900 h-[2px] w-0 group-hover:w-full transition-all duration-300'></div>
                              </div>
                        </div>
                  
                        <div className='flex mt-3 mr-10 relative group text-lg'>
                              <div className='text-slate-800 hover:text-black'>
                                    <button onClick={medicine}>
                                          Medicine Identifier
                                    </button>
                                    <div className='bg-green-900 h-[2px] w-0 group-hover:w-full transition-all duration-300'></div>
                              </div>
                        </div>
                  </div>
            </div> 
  )
}

export default Navbar
