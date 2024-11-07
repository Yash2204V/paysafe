/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setUsers(response.data.user)
        })
        .catch(error => {
            console.error("There was an error fetching the users!", error);
        });
    }, [filter])
    return <>
        <div className="font-bold mt-6 text-2xl text-gray-800">Users</div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full text-black px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between p-2 border-b border-slate-200 hover:bg-gray-700 transition duration-200">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
                <div className="text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="font-semibold text-lg">
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>
}