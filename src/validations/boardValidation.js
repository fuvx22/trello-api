/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPE } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

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

const update = async (req, res, next) => {
  const corectCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE),
    columnOrderIds: Joi.array().items(
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
const moveCardToDifColumn = async (req, res, next) => {
  const corectCondition = Joi.object({
    currentCardId:  Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId:  Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),

    nextColumnId:  Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  })

  try {
    // Chỉ định abortEarly: false để trả về tất cả lỗi khi có nhiều lỗi
    await corectCondition.validateAsync(req.body, {
      abortEarly : false
    })
    // Nếu không có lỗi thì next req qua controller
    next()
  } catch (error) {

    const errorMessage = new Error(error).message
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))

  }
}

export const boardValidation = {
  createNew,
  update,
  moveCardToDifColumn
}