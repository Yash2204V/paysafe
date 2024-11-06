import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ButtonWarning({label, redirect, to}) {
  return (
    <div>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {label} 
        <Link className="px-3 underline" to={to}>{redirect}</Link>
        </div>
    </div>
  )
}
