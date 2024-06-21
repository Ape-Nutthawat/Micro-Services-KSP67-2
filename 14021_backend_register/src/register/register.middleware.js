const checkTime = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2024, 6, 6, 16, 30, 0); //วันปิดรับสมัคร
  // const registerEndDate = new Date(2023, 9, 18, 16, 30, 0); // test

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ผู้สมัครโปรดทราบ <br> Attention',
      cause: 'ระบบปิดรับสมัครแล้ว <br> The system is not available',
    });
    return;
  }

  next();
};

export default checkTime;
