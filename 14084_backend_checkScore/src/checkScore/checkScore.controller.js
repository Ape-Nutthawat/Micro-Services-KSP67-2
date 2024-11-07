import checkScoreService from './checkScore.service.js';
import ErrorLogRepository from '../error-log.repository.js';

export const checkScore = async (req, res, next) => {
  if (!req.body.CustomerID || !req.body.BirthDMY) {
    return res.status(400).send({
      status: 'failed',
      code: 0,
      message: 'เกิดข้อผิดพลาด',
      cause: 'รูปแบบข้อมูลไม่ถูกต้อง',
    });
  }
  
  const CustomerID = req.body.CustomerID;
  const BirthDMY = req.body.BirthDMY;

  try {
    let result;
    try {
      result = await new checkScoreService().getScoreRedis(CustomerID, BirthDMY);
      // console.log('Redis')
    } catch (redisError) {
      console.warn('Redis error, fetching data from database:', redisError);

      result = await new checkScoreService().getScoreFromDatabase(CustomerID, BirthDMY);
      // console.log('Database')
    }

    if (result) {
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: result,
        message: '-',
        cause: '-',
      });
    }
    
    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบไม่พบข้อมูลของท่าน <br> Can Not Found Your Information.',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    return res.status(500).send({
      status: 'fail',
      code: 0,
      message: error.message,
      result: '',
    });
  }
};


export const insertScore = async (req, res, next) => {
  try {
    const result = await new checkScoreService().getScore()

    await new checkScoreService().insertScore(result)
    if (result) {
      return res.status(200).send({
        status: 'success',
        code: 1,
        result: result,
        message: '-',
        cause: '-',
      });
    }
    return res.status(200).send({
      status: 'success',
      code: 0,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบไม่พบข้อมูลของท่าน <br> Can Not Found Your Information.',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    return res.status(500).send({
      status: 'fail',
      code: 0,
      message: error.message,
      result: '',
    });
  }
};
