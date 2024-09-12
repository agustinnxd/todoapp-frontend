import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import { TaskPage } from './pages/TaskPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './ProtectedRoute'
import { TaskProvider } from './context/TaskContext'
import { Navbar } from './components/Navbar'
import { UserProvider } from './context/UserContext'

export const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TaskProvider>
    </AuthProvider>
  )
}
