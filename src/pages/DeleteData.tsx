import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TextInput from "../components/inputs/text";
import Alert from "../components/Alert";

import * as Identity from "@spica-devkit/identity";
import * as Bucket from "@spica-devkit/bucket";

const DeleteData = () => {
  const [dataId, setDataId] = useState<string>("");
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const spicaMasterUrl = process.env.REACT_APP_SPICA_MASTER!;

  Identity.initialize({
    apikey: "e951i18lm4zdrot",
    publicUrl: `${spicaMasterUrl}/api`,
  });

  const deleteUser = async () => {
    Bucket.initialize({
      apikey: "e951i18lm4zdrot",
      publicUrl: `${spicaMasterUrl}/api`,
    });
    if(!dataId){
        setAlert({type: "error", message: "Invalid Info"});
        console.log("ERROR")
      }else{
        Bucket.data.remove("65157c056095ae002d10dfbc", dataId)
        setAlert({type: "success", message: "Data Removed!"});
      }
      return;
  };
  

  return (
    <div>
      <Navbar />
      <div className="m-4">
        <TextInput
          label="Delete Data with _id"
          name="msisdn"
          value={dataId}
          onChange={(value: string) => setDataId(value)}
        ></TextInput>
        <button
          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
          onClick={() => deleteUser()}
        >
          Delete
        </button>
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>
    </div>
  );
};

export default DeleteData;
