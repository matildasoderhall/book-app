
export interface IBooks {
    
    title:String
    description:String
    author:String
    genres:Array
    image:String
    published_year:Number
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Reviews"}]

}