/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnService } from '~/services/columnService'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng sang Service
    const createdColumn = await columnService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {

    const columnId = req.params.id

    const updatedColumn = await columnService.update(columnId, req.body)
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) { next(error) }
}

const deleteItem = async (req, res, next) => {
  try {

    const columnId = req.params.id

    const result = await columnService.deleteItem(columnId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const columnController = {
  createNew,
  update,
  deleteItem
}
