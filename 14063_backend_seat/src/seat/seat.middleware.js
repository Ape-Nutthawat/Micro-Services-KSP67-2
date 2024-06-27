const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2024, 5, 28, 8, 30, 0); //วันเปิดรับสมัคร

  if (now < registerOpenDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบยังไม่เปิด <br> The system is not available',
    });
    return;
  }

  next();
};

const checkTimeEnd = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2024, 6, 6, 16, 30, 0); //วันปิดรับสมัคร

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบปิดแล้ว <br> The system is not available',
    });
    return;
  }

  next();
};

export { checkTimeOpen, checkTimeEnd };
