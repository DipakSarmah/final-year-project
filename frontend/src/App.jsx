// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from 'react-router-dom'
// import { AppContextProvider } from './context/AppContext'
// import Layout from './layouts/Layout'
// import SignIn from './pages/SignIn'
// import Register from './pages/Register'
// import Home from './pages/Home'
// import Student from './pages/Student'
// import Guide from './pages/Guide'
// import Admin from './pages/Admin'
// import Teams from './pages/Teams'
// import StudentController from './pages/Admin/StudentController'
// import GuideCrud from './pages/Admin/GuideCrud'
// import ProjectDetailsCrud from './pages/Admin/ProjectDetailsCrud'

// function App() {
//   const navigate = useNavigate()
//   return (
//     <Router>
//       <AppContextProvider navigate={navigate}>
//         <Layout>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 // <Layout>
//                 <Home />
//                 // </Layout>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 // <Layout>
//                 <Register />
//                 // </Layout>
//               }
//             />
//             <Route
//               path="/sign-in"
//               element={
//                 // <Layout>
//                 <SignIn />
//                 // </Layout>
//               }
//             />

//             <Route path="/student">
//               <Route
//                 path="/student/"
//                 element={
//                   // <Layout>
//                   <Student />
//                   // </Layout>
//                 }
//               />
//               <Route
//                 path="/student/team"
//                 element={
//                   // <Layout>
//                   <Teams />
//                   // </Layout>
//                 }
//               />
//             </Route>
//             <Route
//               path="/guide"
//               element={
//                 // <Layout>
//                 <Guide />
//                 // </Layout>
//               }
//             />
//             <Route path="/admin">
//               <Route
//                 path="/admin/"
//                 element={
//                   // <Layout>
//                   <Admin />
//                   // </Layout>
//                 }
//               />
//               <Route
//                 path="/admin/student"
//                 element={
//                   // <Layout>
//                   <StudentController />
//                   // </Layout>
//                 }
//               />
//               <Route
//                 path="/admin/guides"
//                 element={
//                   // <Layout>
//                   <GuideCrud />
//                   // </Layout>
//                 }
//               />
//               <Route
//                 path="/admin/project-details"
//                 element={
//                   // <Layout>
//                   <ProjectDetailsCrud />
//                   // </Layout>
//                 }
//               />
//             </Route>
//           </Routes>
//         </Layout>
//       </AppContextProvider>
//     </Router>
//   )
// }

// export default App

import { BrowserRouter as Router } from 'react-router-dom'
import AppWrapper from './AppWrapper'

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
