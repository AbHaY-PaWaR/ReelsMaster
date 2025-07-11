// // import { Video } from '@imagekit/next';
// import Video from "next-video"
// import { IVideo } from '@/model/Video';
// import Link from 'next/link';     //https://ik.imagekit.io/demo/sample-video.mp4/ik-master.m3u8?tr=sr-240_360_480_720_1080
//                                  //https://ik.imagekit.io/demo/sample-video.mp4/ik-master.mpd?tr=sr-240_360_480_720_1080

          
//   interface VideoComponentProps {
//   video: IVideo;
//   isPlaying?: boolean;
//   setPlayingId?: (id: string) => void;
// }                               

// export default function VideoComponent({video}:VideoComponentProps) {

//   //  const playerUrl =video.Videourl.replace("https://ik.imagekit.io/", "https://imagekit.io/player/embed/")
//   //   + "/ik-master.m3u8?tr=sr-240_360_480_720_1080";

// //     const playerUrl = video.Videourl.replace(
// //   "https://ik.imagekit.io/",
// //   "https://ik.imagekit.io/"
// // ) + "/ik-master.m3u8";

// const playerUrl = video.Videourl + "/ik-master.m3u8";



// console.log("Player URL:", playerUrl);


//   return (
//     <div className="card bg-base-100  shadow hover:shadow-lg transition-all duration-300">
//       <figure className="relative px-4 pt-4">
//         {/* <Link href={video.Videourl} className="relative group w-full"> */}
//           <div
//            className="relative w-full max-w-[400px] aspect-[9/16] rounded-xl overflow-hidden overflow-x-hidden shadow-lg"
//             style={{ aspectRatio: "9/16" }}
//           >
//             {/* <Video
//               src={playerUrl}
//               // urlEndpoint={process.env.IMAGEKIT_PUBLIC_URLendpoint}
             
              
//               controls={video.controls}
//               className="w-full h-full object-cover"
//             /> */}
//              <iframe
//               src={playerUrl}
//               allowFullScreen
//               className="w-full h-full rounded-xl"
//               style={{ border: "none" }}
//             />

                   
               

           
//           </div>

           

//         {/* </Link> */}
//       </figure>

//       <div className="card-body p-4">
//         <Link
//           href={playerUrl}
//           className="hover:opacity-80 transition-opacity"
//         >
//           <h2 className="card-title text-lg">{video.title}</h2>
//         </Link>

//         <p className="text-sm text-base-content/70 line-clamp-2">
//           {video.description}
//         </p>
//       </div>



//     </div>
  
//   )
// }




import { IVideo } from '@/model/Video';

interface VideoComponentProps {
  video: IVideo;
  isPlaying: boolean;
  setPlayingId: (id: string) => void;
}

export default function VideoComponent({ video, isPlaying, setPlayingId }: VideoComponentProps) {
  const playerUrl = video.Videourl.replace("https://ik.imagekit.io/", "https://imagekit.io/player/embed/")
    + "/ik-master.m3u8?tr=sr-240_360_480_720_1080";

  return (
    <div
      className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300"
      onClick={() => setPlayingId(video._id?.toString()||"")}
    >
      <figure className="relative px-4 pt-4">
        <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg">
          {isPlaying && (
            <iframe
              src={playerUrl}
              allowFullScreen
              className="w-full h-full rounded-xl"
              style={{ border: "none" }}
            />
          )}
          {!isPlaying && (
            <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white">
              Click to Play
            </div>
          )}
        </div>
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg">{video.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
