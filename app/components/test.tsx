"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex flex-row px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-5 h-5" />
            ReelPro
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
              >
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>

                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        Video Upload
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                      
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client'

// import React from 'react'
// import { apiClient } from '@/lib/api-client'
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNotification } from "./Notification"
// import { Loader2 } from "lucide-react";
// import FileUpload from './fileuploads';
// import { UploadResponse } from 'imagekit/dist/libs/interfaces';

// interface VideoFormData {
//   title: string
//   Videourl:string;
//   thumbnailurl: string;
//   description: string;
// }

// const VideoUploader = () => {

//   const  {showNotification} = useNotification();
//   const [loading, setLoading] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<VideoFormData>({
//     defaultValues: {
//       title: "",
//       description: "",
//       Videourl: "",
//       thumbnailurl: "",
//     },
//   });

//   const handleUploadProgress = (progress : number)=> {
//     setUploadProgress(progress);
//   }
//   const handleUploadSuccess = (response:UploadResponse)=>{
//       setValue("Videourl", response.filePath);
//     setValue("thumbnailurl", response.thumbnailUrl || response.filePath);
//     showNotification("Video uploaded successfully!", "success");
//   }

//   const onSubmit = async(videodata: VideoFormData)=>{
//     if (!videodata.Videourl) {
//       showNotification("please select video file first or failed to load file" , "error")
//       return;
//     }
//     setLoading(true)
//     try {
//       await apiClient.createVideo(videodata);
//       showNotification("Video published successfully!", "success");

//       // Reset form after successful submission
//       setValue("title", "");
//       setValue("description", "");
//       setValue("Videourl", "");
//       setValue("thumbnailurl", "");
//       setUploadProgress(0);
//     } catch (error) {
//        showNotification(
//         error instanceof Error ? error.message : "Failed to publish video",
//          "error"
//        );
      
//     } finally {
//       setLoading(false);
//     }
//   }

//    const handleCancel = ()=>{
//      setValue("title", "");
//       setValue("description", "");
//       setValue("Videourl", "");
//       setValue("thumbnailurl", "");
//       setUploadProgress(0);
     
//    }
   

//   return (
//    <div>
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="form-control">
//         <label className="label">Title</label>
//         <input
//           type="text"
//           className={`input input-bordered ${
//             errors.title ? "input-error" : ""
//           }`}
//           {...register("title", { required: "Title is required" })}
//         />
//         {errors.title && (
//           <span className="text-error text-sm mt-1">
//             {errors.title.message}
//           </span>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">Description</label>
//         <textarea
//           className={`textarea textarea-bordered h-24 ${
//             errors.description ? "textarea-error" : ""
//           }`}
//           {...register("description", { required: "Description is required" })}
//         />
//         {errors.description && (
//           <span className="text-error text-sm mt-1">
//             {errors.description.message}
//           </span>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">Upload Video</label>
//         <FileUpload
       
//         onSuccess={handleUploadSuccess}
//         onProgress={handleUploadProgress}
//          fileType="video"
//         />
//         {uploadProgress > 0 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//             <div
//               className="bg-primary h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="btn btn-primary btn-block"
//         disabled={loading || !uploadProgress}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//             Publishing Video...
//           </>
//         ) : (
//           "Publish Video"
//         )}
//       </button>

//     </form> 
//     <button
//     type="button"
//     className="btn btn-secondary flex-1"
//     onClick={handleCancel}
//     disabled={loading}
//   >
//     Cancel
//   </button>
//    </div>
  
//   )
// }

// export default VideoUploader