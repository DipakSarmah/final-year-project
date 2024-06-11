function Home() {
  return (
    <section className="bg-gradient-to-r from-blue-300 to-red-100 py-16 ">
      <div className="grid grid-cols-2" id="hero-grid">
        <div className="col-span-5/7 px-14" id="hero-header">
          <h2 className="text-3xl font-sans font-bold py-3">
            Access All The Project Management Resources right here.
          </h2>
          <p className="text-xl font-mono">
            Welcome to PMS, where projects meet mentorship. Empowering students,
            guides, and admins for success
          </p>
        </div>
        <div className="col-span-2/7 px-14 m-auto" id="hero-illustration">
          <div className="">
            <img width={200} height={200} src="/side-image.png" alt="logo" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
