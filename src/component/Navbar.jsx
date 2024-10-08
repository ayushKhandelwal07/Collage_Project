import { useNavigate } from 'react-router-dom';
import doc_img from '../assets/doctor-svgrepo-com.svg'


function Navbar() {
      const navigate = useNavigate();

      const homeRedirect = () => {
            navigate('/language')
      }
  return (
  <div className='flex justify-center content-center'>
                  <div className='flex justify-between content-center my-2 text-xl font-medium border fixed p-4 border-black rounded-full w-1/2'>
                        
                        <div  className='ml-5'>
                              <img  src={doc_img} height={50} width={50} alt="Doctor" />
                        </div>
                              
                        <div className='flex mt-3 relative group text-lg'>
                              <div className='text-slate-800 hover:text-black'>
                                    Find Your Pain
                                    <div className='bg-green-900 h-[2px] w-0 group-hover:w-full transition-all duration-300'></div>
                              </div>
                        </div>
                        <div className='flex mt-3 relative group text-lg'>
                              <div className='text-slate-800 hover:text-black'>
                                    Blogs
                                    <div className='bg-green-900 h-[2px] w-0 group-hover:w-full transition-all duration-300'></div>
                              </div>
                        </div>
                  
                        <div className='flex mr-5'>
                              <button onClick={homeRedirect} className='bg-emerald-700 border-green-700 text-white text-lg rounded-2xl p-2 border-none font-semibold'>Relive My Pain</button>
                        </div>
                  </div>
            </div> 
  )
}

export default Navbar
