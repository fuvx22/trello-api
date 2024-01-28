/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardService } from '~/services/cardService'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng sang Service
    const createdCard = await cardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) { next(error) }
}

export const cardController = {
  createNew
}
