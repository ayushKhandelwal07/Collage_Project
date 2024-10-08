import Navbar from '@/component/Navbar';
import { useNavigate } from 'react-router-dom'

function Home() {
      const navigate = useNavigate();

      const homeRedirect = () => {
            navigate('/language')
      }

      return (
      <div >

            <Navbar />
            <div className="flex justify-center content-center mt-24">
                  <div className='flex text-5xl font-bold text-center'>
                        Find Relief from <br /> Your all heath concerns
                  </div>

            </div>

            <div className='flex justify-center content-center mt-12'>
                  <div className='flex text-xl text-center text-slate-800'>
                  The interactive guide you need to identify your health Problems <br /> discover personalized solutions for lasting relief and well-being.
                  </div>
            </div>

            <div className='flex justify-center content-center mt-16'>
                  <div className='text-xl font-semibold '>
                        📍 Pinpoint your pain  🎯 Get personalized solutions 😌 Find lasting relief
                  </div>
            </div>

      
            <div className='flex justify-center mt-20'>
                  <button onClick={homeRedirect} className='bg-emerald-700 border-green-700 text-white w-lg text-lg rounded-lg p-3 border-none font-semibold transform transition hover:scale-105 hover:shadow-2xl'>Start Pain Relief Journey</button>
            </div>
      </div>
)
}

export default Home
