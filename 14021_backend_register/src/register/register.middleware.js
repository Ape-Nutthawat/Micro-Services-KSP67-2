const checkTime = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2024, 0, 27, 16, 30, 0); //วันปิดรับสมัคร
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

export default checkTime;
