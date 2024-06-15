const checkTimeOpen = (req, res, next) => {
  const now = new Date();

  const registerOpenDate = new Date(2024, 5, 13, 8, 30, 0); //วันเปิดระบบตรวจสอบสิทธิและปรับปรุงข้อมูล

  if (now < registerOpenDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้ตรวจสอบสิทธิโปรดทราบ <br> Attention',
      cause: 'ระบบตรวจสอบสิทธิและปรับปรุงข้อมูลยังไม่เปิด <br> The system is not available',
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
      message: 'ผู้ตรวจสอบสิทธิโปรดทราบ <br> Attention',
      cause: 'ระบบตรวจสอบสิทธิและปรับปรุงข้อมูลปิดแล้ว <br> The system is not available',
    });
    return;
  }

  next();
};

export { checkTimeEnd, checkTimeOpen };
