/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    // Kết quả của hàm createNew trong model sẽ trả về thông báo insert thành công hoặc thất bại của mongoDB
    const result_createdColumn = await columnModel.createNew(newColumn)

    // Query column vừa mới created để trả về cho API
    const getNewColumn = await columnModel.findOneById(result_createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lý cấu trúc data
      getNewColumn.cards = []
      // Cập nhật columnOrderIds của board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updatedColumn = await columnModel.update(columnId, updateData)

    return updatedColumn

  } catch (error) {
    throw error
  }
}
const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column to delete not found!')
    }
    // Xóa Column
    await columnModel.deleteOneById(columnId)
    // Xóa Cards thuộc column trên
    await cardModel.deleteManyByColumnId(columnId)

    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its Cards Deleted successfully'}
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}