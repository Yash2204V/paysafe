/* eslint-disable react/prop-types */
export default function InputField({label, placeholder, type, onChange}) {
  return (
    <div>
         <label htmlFor={label.toLowerCase().split(" ").join("")} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
         <input type={type} onChange={onChange} id={label.toLowerCase().split(" ").join("")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
  )
}
