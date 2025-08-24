const productModel = require("../model/product")
const path = require('path')

const fs=require('fs/promises')
class productController {
    async createproduct(req, res) {
        try {
            const { name, description, price, category } = req.body
            const pdata = await new productModel({
                name, description, price, category
            })
            if (req.file) {
                pdata.image = req.file.filename
            }
            const data = await pdata.save()
            return res.status(201).json({
                status: true,
                message: 'product created successfully',
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,

            })
        }
    }
    async allproduct(req, res) {
        try {
            const pdata = await productModel.find()

            return res.status(200).json({
                status: true,
                message: ' All product fetched  successfully',
                total: pdata.length,
                data: pdata
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,

            })
        }
    }
    async singleproduct(req, res) {
        try {
            const id = req.params.id
            const pdata = await productModel.findById(id)

            return res.status(200).json({
                status: true,
                message: ' single product fetched  successfully',

                data: pdata
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,

            })
        }
    }
    async updateproduct(req, res) {
        try {
            const id = req.params.id
            const { name, description, price, category } = req.body
            const existingProduct = await productModel.findById(id);
            if (!existingProduct) {
                return res.status(404).json({
                    status: false,
                    message: 'Product not found',
                });
            }
            if (req.file) {
                // Delete old file if exists
                if (existingProduct.image) {
                    console.log(__dirname);

                    const oldFilePath = path.join('F:/shreelekha/Nodejs/Exam_preparation/server/uploads', existingProduct.image);
                    console.log(oldFilePath);

                    fs.unlink(oldFilePath, (err) => {
                        if (err) console.error('Error deleting file:', err);
                        else console.log('Old file deleted');
                    });
                }
                // Set new file name in req.body
                req.body.image = req.file.filename;
            }
            const pdata = await productModel.findByIdAndUpdate(id, req.body, { new: true })

            return res.status(200).json({
                status: true,
                message: '  product updated successfully',

                data: pdata
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,

            })
        }
    }


    async deleteproduct(req, res) {
        try {
            const id = req.params.id;
            const existingProduct = await productModel.findById(id);

            if (!existingProduct) {
                return res.status(404).json({
                    status: false,
                    message: 'Product not found',
                });
            }

            // Delete the file if it exists
            if (existingProduct.image) {
                const oldFilePath = path.join('F:/shreelekha/Nodejs/Exam_preparation/server/uploads', existingProduct.image);
                try {
                    await fs.unlink(oldFilePath); // No callback needed
                    console.log('Old file deleted successfully');
                } catch (err) {
                    console.error('Error deleting file:', err.message);
                }
            }

            // Delete product from database
            await productModel.findByIdAndDelete(id);

            return res.status(200).json({
                status: true,
                message: 'Product deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    }


}
module.exports = new productController()