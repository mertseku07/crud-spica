import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import * as Identity from "@spica-devkit/identity";
import * as Bucket from "@spica-devkit/bucket";
import axios from "axios";

const GetData = () => {
  const [users, setUsers] = useState<any>([]);
  const [headers, setHeaders] = useState({});
  const [headerNames, setHeaderNames] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const spicaMasterUrl = process.env.REACT_APP_SPICA_MASTER!;

  Identity.initialize({
    apikey: "e951i18lm4zdrot",
    publicUrl: `${spicaMasterUrl}/api`,
  });

  const getBucket = async () => {
    Bucket.initialize({
      apikey: "e951i18lm4zdrot",
      publicUrl: `${spicaMasterUrl}/api`,
    });
    let userData: any = await Bucket.data.getAll("65157c056095ae002d10dfbc");
    setUsers(userData);
  }

    useEffect(()=>{
      setHeaderNames(Object.keys(headers));
    })  

    const getHeaders = async () => {
      await axios
      .get(`${spicaMasterUrl}/api/bucket/65157c056095ae002d10dfbc`, {
        headers: {
          Authorization:
            "IDENTITY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImlkZW50aWZpZXIiOiJzcGljYSIsInBvbGljaWVzIjpbIkFwaUtleUZ1bGxBY2Nlc3MiLCJJZGVudGl0eUZ1bGxBY2Nlc3MiLCJTdHJhdGVneUZ1bGxBY2Nlc3MiLCJQb2xpY3lGdWxsQWNjZXNzIiwiUGFzc3BvcnRGdWxsQWNjZXNzIiwiQWN0aXZpdHlGdWxsQWNjZXNzIiwiU3RvcmFnZUZ1bGxBY2Nlc3MiLCJCdWNrZXRGdWxsQWNjZXNzIiwiV2ViaG9va0Z1bGxBY2Nlc3MiLCJQcmVmZXJlbmNlRnVsbEFjY2VzcyIsIldlYmhvb2tSZWFkT25seUFjY2VzcyIsIjVmZDM1NWZhZWQ5MWYyMDAyZGMwOGY4ZCIsIkRhc2hib2FyZEZ1bGxBY2Nlc3MiLCJGdW5jdGlvbkZ1bGxBY2Nlc3MiLCJTdGF0dXNGdWxsQWNjZXNzIiwiVmVyc2lvbkNvbnRyb2xGdWxsQWNjZXNzIiwiQXNzZXRGdWxsQWNjZXNzIl19.eyJfaWQiOiI1ZjdhZDQ4NjIwNDM3YjIzYWIxNzY5ZmEiLCJpZGVudGlmaWVyIjoic3BpY2EiLCJwb2xpY2llcyI6WyJBcGlLZXlGdWxsQWNjZXNzIiwiSWRlbnRpdHlGdWxsQWNjZXNzIiwiU3RyYXRlZ3lGdWxsQWNjZXNzIiwiUG9saWN5RnVsbEFjY2VzcyIsIlBhc3Nwb3J0RnVsbEFjY2VzcyIsIkFjdGl2aXR5RnVsbEFjY2VzcyIsIlN0b3JhZ2VGdWxsQWNjZXNzIiwiQnVja2V0RnVsbEFjY2VzcyIsIldlYmhvb2tGdWxsQWNjZXNzIiwiUHJlZmVyZW5jZUZ1bGxBY2Nlc3MiLCJXZWJob29rUmVhZE9ubHlBY2Nlc3MiLCI1ZmQzNTVmYWVkOTFmMjAwMmRjMDhmOGQiLCJEYXNoYm9hcmRGdWxsQWNjZXNzIiwiRnVuY3Rpb25GdWxsQWNjZXNzIiwiU3RhdHVzRnVsbEFjY2VzcyIsIlZlcnNpb25Db250cm9sRnVsbEFjY2VzcyIsIkFzc2V0RnVsbEFjY2VzcyJdLCJpYXQiOjE2OTU5NzEzMjYsImV4cCI6MTY5NjE0NDEyNiwiYXVkIjoic3BpY2EuaW8iLCJpc3MiOiJodHRwczovL21hc3Rlci5zcGljYWVuZ2luZS5jb20vYXBpIn0.TdvD08138EZFaY54FRY-63GB6aYix_JhY0qokJVc51A",
        },
      })
      .then((res) => {
        setHeaders(res.data.properties);
        setLoading(false);
      });
  };
  const handleSearch = () => {
    setLoading(true);
    getHeaders();
    getBucket();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-lg mx-auto">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {headerNames.map((header: any, index: any) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((item: any, index: any) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.msisdn}</td>
                  <td>{item.username}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="text-center">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleSearch()}
        >
          Get Data
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default GetData;
