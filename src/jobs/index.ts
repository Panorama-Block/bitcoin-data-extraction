import * as hashblockService from "../services/hashblock";
import { getDayTimestamp } from "../utils/date";

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

let timestamp = getDayTimestamp(7)
let run = true
let actual: string | undefined = undefined

setInterval(async () => {
  if (!run) {
    return
  }

  const hashblocks = await hashblockService.getNewestsHashblocks(actual)
  await hashblocks.map(async (hashblock: hashblockService.HashblockType, index: number) => {
    await hashblockService.saveHashblock(hashblock)

    if (index === hashblocks.length - 1) {
      actual = hashblock.height.toString()
    }

    if (hashblock.timestamp < timestamp) {
      run = false
    }
    console.log(hashblock)
  })
}, 30000);