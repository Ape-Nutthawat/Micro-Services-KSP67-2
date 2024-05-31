
const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2023, 9, 22, 0, 0, 0); //วันเปิดรับสมัคร

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

  const registerEndDate = new Date(2023, 9, 29, 15, 0, 0); //วันปิดรับสมัคร

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

export { checkTimeOpen, checkTimeEnd };
