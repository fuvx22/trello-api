/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const corectCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('req.body: ',req.body)
    // Chỉ định abortEarly: false để trả về tất cả lỗi khi có nhiều lỗi
    await corectCondition.validateAsync(req.body, { abortEarly : false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: APIs create new board' })
  } catch (error) {
    console.log(error)
    console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}