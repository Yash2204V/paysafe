// /* eslint-disable react/prop-types */
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import axios from "axios"

export const Dashboard = () => {

    const [amount, setAmount] = useState(0);
    const [firstname, setFirstName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setAmount(response.data.balance);
            setFirstName(response.data.firstname);
        }).catch(error => {
            console.error("There was an error fetching the balance!", error);
        });
    }, [amount]);    

    return <div className="">
        <Appbar label={firstname} />
        <div className="m-8">
            <Balance value={amount} />
            <Users label />
        </div>
    </div>
}