import Appbar from './Appbar'
import Navbar from '@/component/Navbar'
import { Input } from '@/components/ui/input';

function Skin_disease() {

return (
      <div>
            <Appbar />
            <Navbar />
            <div className="flex justify-center items-center bg-emerald-800 p-4 m-5 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="flex mb-2 p-1 h-10 w-full">
                        <Input className='focus-green-800 flex-grow text-black bg-green-200 hover:bg-white hover:text-white' type='file'/>
                  </div>
                  
                  <div className="flex ml-4 mt-1">
                        <button
                              type="button"
                              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5"
                        >
                              Search
                        </button>
                  </div>
            </div>
      </div>
)
}

export default Skin_disease

