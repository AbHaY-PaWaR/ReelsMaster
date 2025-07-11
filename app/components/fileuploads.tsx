"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { log } from "console";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
   const fileInputRef = useRef<HTMLInputElement>(null);


  //optional validation

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // const fileInput = fileInputRef.current;
    //   const file = fileInput.files[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/imagekit-upload-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: auth.publicKey,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        folder: "/videos",
        onProgress: (event) => {
          if(event.lengthComputable && onProgress){

            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent))
            setProgress(Math.round(percent))
          }
        },
        
      });
      onSuccess(res)
    } catch (error) {
        console.error("Upload failed don", error)
    } finally {
        setUploading(false)
        setProgress(0)
    }
  };

  return (
    <>
      <input
      ref={fileInputRef}
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        // style={{
        //   display: "none" ,
        // }}
      />

      <button className="bg-blue-500  px-4 py-1 rounded text-white hover:bg-blue-600"
      onClick={()=>{fileInputRef.current?.click()}}
      >
        Upload Video file
      </button>
        {progress > 0 && (
           <div className="w-full m-4 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-600 h-4 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        )}

      {uploading && <span>Loading....</span>}
    </>
  );
};

export default FileUpload;