/* eslint-disable react/prop-types */
import Footer from '../components/Footer'
import Header from '../components/Header'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto py-6 flex-1">{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
