/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export const Balance = ({ value }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
            <div className="flex">
                <div className="font-bold text-xl text-gray-800">
                    Your balance
                </div>
                <div className="font-semibold ml-4 text-xl text-green-600">
                    Rs {value}
                </div>
            </div>
            <Link className="text-red-600 text-lg underline hover:text-red-800 transition duration-200" to={"/logout"}>
                Logout
            </Link>
        </div>
    )
}