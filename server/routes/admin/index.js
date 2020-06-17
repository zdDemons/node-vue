module.exports = app => {

    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    router.post('', async (req, res) => {
        const model = await (req.Modle.create(req.body))
        res.send(model)
    })
    router.put('/:id', async (req, res) => {
        const model = await (req.Modle.findByIdAndUpdate(req.params.id, req.body))
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        await (req.Modle.findByIdAndDelete(req.params.id, req.body))
        res.send({
            success: true
        })
    })
    router.get('', async (req, res) => {
        const queryOptions = {}
        // const a = req.Modle
        // console.log(a) //Model { Category }
        if(req.Modle.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await (req.Modle.find().setOptions(queryOptions).limit(10))
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        const model = await (req.Modle.findById(req.params.id))
        res.send(model)
    })

    console.log(router)
    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Modle = require(`../../models/${modelName}`)
        next()
    } ,router)
}