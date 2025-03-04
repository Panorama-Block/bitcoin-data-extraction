import axios from "axios";

const BASE_URL = "https://api.mempool.space/api";

export interface AddressStats {
  tx_count: number;
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
}

export interface AddressInfo {
  address: string;
  chain_stats: AddressStats;
  mempool_stats: AddressStats;
}

export const getAddressInfo = async (address: string): Promise<AddressInfo | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/address/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address info:', error);
    return false;
  }
};