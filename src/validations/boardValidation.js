/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPE } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const corectCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required()
  })

  try {
    // Chỉ định abortEarly: false để trả về tất cả lỗi khi có nhiều lỗi
    await corectCondition.validateAsync(req.body, { abortEarly : false })
    // Nếu không có lỗi thì next req qua controller
    next()
  } catch (error) {

    const errorMessage = new Error(error).message
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))

  }
}

export const boardValidation = {
  createNew
}