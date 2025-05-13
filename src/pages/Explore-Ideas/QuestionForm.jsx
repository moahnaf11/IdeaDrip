import { IoIosTimer, IoMdClose, IoMdSend, IoMdTrash } from "react-icons/io";
import { BiDollarCircle, BiUserCheck, BiBulb } from "react-icons/bi";

function QuestionForm({ dialogRef, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    dialogRef.current.close();
  };

  const clearForm = () => {
    setFormData({
      funding: "",
      experience: "",
      ideas: "",
      time: "",
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-[90%] md:max-w-md bg-white rounded-lg shadow-lg backdrop:bg-black backdrop:bg-opacity-50 p-0"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
        }
      }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">
          Some questions to tailor ideas for you
        </h2>
        <button
          onClick={() => dialogRef.current.close()}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-1">
            <BiDollarCircle className="text-blue-600" />
            Do you have money / funding? If so, how much?
          </label>
          <input
            type="text"
            name="funding"
            value={formData.funding}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., $50,000 initial investment"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-1">
            <BiUserCheck className="text-blue-600" />
            What's your experience?
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., 5 years in tech startups"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-1">
            <IoIosTimer className="text-blue-600" />
            How many hours a week can you dedicate?
          </label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., 10 hours per week"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-1">
            <BiBulb className="text-blue-600" />
            What ideas have you had before?
          </label>
          <textarea
            name="ideas"
            value={formData.ideas}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Previous projects or startup ideas"
            rows="4"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={clearForm}
            className="flex items-center gap-1 px-4 py-2 border rounded hover:bg-gray-50"
          >
            <IoMdTrash />
            Clear
          </button>
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <IoMdSend />
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default QuestionForm;
