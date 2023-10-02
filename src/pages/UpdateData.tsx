import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextInput from "../components/inputs/text";
import Alert from "../components/Alert";

import * as Identity from "@spica-devkit/identity";
import * as Bucket from "@spica-devkit/bucket";

const UpdateData = () => {
  const [userId, setUserId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<Number>();
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const spicaMasterUrl = process.env.REACT_APP_SPICA_MASTER!;

  const clearAlert = () => {
    setAlert(null);
  };

  Identity.initialize({
    apikey: "e951i18lm4zdrot",
    publicUrl: `${spicaMasterUrl}/api`,
  });

  let userInfoId = {
    _id: userId
  }

  let userInfos = {
    msisdn: phone,
    username: username,
    age: Number(age),
  };

  const updateUser = async () => {
    Bucket.initialize({
      apikey: "e951i18lm4zdrot",
      publicUrl: `${spicaMasterUrl}/api`,
    });
    if (userInfos && userInfoId) {
      if (!userInfos.msisdn || !userInfos.username || !userInfos.age || !userInfoId._id) {
        setAlert({ type: "error", message: "Invalid information" });
      } else {
        Bucket.data.update("65157c056095ae002d10dfbc", userInfoId._id,userInfos);
        setAlert({ type: "success", message: "Information added!" });
      }
      return;
    }
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="m-4">
          <TextInput
            label="_id"
            name="_id"
            value={userId}
            onChange={(value: string) => setUserId(value)}
          ></TextInput>
          <TextInput
            label="Phone number"
            name="msisdn"
            value={phone}
            onChange={(value: string) => setPhone(value)}
          ></TextInput>
          <TextInput
            label="Username"
            name="username"
            value={username}
            onChange={(value: string) => setUsername(value)}
          ></TextInput>
          <TextInput
            label="Age"
            name="age"
            value={age}
            onChange={(value: Number) => setAge(value)}
          ></TextInput>
          <button
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => updateUser()}
          >
            Update
          </button>
          {alert && <Alert type={alert.type} message={alert.message} onClose={clearAlert}/>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateData;
