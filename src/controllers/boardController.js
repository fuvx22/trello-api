/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const createNew = async (req, res, next) => {
  try {

    // Điều hướng sang Service
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: APIs create new board' })

  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
