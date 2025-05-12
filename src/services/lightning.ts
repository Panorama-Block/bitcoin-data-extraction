import axios from "axios";

const BASE_URL = "https://api.mempool.space/api";

export interface NetworkStats {
  latest: {
    id: number;
    added: string;
    channelCount: number;
    nodeCount: number;
    totalCapacity: number;
    torNodes: number;
    clearnetNodes: number;
    unannouncedNodes: number;
    avgCapacity: number;
    avgFeeRate: number;
    avgBaseFeeMTokens: number;
    medCapacity: number;
    medFeeRate: number;
    medBaseFeeMTokens: number;
    clearnetTorNodes: number;
  }
}

export interface NodesChannels {
  nodes: {
    publicKey: string;
    alias: string;
    capacity: number;
    channels: number;
  }[];
  channels: string[];
}

export interface NodesinCountry {
    country: {
        de: string;
        en: string;
        es: string;
        fr: string;
        ja: string;
        ptBr: string;
        ru: string;
        zhCn: string;
    };
    nodes: {
        pubKey: string;
        capacity: number;
        channels: number;
        alias: string;
        firstSeen: number;
        updatedAt: number;
        city: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        country: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        isoCode: string;
        subdivision: {
            de: string;
            en: string;
            fr: string;
        }
    }
}

export interface NodesStatsPerCountry {
    response: {
        name: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        iso: string;
        count: number;
        share: number;
        capacity: string;
    }[];
}

export interface ISPNodes {
    isp: string;
    nodes: {
        publicKey: string;
        capacity: number;
        channels: number;
        alias: string;
        firstSeen: number;
        updatedAt: number;
        city: string;
        country: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        isoCode: string;
        subdivision: string;
    }[];
}

export interface NodesStatsPerISP {
    clearnetCapacity: number;
    torCapacity: number;
    unknownCapacity: number;
    ispRanking: [Object[]];
}

export interface Top100Nodes {
    topByCapacity: {
        publicKey: string;
        alias: string;
        capacity: number;
    }[];
    topByChannels: {
        publicKey: string;
        alias: string;
        channels: number;
    }[];
}

export interface Top100NodesLiquidity {
    response: {
        publicKey: string;
        alias: string;
        capacity: number;
        channels: number;
        firstSeen: number;
        updatedAt: number;
        city: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        country: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
    }[];
}

export interface Top100NodesConnectivity {
    response: {
        publicKey: string;
        alias: string;
        capacity: number;
        channels: number;
        firstSeen: number;
        updatedAt: number;
        city: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        country: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
    }[];
}

export interface Top100OldestNodes {
    response: {
        publicKey: string;
        alias: string;
        capacity: number;
        channels: number;
        firstSeen: number;
        updatedAt: number;
        city: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        country: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
    }[];
}

export interface NodeStats {
        publicKey: string;
        alias: string;
        firstSeen: number;
        updatedAt: number;
        color: string;
        sockets: string;
        asNumber: number;
        cityId: number;
        countryId: number;
        subdivisionId: number;
        longitude: number;
        latitude: number;
        isoCode: string;
        asOrganization: string;
        city: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        country: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ja: string;
            ptBr: string;
            ru: string;
            zhCn: string;
        };
        subdivision: {
            de: string;
            en: string;
            es: string;
            fr: string;
            ru: string;
        };
        activeChannelCount: number;
        capacity: string;
        openedChannelCount: number;
        closedChannelCount: number;
}

export interface HistoricalNodeStats {
    response: {
        added: number;
        capacity: number;
        channels: number;
    }[];
}

export interface Channel {
    id: string;
    shortId: string;
    capacity: number;
    transactionId: string;
    transactionVout: number;
    closingTransactionId: string;
    closingReason: string;
    updatedAt: string;
    created: string;
    status: number;
    nodeLeft: {
        alias: string;
        publicKey: string;
        channels: number;
        capacity: number;
        baseFeeMTokens: number;
        cltvDelta: number;
        feeRate: number;
        isDisabled: number;
        maxHtlcMTokens: number;
        minHtlcMTokens: number;
        updatedAt: string;
        logintude: number;
        latitude: number;
    };
    nodeRight: {
        alias: string;
        pubKey: string;
        channels: number;
        capacity: number;
        baseFeeMTokens: number;
        cltvDelta: number;
        feeRate: number;
        isDisabled: number;
        maxHtlcMTokens: number;
        minHtlcMTokens: number;
        updatedAt: string;
        longitude: number;
        latitude: number;
    }
}

