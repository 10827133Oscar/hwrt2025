import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TeachingPrepare from './pages/TeachingPrepare'
import TeachingPractice from './pages/TeachingPractice'
import TestPrepare from './pages/TestPrepare'
import TestPractice from './pages/TestPractice'
import TestResult from './pages/TestResult'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teaching/prepare" element={<TeachingPrepare />} />
        <Route path="/teaching/practice" element={<TeachingPractice />} />
        <Route path="/test/prepare" element={<TestPrepare />} />
        <Route path="/test/practice" element={<TestPractice />} />
        <Route path="/test/result" element={<TestResult />} />
      </Routes>
    </Router>
  )
}

export default App

