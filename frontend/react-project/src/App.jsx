import { Route, Routes, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === '/create'

  return (
    <div data-theme="coffee" className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App