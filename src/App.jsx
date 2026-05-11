import React from 'react'
import SearchBar from './components/SearchBar.jsx'
import Tabs from './components/Tabs.jsx'
import ResultGrid from './components/ResultGrid.jsx'


const App = () => {

 
  return (
    <div className='h-screen w-full bg-gradient-to-br from-sky-50 via-white to-purple-50 overflow-auto'>
      <SearchBar/>
      <Tabs/>
      <ResultGrid/>
    </div>
  )
}

export default App