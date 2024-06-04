import { Route, Routes, useNavigate } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'
import Layout from './layouts/Layout'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Home from './pages/Home'
import Student from './pages/Student'
import Guide from './pages/Guide'
import Admin from './pages/Admin'
import Teams from './pages/Teams'
import StudentController from './pages/Admin/StudentController'
import GuideCrud from './pages/Admin/GuideCrud'
import ProjectDetailsCrud from './pages/Admin/ProjectDetailsCrud'
import TeamController from './pages/Guide/TeamController'
import ProjectAllotment from './pages/Guide/ProjectAllotment'
import TeamLogs from './pages/Guide/TeamLogs'
import TeamAppointment from './pages/Guide/TeamAppointment'
import TeamHome from './pages/Guide/TeamHome'
import ResourceCenter from './pages/Guide/ResourceCenter'

function AppWrapper() {
  const navigate = useNavigate()
  return (
    <AppContextProvider navigate={navigate}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/student">
            <Route path="/student/" element={<Student />} />
            <Route path="/student/team" element={<Teams />} />
          </Route>
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide">
            <Route path="/guide/" element={<Guide />} />
            {/* <Route path="/guide/student" element={<StudentControllerGuide />} /> */}
            <Route path="/guide/student" element={<StudentController />} />
            <Route
              path="/guide/project-details"
              element={<ProjectDetailsCrud />}
            />
            <Route
              path="/guide/project-allotment"
              element={<ProjectAllotment />}
            />
            {/* <Route path="/guide/team">
              <Route path="/guide/team/" element={<TeamController />} />
              <Route path="/guide/team/logs" element={<TeamLogs />} />
              <Route
                path="/guide/team/appointments"
                element={<TeamAppointment />}
              />
            </Route> */}
            <Route path="/guide/team" element={<TeamController />}>
              <Route path="/guide/team/" element={<TeamHome />} />
              <Route path="logs" element={<TeamLogs />} />
              <Route path="appointments" element={<TeamAppointment />} />
              <Route path="resource-center" element={<ResourceCenter />} />
            </Route>
          </Route>
          <Route path="/admin">
            <Route path="/admin/" element={<Admin />} />
            <Route path="/admin/student" element={<StudentController />} />
            <Route path="/admin/guides" element={<GuideCrud />} />
            <Route
              path="/admin/project-details"
              element={<ProjectDetailsCrud />}
            />
          </Route>
        </Routes>
      </Layout>
    </AppContextProvider>
  )
}

export default AppWrapper
