import * as hashblockService from "../services/hashblock";

const minutes = 10, interval = minutes * 60 * 1000;
setInterval(async () => {
  const hashblocks = await hashblockService.getNewestsHashblocks()

  if (hashblocks) {
    await hashblocks.map(async (hashblock: hashblockService.HashblockType) => {
      const saved = await hashblockService.saveHashblock(hashblock)
      console.log(hashblocks)
    })
  }
  else {
    console.log("Fail to get hashblocks")
  }
}, interval);