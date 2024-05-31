const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2023, 9, 21, 0, 30, 0); //วันเปิดรับสมัคร
  // const registerEndDate = new Date(2023, 9, 18, 16, 30, 0); // test

  if (now < registerOpenDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ไม่สามารถใช้งานระบบได้',
      cause: 'ระบบยังไม่เปิดรับสมัคร',
    });
    return;
  }

  next();
};

const checkTimeEnd = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2023, 9, 31, 22, 0, 0); //วันปิดรับสมัคร
  // const registerEndDate = new Date(2023, 9, 18, 16, 30, 0); // test

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ไม่สามารถใช้งานระบบได้',
      cause: 'ระบบปิดรับสมัครแล้ว',
    });
    return;
  }

  next();
};

export { checkTimeEnd, checkTimeOpen };
