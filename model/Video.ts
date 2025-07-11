import mongoose, { Document, Model, models } from "mongoose";

export const VEDIO_DIMENSIONS={
  width : 1080,
  height: 1980

}as const

export interface IVideo{
  title: string;
  description: string;     
  Videourl: string;
  thumbnailurl: string;
  controls?:boolean
  _id?:mongoose.Types.ObjectId
  createdAt?: Date;
  updatedAt?: Date;
  transformation?:{
    height:number;
    width:number
    quality?:number;
  }


}

const VideoSchema = new mongoose.Schema<IVideo>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  Videourl: {
    type: String,
    required: true,
  },
  controls:{
    type:Boolean,
    default:true,

  },
  transformation:{

    height:{
        type:Number,
        default: VEDIO_DIMENSIONS.height,
    }
    ,
       width:{
        type:Number,
        default: VEDIO_DIMENSIONS.width,
    }

  }

}, {
  timestamps: true,  // adds createdAt and updatedAt automatically
});


const Video : Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;

