const contentModel = require('../Models/ContentModel');

const createContent = async (req, res) => {

    console.log(req.body)
    try {
        const existingContent = await contentModel.findOne({});
        if(existingContent){
            const updateContent = await contentModel.findOneAndUpdate({},{...req.body},{new:true});
            return res.status(400).json({message:"Content Updated Successfully"})
        }
        const newContent = new contentModel({...req.body});
        await newContent.save();
        res.status(201).json({ message: "Content created successfully", data: newContent });
    }

        catch(err){
            console.log(err.message)
            res.status(500).json({message:err.message})
        }
    }



const getContent = async(req,res)=>{
    try{
const content = await contentModel.findOne({})
res.status(200).json({data:content})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports = { createContent,getContent };