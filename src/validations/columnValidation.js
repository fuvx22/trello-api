/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const corectCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
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

const update = async (req, res, next) => {
  const corectCondition = Joi.object({
    // boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
      .default([])
  })

  try {
    // Chỉ định abortEarly: false để trả về tất cả lỗi khi có nhiều lỗi
    await corectCondition.validateAsync(req.body, { 
      abortEarly : false,
      // Đối vs trường hợp update thì cho phép thông qua các trường không định nghĩa trong Joi object
      allowUnknown: true
    })
    // Nếu không có lỗi thì next req qua controller
    next()
  } catch (error) {

    const errorMessage = new Error(error).message
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))

  }
}

export const columnValidation = {
  createNew,
  update
}