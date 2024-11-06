import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleTransfer = () => {
        axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount: Number(amount)
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(() => {
            setShowToast(true);
        })
        .catch(error => {
            console.error("Transfer failed!", error);
        });
    };
    return (
        <div className="flex justify-center">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-6 space-y-8 w-96 shadow-lg rounded-lg bg-gray-800">
                    <div className="flex flex-col ">
                        <h2 className="text-3xl font-bold text-center text-white">Send Money</h2>
                    </div>
                    <div className="">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none text-gray-300"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button onClick={handleTransfer} className="justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                {showToast && (
                    <div id="toast-simple" className="flex justify-center items-center text-center p-4 w-full  text-gray-500 bg-gray-800 divide-gray-700 rounded-lg shadow-lg mt-4 cursor-pointer" onClick={() => {
                        navigate("/dashboard");
                    }}>
                        <svg className="w-5 h-5 text-blue-600 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
                        </svg>
                        <div className="ps-4 text-sm font-normal text-white">Message sent successfully.<br />Click here to go to Dashboard.</div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}