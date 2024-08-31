import Appbar from "./components/Appbar"
import SearchBar from "./components/SearchBar"

function App() {

  return (<>

  <div className="h-max">  
      <h1>
        <SearchBar />
        <Appbar />
      </h1>
  </div>
    </>
  )
}

export default App
