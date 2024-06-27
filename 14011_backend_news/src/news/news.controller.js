import NewsService from './news.service.js';
import ErrorLogRepository from '../error-log.repository.js';
import { redis1 } from '../redis.js';
import { generateToken } from "../authtoken.js";

export const getAllNews = async (req, res, next) => {
  try {
    const news = await new NewsService().getNews();
    const token = await generateToken();
    const resObj = {
      locations: news[0],
      news: news[1],
      popups: news[2],
      token: token
    };
    

    // console.log('getAllNews success');
    res.status(200).send({
      status: 'success',
      code: 1,
      result: resObj,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};


export const updateLocations = async (req, res, next) => {
  try {
    for (let round = 1; round < 5; round++) {
      for (let location = 1; location < 17; location++) {
        const values = await redis1.get(`SeatCount_R${round}_L${location}`);
        await new NewsService().updateCountSeat(values, round, location);
      }
    }

    return res.status(200).send({
      status: 'success',
      code: 1,
      message: '-',
      cause: '-',
    });
  } catch (error) {
    await new ErrorLogRepository().saveErrorLog(error, req);
    next(error);
  }
};
