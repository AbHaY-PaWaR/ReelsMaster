'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiClient } from '@/lib/api-client';
import { useNotification } from './Notification';
import { Loader2 } from 'lucide-react';
import FileUpload from './fileuploads';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';
import { motion } from 'framer-motion';
import { button, div } from 'framer-motion/client';

interface VideoFormData {
  title: string;
  Videourl: string;
  thumbnailurl: string;
  description: string;
  filename?: string;
}

export default function VideoUploader() {
   const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      Videourl: "",
      thumbnailurl: "",
      filename:""
    },
  });

  const handleUploadSuccess = (response:UploadResponse) => {
    setValue("Videourl",response.url);
    setValue("filename" ,response.filePath)
    setValue("thumbnailurl",response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.Videourl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("Videourl", "");
      setValue("thumbnailurl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="form-control">
        <label className="label font-semibold m-4 ">Title : </label>
        <input
          type="text"
          className={`input input-bordered ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-error text-sm mt-1">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="form-control">
        <label className="label font-semibold m-4">Description : </label>
        <textarea
          className={`textarea textarea-bordered h-24 ${
            errors.description ? "textarea-error" : ""
          }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="form-control m-4">
        <label className="label">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
       </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
         <button
         type="submit"
         className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600"
        disabled={loading || !uploadProgress}
         >
          Public Video
         </button>
        )}
      </button>
    </form>
  );
}