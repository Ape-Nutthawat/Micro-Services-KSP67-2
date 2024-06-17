const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2024, 5, 17, 0, 0, 0); //วันเปิดระบบตรวจสอบสิทธิและปรับปรุงข้อมูล

  if (now < registerOpenDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบยื่นคำร้องขอทบทวนสิทธิยังไม่เปิด <br> The system is not available',
    });
    return;
  }

  next();
};

const checkTimeEnd = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2024, 5, 19, 23, 59, 59); //วันปิดระบบตรวจสอบสิทธิและปรับปรุงข้อมูล

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบยื่นคำร้องขอทบทวนสิทธิปิดแล้ว <br> The system is not available',
    });
    return;
  }

  next();
};

export { checkTimeEnd, checkTimeOpen };
