import { IVideo } from '@/model/Video'
import React, { useState } from 'react'
import VideoComponent from './VideoComponent'

interface VideoFeedProps {
  videos: IVideo[];
}

export default function AllVideos  ({videos}:VideoFeedProps)  {

    const [playingId, setPlayingId] = useState<string | null>(null);


  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()}
          isPlaying={playingId === video._id?.toString()}
          setPlayingId={setPlayingId}
           video={video} />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  )
}

