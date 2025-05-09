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

export interface AddressTx {
  txid: string;
  version: number;
  locktime: number;
  vin: Object[];
  vout: Object[];
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
}

export interface AddressTxMempool {
  txid: string;
  version: number;
  locktime: number;
  vin: Object[];
  vout: Object[];
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
  };
}

export interface AddressValidation {
  isvalid: boolean;
  address: string;
  scriptPubKey: string;
  isscript: boolean;
  iswitness: boolean;
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

export const getAddressTxs = async (address: string): Promise<AddressTx[] | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/address/${address}/txs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address transactions:', error);
    return false;
  }
};

export const getAddressTxsMempool = async (address: string): Promise<AddressTxMempool[] | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/address/${address}/txs/mempool`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address transactions from mempool:', error);
    return false;
  }
};

export const getAddressValidation = async (address: string): Promise<AddressValidation | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/validate-address/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error validating address:', error);
    return false;
  }
}