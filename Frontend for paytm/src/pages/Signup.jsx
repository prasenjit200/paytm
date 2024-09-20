import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg')", 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 bg-white bg-opacity-90 rounded-lg w-80 p-6 shadow-lg ">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        
        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="John"
          label={"First Name"}
        />
        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
          label={"Last Name"}
        />
        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          placeholder="jhon@2004"
          label={"Email"}
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          placeholder="abcD@2000"
          label={"Password"}
        />

        <div className="pt-4">
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/register",
                {
                  firstName,
                  lastName,
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            label={"Sign up"}
          />
        </div>

        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
