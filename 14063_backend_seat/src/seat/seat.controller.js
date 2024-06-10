import SeatService from './seat.service.js';
import ErrorLogRepository from '../error-log.repository.js';
import { redis1 } from '../redis.js';

const getSeatRedis = async (RoundID, LocationID) => {
  const keySeatCount = `SeatCount_R${RoundID}_L${LocationID}`;
  const seatData = await redis1.get('Location');
  const seatCount = (await redis1.incr(keySeatCount)) - 1;
  return { seatData, seatCount, keySeatCount };
};

export const checkSeat = async (req, res, next) => {
  // console.log(" 😎 ~ checkSeat ~ req : ", req.body)
  if (!req.body.CustomerID || !req.body.RoundID || !req.body.LocationID) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง <br> Invalid Data Format.',
    });
  }
  const { RoundID, LocationID, CustomerID } = req.body;
  let keyRedis;
  try {
    const { seatData, seatCount, keySeatCount } = await getSeatRedis(RoundID, LocationID);
    keyRedis = keySeatCount;
    const result = JSON.parse(seatData);
    const resultLocation = result.find((item) => item.RoundID == RoundID && item.LocationID == LocationID);

    if (seatCount >= resultLocation.SeatMax) {
      await redis1.set(keySeatCount, resultLocation.SeatMax);
      return res.status(400).send({
        status: 'success',
        code: 1,
        result: {},
        message: 'ผู้สมัครโปรดทราบ <br> Attention',
        cause: 'สนามสอบที่ท่านเลือกเต็มแล้ว <br> The exam field is full.',
      });
    }
    // console.log('update redis successfully');
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    return res.status(500).send({
      status: 'fail',
      code: 0,
      message: error.message,
      result: '',
    });
  }

  try {
    const resultUpdateSeat = await new SeatService().updateSeatCustomer(RoundID, LocationID, CustomerID);

    if (resultUpdateSeat.affectedRows === 1) {
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: resultUpdateSeat,
        message: '-',
        cause: '-',
      });
    }
    await redis1.decr(keyRedis);

    return res.status(400).send({
      status: 'failed',
      code: 0,
      result: resultUpdateSeat,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'อัปเดทข้อมูลไม่สำเร็จ <br> Update Failed',
    });
  } catch (error) {
    await redis1.decr(keyRedis);
    await new ErrorLogRepository().saveErrorLog(error, req);
    return res.status(500).send({
      status: 'fail',
      code: 0,
      message: error.message,
      result: '',
    });
  }
};

export const reloadSeat = async (req, res, next) => {
  try {
    const seatService = new SeatService();
    const result = await seatService.getSeatCustomer();
    // console.log(" 😎 ~ reloadSeat ~ result : ", result)

    if (result.length === 0) {
      return res.status(200).send({
        status: 'success',
        code: 0,
        result,
        message: '',
        cause: '-',
      });
    }
    const updateSeatRedis = await seatService.updateSeatRedis(result);
    // console.log(" 😎 ~ reloadSeat ~ updateSeatRedis : ", updateSeatRedis)
  
    if (updateSeatRedis === 'OK') {
      await seatService.reloadSeatCustomer();
      return res.status(200).send({
        status: 'success',
        code: 1,
        result,
        message: '-',
        cause: '-',
      });
    }
    return res.status(400).send({
      status: 'failed',
      code: 0,
      result,
      message: 'เกิดข้อผิดพลาด <br> Warning',
      cause: 'อัปเดทข้อมูลไม่สำเร็จ <br> Update Failed',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};
