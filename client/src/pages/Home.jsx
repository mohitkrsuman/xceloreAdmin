import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");
  console.log(data);

  const options = {
    method: "GET",
    url: "https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url",
    params: {
      url: url,
    },
    headers: {
      "x-rapidapi-key": "b426da3c44mshb0cbfebaee4e82fp1013f0jsn0cfaaef28b88",
      "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
    },
  };

  const onSubmitHandler = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%]">
      <div className="w-[60rem] h-[32rem] mt-[4rem] bg-gray-200 p-5">
        <div className="flex items-center justify-center text-3xl font-bold text-blue-600">
          <h2>Get Your Linked in Profile Details</h2>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center mt-[10rem]">
          <h2>Enter your linked in url</h2>
          <input
            onChange={(e) => setUrl(e.target.value)}
            className="p-5 bg-gray-400 w-[10rem] xl:w-[25rem] outline-none rounded-md"
            type="text"
            placeholder="enter your linked-in url"
          />
          <button
            onClick={onSubmitHandler}
            className="p-3 w-[10rem] xl:[20rem] bg-blue-600 text-white rounded-md mt-[2rem] hover:bg-blue-900 transition-colors"
          >
            Get Details
          </button>
        </div>
      </div>

      {data && (
        <div className="w-[60rem] h-[32rem] mt-[4rem] bg-gray-200 p-5 flex items-center justify-center flex-col">
           <img src={data.profilePicture} width={300} height={300} />
           <h2 className="mt-3">{data.headline}</h2>
           <h2 className="mt-5 text-sm text-bold w-[20rem]">{data.summary}</h2>
           <div className="mt-[2rem]">
              <h2 className="text-base text-blue-600">Location</h2>
              <p>{data?.geo.full}</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Home;
