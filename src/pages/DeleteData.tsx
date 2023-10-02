import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TextInput from "../components/inputs/text";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

import * as Identity from "@spica-devkit/identity";
import * as Bucket from "@spica-devkit/bucket";
import axios from "axios";

const DeleteData = () => {
  const [dataId, setDataId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);
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

  const getUserId = async () => {
    Bucket.initialize({
      apikey: "e951i18lm4zdrot",
      publicUrl: `${spicaMasterUrl}/api`,
    });
    try{
      const response = await axios
      .get(
        `${spicaMasterUrl}/api/bucket/65157c056095ae002d10dfbc/data/${dataId}`,
        {
          headers: {
            Authorization:
              "IDENTITY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlkZW50aWZpZXIiOiJzcGljYSIsInBvbGljaWVzIjpbIkFwaUtleUZ1bGxBY2Nlc3MiLCJJZGVudGl0eUZ1bGxBY2Nlc3MiLCJTdHJhdGVneUZ1bGxBY2Nlc3MiLCJQb2xpY3lGdWxsQWNjZXNzIiwiUGFzc3BvcnRGdWxsQWNjZXNzIiwiQWN0aXZpdHlGdWxsQWNjZXNzIiwiU3RvcmFnZUZ1bGxBY2Nlc3MiLCJCdWNrZXRGdWxsQWNjZXNzIiwiV2ViaG9va0Z1bGxBY2Nlc3MiLCJQcmVmZXJlbmNlRnVsbEFjY2VzcyIsIldlYmhvb2tSZWFkT25seUFjY2VzcyIsIjVmZDM1NWZhZWQ5MWYyMDAyZGMwOGY4ZCIsIkRhc2hib2FyZEZ1bGxBY2Nlc3MiLCJGdW5jdGlvbkZ1bGxBY2Nlc3MiLCJTdGF0dXNGdWxsQWNjZXNzIiwiVmVyc2lvbkNvbnRyb2xGdWxsQWNjZXNzIiwiQXNzZXRGdWxsQWNjZXNzIl19.eyJfaWQiOiI1ZjdhZDQ4NjIwNDM3YjIzYWIxNzY5ZmEiLCJpZGVudGlmaWVyIjoic3BpY2EiLCJwb2xpY2llcyI6WyJBcGlLZXlGdWxsQWNjZXNzIiwiSWRlbnRpdHlGdWxsQWNjZXNzIiwiU3RyYXRlZ3lGdWxsQWNjZXNzIiwiUG9saWN5RnVsbEFjY2VzcyIsIlBhc3Nwb3J0RnVsbEFjY2VzcyIsIkFjdGl2aXR5RnVsbEFjY2VzcyIsIlN0b3JhZ2VGdWxsQWNjZXNzIiwiQnVja2V0RnVsbEFjY2VzcyIsIldlYmhvb2tGdWxsQWNjZXNzIiwiUHJlZmVyZW5jZUZ1bGxBY2Nlc3MiLCJXZWJob29rUmVhZE9ubHlBY2Nlc3MiLCI1ZmQzNTVmYWVkOTFmMjAwMmRjMDhmOGQiLCJEYXNoYm9hcmRGdWxsQWNjZXNzIiwiRnVuY3Rpb25GdWxsQWNjZXNzIiwiU3RhdHVzRnVsbEFjY2VzcyIsIlZlcnNpb25Db250cm9sRnVsbEFjY2VzcyIsIkFzc2V0RnVsbEFjY2VzcyJdLCJpYXQiOjE2OTYyMzE1NTIsImV4cCI6MTY5NjQwNDM1MiwiYXVkIjoic3BpY2EuaW8iLCJpc3MiOiJodHRwczovL21hc3Rlci5zcGljYWVuZ2luZS5jb20vYXBpIn0.c4Yd7lgkZN1TwFw-L-I6NPZlt9z89tvQ-fq9YR80PVI",
          },
        }
      );
      setUserId(response.data._id);

      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2-second delay
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(()=>{
    getUserId();
  },)
 

  const deleteUser = () =>{
    if (!dataId || dataId !== userId) {
      setAlert({ type: "error", message: "Invalid or empty information" });
    } else {
      Bucket.data.remove("65157c056095ae002d10dfbc", userId);
      setAlert({ type: "success", message: "Data Removed!" });
    }
  }

  const handleRemove = () => {
    setLoading(true);
    getUserId();
    deleteUser();
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
          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => handleRemove()}
        >
          Delete
        </button>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {alert && <Alert type={alert.type} message={alert.message} onClose={clearAlert}/>}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteData;
