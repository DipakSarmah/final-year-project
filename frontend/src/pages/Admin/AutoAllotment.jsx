import AutomaticAllotment from '../../components/AutomaticAllotment'

function AutoAllotment() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8">
        Automatic Allotment of Projects
      </h1>
      <p className="text-lg mb-4">
        You can select the department you want to allot project.
      </p>
      <AutomaticAllotment />
    </div>
  )
}

export default AutoAllotment
