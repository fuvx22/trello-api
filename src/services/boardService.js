/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'


const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    // Clone deep board thành respone board để xử lý
    const resBoard = cloneDeep(board)
    // Đưa cards vào đúng column của nó
    resBoard.columns.forEach(column => {

      // Object id của mongodb có hỗ trợ func equals để so sánh _id
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      // Cách 2: dùng toString() của JS để đưa về string để so sánh
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // Xóa mảng cards nằm cùng cấp mảng columns
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}