export interface ChannelsTXID {
    response: {
        inputs: Object;
        outputs: {
            one: {
                id: string;
                shortId: string;
                capacity: number;
                transactionId: string;
                transactionVout: number;
                closingTransactionId: number;
                closingReason: number;
                updatedAt: string;
                created: string;
                status: number;
                nodeLeft: {
                    alias: string;
                    pubKey: string;
                    baseFeeMTokens: number;
                    cltvDelta: number;
                    feeRate: number;
                    isDisabled: number;
                    maxHtlcMTokens: number;
                    minHtlcMTokens: number;
                    updatedAt: string;
                };
                nodeRight: {
                    alias: string;
                    pubKey: string;
                    baseFeeMTokens: number;
                    cltvDelta: number;
                    feeRate: number;
                    isDisabled: number;
                    maxHtlcMTokens: number;
                    minHtlcMTokens: number;
                    updatedAt: string;
                }
            }
        }
    }[];
}

export interface ChannelsNodePubkey {
    response: {
        status: number;
        closingReason: number;
        capacity: number;
        shortId: string;
        id: string;
        feeRate: number;
        node: {
            alias: string;
            pubKey: string;
            channels: number;
            capacity: string;
        }
    }[];
}

export interface ChannelGeodata {
    response: [object[]];
}

export interface ChannelGeodataNode {
    response: [object[]];
}

export interface PendingAccelerations {
    response: {
        txId: string;
        added: number;
        feeDelta: number;
        effectiveVsize: number;
        effectiveFee: number;
        pools: number[];
    }[];
}

export interface AccelerationHistory {
    response: {
        txId: string;
        status: string;
        added: number;
        lastUpdated: number;
        effectiveFee: number;
        effectiveVsize: number;
        feeDelta: number;
        blockHash: string;
        blocHeight: number;
        bidBoost: number;
        boostVersion: string;
        pools: number[];
        minedByPoolUniqueId: number;
    }[];
}

export const getNetworkStats = async (interval: string): Promise<NetworkStats | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/statistics/${interval}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching network stats info:', error);
    return false;
  }
};

export const getNodesChannels = async (query: string): Promise<NodesChannels | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/search?searchText=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nodes and channels info:', error);
    return false;
  }
};

export const getNodesCountry = async (country: string): Promise<NodesinCountry | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/country/${country}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nodes country info:', error);
    return false;
  }
};

export const getNodesStatsPerCountry = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/countries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nodes stats per country info:', error);
    return false;
  }
};

export const getIspNodes = async (isp: string): Promise<ISPNodes | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/isp/${isp}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching isp nodes info:', error);
    return false;
  }
};

export const getNodeStatsPerISP = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/isp-ranking`);
    return response.data;
  } catch (error) {
    console.error('Error fetching node stats per isp info:', error);
    return false;
  }
};

export const get100Nodes = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/rankings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching 100 nodes info:', error);
    return false;
  }
};

export const get100NodesLiquidity = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/rankings/liquidity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching 100 nodes by liquidity info:', error);
    return false;
  }
};

export const get100NodesConnectivity = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/rankings/connectivity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching 100 nodes by connectivity info:', error);
    return false;
  }
};

export const get100OldestNodes = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/rankings/age`);
    return response.data;
  } catch (error) {
    console.error('Error fetching 100 oldest nodes info:', error);
    return false;
  }
};

export const getNodeStats = async (pubKey: string): Promise<NodeStats | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/${pubKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching node stats info:', error);
    return false;
  }
};

export const getHistoricalNodeStats = async (pubKey: string): Promise<HistoricalNodeStats| false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/nodes/${pubKey}/statistics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical node stats info:', error);
    return false;
  }
};

export const getChannel = async (channelId: string): Promise<Channel | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/channels/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return false;
  }
};

export const getChannelTXID = async (txid: string): Promise<ChannelsTXID | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/channels/txids?txId[]=${txid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channel TXID info:', error);
    return false;
  }
};

export const getChannelsNodePubKey = async (pubKey: string, status: string): Promise<ChannelsNodePubkey | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/channels?public_key=${pubKey}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channels from node public key info:', error);
    return false;
  }
};

export const getChannelGeodata = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/channels-geo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channel geodata info:', error);
    return false;
  }
};

export const getChannelGeodataNode = async (pubKey: string): Promise<ChannelGeodataNode | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/lightning/channels-geo/${pubKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channel geodata for node info:', error);
    return false;
  }
};

export const getPendingAccelerations = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/services/accelerator/accelerations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pending accelerations info:', error);
    return false;
  }
};

export const getAccelerationHistory = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/services/accelerator/accelerations/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching acceleration history info:', error);
    return false;
  }
};