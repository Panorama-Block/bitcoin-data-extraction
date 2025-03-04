import { RequestHandler } from "express";
import * as addressService from '../services/address';

export const getAddress: RequestHandler = async (req, res) => {
  const { address } = req.params;

  try {
    const addressInfo = await addressService.getAddressInfo(address);

    if (addressInfo) {
      res.status(200).json({
        ok: true,
        data: addressInfo
      });
    } else {
      res.status(404).json({
        error: 'Address not found or error occurred'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching address information'
    });
  }
};