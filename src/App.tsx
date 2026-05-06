import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './pages/Dashboard'
import ExamPage from './pages/ExamPage'
import Login from './pages/Login'
import Result from './pages/Result'
import EvaluatorPapers from './pages/EvaluatorPapers'
import EvaluatorReview from './pages/EvaluatorReview'
import Signup from './pages/Signup'
import StudentTestPage from './pages/StudentTestPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:id"
            element={
              <ProtectedRoute>
                <ExamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-test"
            element={
              <ProtectedRoute>
                <StudentTestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evaluator/papers"
            element={
              <ProtectedRoute>
                <EvaluatorPapers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evaluator/papers/:reviewKey"
            element={
              <ProtectedRoute>
                <EvaluatorReview />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
