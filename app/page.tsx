"use client"

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/model/Video";
import { useEffect, useState } from "react";
import AllVideos from "./components/AllVideos";



export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
   const fetchVideos= async()=>{
    try {
    const data=await apiClient.getVideos();
  
    setVideos(data)

    } catch (error) {
      console.log("Error fetching Videos", error);
      
    }
   }

   fetchVideos();
  }, [])
  


  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
       <AllVideos videos={videos} />
    </div>
  );
}
