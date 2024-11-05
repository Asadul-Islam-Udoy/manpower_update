const Banners = require('../models/banner');
const path = require('path');
const fs = require('fs');

///create banners
exports.crateBannerController=async(req,res)=>{
    try{
    
     const {title,description} = req.body;
     let images = [];
     if(req.files.length>0){
      images = req.files.map((file)=>{
        return({image:file.filename});
      });
     }
     const banner = await Banners.create({
        user:req.user._id,
        title,
        description,
        images
     });
     const banners = await Banners.find({});
     if(banner){
        res.status(200).json({
            flag:true,
            message:'banner create successfully!',
            banners
        })
     }
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}

///delete banner
exports.deleteBannerController=async(req,res)=>{
    try{
     const banner = await Banners.findById(req.params.id);
     if(!banner){
       return res.status(400).json({
            flag:false,
            message:'banner is not found!'
        })
     }
     if(banner.images.length > 0){
        const bannerpath = path.join(path.dirname(__dirname),'../backend/public/images/banners/');
        banner.images.forEach(item => {
            if(fs.existsSync(bannerpath+item.image)){
                fs.unlink(bannerpath+item.image,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log('banner file delete successfully')
                    }
                })
            }  
        });
     }
     await Banners.findByIdAndDelete(req.params.id);
     const banners = await Banners.find({});
     res.status(200).json({
        flag:true,
        message:'banner delete successfully!',
        banners
    })
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}


///delete banner
exports.updateBannerController=async(req,res)=>{
    try{
     const {title,description} =req.body;
     const banner = await Banners.findById(req.params.id);
     if(!banner){
       return res.status(400).json({
            flag:false,
            message:'banner is not found!'
        })
     }
     let images = [];
     if(req.files.length>0){
      images = req.files.map((file)=>{
        return({image:file.filename});
      });
      if(banner.images.length > 0){
        const bannerpath = path.join(path.dirname(__dirname),'../backend/public/images/banners/');
        banner.images.forEach(item => {
            if(fs.existsSync(bannerpath+item.image)){
                fs.unlink(bannerpath+item.image,(err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log('banner file delete successfully')
                    }
                })
            }  
        });
     }
     }
     banner.images = images.length == 0 ? banner.images : images;
     banner.title = title;
     banner.description = description;
     banner.save({validateBeforeSave:true});
     const banners = await Banners.find({});
     res.status(200).json({
        flag:true,
        message:'banner update successfully!',
        banners
    })
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}

///get active banner
exports.getIsActiveBannersController=async(req,res)=>{
    try{
      const banner = await Banners.findOne({isActive:{$eq:true}});
        res.status(200).json({
            flag:true,
            message:'this banner is active',
            banner
        })
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}

//get all banners
exports.getAllBannerController=async(req,res)=>{
    try{
    const banners = await Banners.find({});
    res.status(200).json({
        flag:true,
        message:'all banners getting successfully',
        banners
    })
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}

//get single banner
exports.getSingleBannersController=async(req,res)=>{
    try{
    const banner = await Banners.findById(req.params.id);
    res.status(200).json({
        flag:true,
        message:'sinvle banner getting successfully',
        banner
    })
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}


//get all banners
exports.updateBannerisActiveController=async(req,res)=>{
    try{
      const active_banners = await Banners.find({isActive:{$eq:true}});
      if(active_banners.length > 0){
        active_banners.forEach(async(element) => {
            await Banners.findByIdAndUpdate(element._id,{isActive:false},{new:true});
        });
      }
      const banner_update = await Banners.findByIdAndUpdate(req.params.id,{isActive:true},{new:true});
      const banners = await Banners.find({});
      if(banner_update){
        res.status(200).json({
            flag:true,
            message:'this banner is active',
            banners
        })
      }
    }
    catch(error){
        return res.status(400).json({
            flag:false,
            message:error
        })
    }
}


