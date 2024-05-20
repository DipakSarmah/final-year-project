// // eslint-disable-next-line react/prop-types
// function Modal({ isVisible, onClose, children }) {
//   if (!isVisible) return null
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
//       <div className="p-5 w-[700px] flex flex-col">
//         <button
//           className="text-white text-xl place-self-end bg-black px-1.5"
//           onClick={() => onClose()}
//         >
//           X
//         </button>
//         <div className="bg-white p-2 rounded">{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Modal

// eslint-disable-next-line react/prop-types
function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg p-5 w-full max-w-3xl mx-2 md:mx-5 md:w-3/4 lg:w-2/3 xl:w-1/2 overflow-hidden shadow-lg">
        <button
          className="absolute top-4 right-4 text-black text-2xl bg-white rounded-full px-2"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="max-h-[80vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
