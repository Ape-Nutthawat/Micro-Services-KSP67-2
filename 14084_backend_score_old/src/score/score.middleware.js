const checkTime = (req, res, next) => {
  const now = new Date();
  console.log(' 😎 ~ checkTime ~ now : ', now);

  const registerEndDate = new Date(2023, 9, 31, 16, 30, 0); //วันปิดรับสมัคร
  // const registerEndDate = new Date(2023, 9, 18, 16, 30, 0); // test
  console.log(' 😎 ~ checkTime ~ registerEndDate : ', registerEndDate);

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
