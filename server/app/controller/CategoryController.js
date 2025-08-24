const slugify = require("slugify");
const categoryModel = require("../model/category")

const productModel = require("../model/product");
class categoryController {
    async createcategory(req, res) {
        try {
            const { category_name, productId,slug } = req.body;


            const pdata = await productModel.findById(productId)
            const cdata = await new categoryModel({ category_name,slug:slugify(category_name) ,productId }).save();

            return res.status(201).json({
                status: true,
                message: "Category created successfully",
                data: cdata
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    async categorylist(req, res) {
        try {
            // const category = await categoryModel.aggregate([

            //     {
            //         $group: {
            //             _id: "$category_name",
            //             totalProducts: { $sum: 1 }
            //         }
            //     },


            //     {
            //         $lookup: {
            //             from: "products",
            //             localField: "_id",
            //             foreignField: "category",
            //             as: "product_details"
            //         }
            //     },


            //     {
            //         $project: {
            //             _id: 1,
            //             category_name:"$_id",
                        
            //             product_details: 1,
            //             totalProducts: 1,
            //         }
            //     }
            // ]);
        const category=await categoryModel.aggregate([
            {
                $group:{
                    _id:"$category_name",
                    totalproducts:{$sum:1}
                }
            },{
                $lookup:{
                    from:"products",
                    localField:"_id",
                    foreignField:"category",
                    as:"product_details"
                }
            },{
                $project:{
                    _id:1,
                    category_name:"$_id",
                    product_details: 1
                }
            }
        ])

        return res.status(200).json({
            status: true,
            message: 'categorylist fetched succesfully',
            total: category.length,
            data: category

        })

    } catch(error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }


}
    async singlecategory(req, res) {
    try {


        const slug = req.params.slug

        const category = await categoryModel.aggregate([
            {
                $match: { slug: slug }
            },
            {
                $group: {
                    _id: "$category_name",

                }
            },

            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    as: "product_details"
                }
            },
            {
                $project: {
                    category_name: 1,
                    // category_name: "$_id",
                    product_details: 1,

                }
            }
        ]);
        return res.status(200).json({
            status: true,
            message: 'Single data fetched Successfully',

            data: category
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }


}
}
module.exports = new categoryController()