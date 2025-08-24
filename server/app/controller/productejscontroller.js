const productModel = require("../model/product")
const path = require('path')

const fs = require('fs/promises')
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
            res.redirect('/product/list')
        } catch (error) {
            res.redirect('/product/add')
        }
    }
    async addproduct(req, res) {
        try {


            res.render('product/add')
        } catch (error) {
            console.log(error);

        }
    }
    async allproduct(req, res) {
        try {
            const pdata = await productModel.find()

            res.render('product/list',{
                title:'list',
                data:pdata
            })
        } catch (error) {
            res.redirect('/product/list')
        }
    }
    async singleproduct(req, res) {
        try {
            const id = req.params.id
            const pdata = await productModel.findById(id)

            return res.render('product/edit',{
                data:pdata
            })
        } catch (error) {
            res.redirect('/product/list')
        }
    }
    async updateproduct(req, res) {
        try {
            const id = req.params.id
            const { name, description, price, category } = req.body
            const existingProduct = await productModel.findById(id);
            if (!existingProduct) {
                res.redirect('/product/list')
            }
            if (req.file) {
                // Delete old file if exists
                if (existingProduct.image) {
                    console.log(__dirname);

                    const oldFilePath = path.join('F:/shreelekha/Nodejs/Exam_preparation/server/uploads',existingProduct.image);
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

            res.redirect('/product/list')
        } catch (error) {
            res.redirect('/product/list')
        }
    }


    async deleteproduct(req, res) {
        try {
            const id = req.params.id;
            const existingProduct = await productModel.findById(id);

            if (!existingProduct) {
                res.redirect('/product/list')
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

            res.redirect('/product/list')
        } catch (error) {
            res.redirect('/product/list')
        }
    }


}
module.exports = new productController()