
const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2024, 5, 29, 8, 30, 0); //วันเปิดรับสมัคร

  if (now < registerOpenDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบยื่นคำร้องขอสิทธิสมัครยังไม่เปิด <br> The system is not available'
    });
    return;
  }

  next();
};

const checkTimeEnd = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2024, 6, 3, 16, 0, 0); //วันปิดรับสมัคร

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบยื่นคำร้องขอสิทธิสมัครปิดแล้ว <br> The system is not available'
    });
    return;
  }

  next();
};

export { checkTimeOpen, checkTimeEnd };
