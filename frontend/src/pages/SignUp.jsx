import { Button } from "../components/Button";
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import SubHeading from "../components/SubHeading";
import ButtonWarning from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";

export function SignUp(){
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col  w-[100%] p-3 pb-0 rounded-xl justify-center items-center text-left">
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your infromation to create an account"} />
            <InputField onChange={(e)=>{
                setFirstName(e.target.value);
            }} placeholder="Yash" label={"First Name"} type={"text"} />
            <InputField onChange={(e)=>{
                setLastName(e.target.value);
            }} placeholder="Varma" label={"Last Name"} type={"text"} />
            <InputField onChange={(e)=>{
                setEmail(e.target.value);
            }} placeholder="yash@gmail.com" label={"Email"} type={"email"} />
            <InputField onChange={(e)=>{
                setPassword(e.target.value);
            }} placeholder="12345oiuyt" label={"Password"} type={"password"} />
            <Button onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    firstname,
                    lastname,
                    email,
                    password
                });
                localStorage.setItem("token", response.data.token);
            }} label={"Sign up"} />
            <ButtonWarning label={"Already have an account?"} redirect="Sign In"  to={"/signin"}/>
        </div>
    )
}