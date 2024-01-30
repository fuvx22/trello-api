/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'


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

export const columnService = {
  createNew
}