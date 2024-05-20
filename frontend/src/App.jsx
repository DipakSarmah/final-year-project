import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Home from './pages/Home'
import Student from './pages/Student'
import Guide from './pages/Guide'
import Admin from './pages/Admin'
import Teams from './pages/Teams'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        <Route path="/student">
          <Route
            path="/student/"
            element={
              <Layout>
                <Student />
              </Layout>
            }
          />
          <Route
            path="/student/team"
            element={
              <Layout>
                <Teams />
              </Layout>
            }
          />
        </Route>
        <Route
          path="/guide"
          element={
            <Layout>
              <Guide />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
