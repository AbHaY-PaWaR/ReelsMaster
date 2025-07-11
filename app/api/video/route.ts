import { authOptions } from "@/lib/auth";
import { connectdb } from "@/lib/db";
import Video, { IVideo } from "@/model/Video";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(){

   try {
     await connectdb();
 
     const videos = await Video.find({}).sort({createdAt : -1}).lean()
 
     
     if (!videos || videos.length === 0) {
       return NextResponse.json([], { status: 200 });
     }
 
     return NextResponse.json(videos);
   } catch (error) {

    return NextResponse.json({
        error:"failed to load videos"
    }, {status:500});

   }


}

export async function POST(request: NextRequest){

 try {
        const session =await getServerSession(authOptions)
   
        if(!session){
           return NextResponse.json({error:"u are not authrize user"} , {status:400})
        }
   
        await connectdb()
   
        const body: IVideo = await request.json();
   
       // Validate required fields
       if (
         !body.title ||
         !body.description ||
         !body.videoUrl ||
         !body.thumbnailUrl
         
       ) {
         return NextResponse.json(
           { error: "Missing required fields" },
           { status: 400 }
         );
       }

       const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);


 } catch (error) {
     return NextResponse.json({
        error:"failed to post video"
    }, {status:500});
   

 }



}