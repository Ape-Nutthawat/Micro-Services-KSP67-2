const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2024, 6, 8, 0, 0, 0); //วันเปิดรับสมัคร

  if (now < registerOpenDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบแก้ไขข้อมูลผู้สมัครยังไม่เปิด <br> The system is not available',
    });
    return;
  }

  next();
};

const checkTimeEnd = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2024, 6, 10, 23, 59, 59); //วันปิด

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบแก้ไขข้อมูลผู้สมัครปิดแล้ว  <br> The system is not available',
    });
    return;
  }

  next();
};

export { checkTimeOpen, checkTimeEnd };

