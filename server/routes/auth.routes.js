const express = require('express')
const User = require('../models/User')
const Basket = require('../models/Basket')
const router = express.Router({ mergeParams: true })
const tokenService = require('../services/token.service')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

router.post('/signUp',[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 8 символов').isLength({ min: 8 }),
    async(req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    // error: {
                    //     message: 'INVALID_DATA',
                    //     code: 400,
                    //     // errors: errors.array()tor
                    // }
                    errorMessage: 'Неверные данные'
                })
            }
            
            const { email, password, isAdmin } = req.body
            const exitingUser = await User.findOne({ email: email })

            if(exitingUser) {
                return res.status(400).json({
                    // error: {
                    //     message: 'INVALID_DATA',
                    //     code: 400,
                    //     // errors: errors.array()
                    // }
                    errorMessage: 'E-mail уже существует'
                })
                
            }
         
            const hashedPassword = await bcrypt.hash(password, 12) 

       
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword,             
            })

            const basket = await Basket.create({ user: newUser.id, product: [] })


            const tokens = tokenService.generate({ _id: newUser._id })
            await tokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({ ...tokens, userId: newUser._id, isAdmin: isAdmin })

        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка'
            })
        }
    }])

router.post('/signInWithPassword', [
    check("email", "Email некорректный").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(), // fix it!
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(400).json({
                    error: {
                        message: errors.array()[0].msg,
                        code: 400,
                        // errors: errors.array()

                    }
                })
            }

            const { email, password } = req.body

            const existingUser = await User.findOne({ email })

            if(!existingUser) {
                return res.status(400).send({
                    error: {
                        message: "E-mail не найден",
                        code:400
                    }
                })
            }

            const isPasswordEqual =  await bcrypt.compare(password, existingUser.password)

            if(!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "Неверный пароль",
                        code:400
                    }
                })
            }

            const tokens = tokenService.generate({ _id: existingUser.id })
            
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({ ...tokens, userId: existingUser._id, isAdmin: existingUser.isAdmin })

        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка'
            })
        }
}])

router.post('/token', async (req, res) => {
    try {
        const { refreshToken } = req.body

        const data = tokenService.validateRefresh(refreshToken) // id user
        const dbToken = await tokenService.findToken(refreshToken)

        if(!data || !dbToken || data._id !== dbToken?.user?.toString()) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const tokens = await tokenService.generate({
            _id: dbToken.toString()
        })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({ ...tokens, userId: data._id })
        // res.status(200).send(data)

    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
    module.exports = router