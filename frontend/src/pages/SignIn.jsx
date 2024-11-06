import { useState } from "react";
import { Button } from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
            <div className="flex flex-col w-[100%] p-3 pb-0 rounded-xl justify-center items-center text-left">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputField onChange={(e)=>{
                    setEmail(e.target.value)
                }} placeholder="Email" label={"Email"} type={"email"} />
                <InputField onChange={(e)=>{
                    setPassword(e.target.value)
                }} placeholder="12345oiuyt" label={"Password"} type={"password"} />
                <Button onClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        email,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard");
                }} label={"Sign in"} />
                <ButtonWarning label={"Don't have an account?"} redirect="Sign Up" to={"/signup"}/>
            </div>
    )
}