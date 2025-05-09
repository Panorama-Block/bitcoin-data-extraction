import * as hashblockService from "../services/hashblock";
import * as general from "../services/general";

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

  const DifficultyAdjustment = await general.getDifficultyAdjustment()

  if (!DifficultyAdjustment) {
    console.log("Fail to get Difficulty Adjustment")
  }

  const Price = await general.getPrice()
  
  if (!Price) {
    console.log("Fail to get Price")
  }

}, interval);

/*
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
*/

// const blocks = async () => {
//   console.log("entrou")
//   const hashblocks = await hashblockService.getManyHashblocks()

//   if (hashblocks) {
//     hashblocks.map(async (hashblock: hashblockService.HashblockType) => {
//       const saved = await hashblockService.saveHashblock(hashblock)
//       console.log(hashblocks)
//     })
//   }
// }

// blocks()