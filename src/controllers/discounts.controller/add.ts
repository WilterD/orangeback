import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'



export const getDiscountsDataFromRequestBody = (req: Request): any[] => {
    const {
      percentage,
      servicesMin,
      servicesMax,
      agencyRif
    } = req.body
    const newDiscount = [
      percentage,
      servicesMin,
      servicesMax,
      agencyRif
    ]
    return newDiscount
  }

  export const addDiscount = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const newDiscount = getDiscountsDataFromRequestBody(req)
  
      const insertar = await pool.query({
        text: 'INSERT INTO discounts (percentage, services_min, services_max, agency_rif) VALUES ($1, $2, $3, $4) RETURNING discount_id',
        values: newDiscount
      })
      const insertedId: string = insertar.rows[0].discount_id
      const response = await pool.query({
        text: 'SELECT * FROM discounts WHERE discount_id = $1',
        values: [insertedId]
      })
      return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
    } catch (error: unknown) {
      return handleControllerError(error, res)
    }
  }