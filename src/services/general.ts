import axios from "axios";

const BASE_URL = "https://api.mempool.space/api";

export interface DifficultyAdjustment {
  progressPercent: number;
  difficultyChange: number;
  estimatedRetargetDate: number;
  remainingBlocks: number;
  remainingTime: number;
  previousRetarget: number;
  nextRetargetHeight: number;
  timeAvg: number;
  adjustedTimeAvg: number;
  timeOffset: number;
}

export interface Price {
    time: number;
    USD: number;
    EUR: number;
    GBP: number;
    CAD: number;
    CHF: number;
    AUD: number;
    JPY: number;
}

export interface HistoricalPrice {
    prices: {
        time: number;
        EUR: number;
        USD: number;
    }[];
    exchangeRates: {
        "USDEUR": number;
        "USDGBP": number;
        "USDCAD": number;
        "USDCHF": number;
        "USDAUD": number;
        "USDJPY": number;
    }
}


export const getDifficultyAdjustment = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/difficulty-adjustment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching difficulty adjustment info:', error);
    return false;
  }
};

export const getPrice = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/prices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching price info:', error);
      return false;
    }
};

export const getHistoricalPrice = async (currency: string, timestamp: number): Promise<HistoricalPrice | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/historical-price?currency=${currency}&timestamp=${timestamp}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching historical price info:', error);
      return false;
    }
};