"use client"

import VideoUploader from "../components/VideoUploader";


export default function VideoUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload a Reel</h1>
        <VideoUploader/>
      </div>
    </div>
  );
}