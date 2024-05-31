const checkTime = (req, res, next) => {
  const now = new Date();

  const registerEndDate = new Date(2023, 9, 31, 22, 0, 0); //วันปิดรับชำระ
  // const registerEndDate = new Date(2023, 9, 20, 13, 36, 0); // test

  if (now > registerEndDate) {
    res.status(200).send({
      status: 'error',
      code: 2,
      result: {},
      message: 'ไม่สามารถใช้งานระบบได้',
      cause: 'ระบบปิดชำระเงินแล้ว',
    });
    return;
  }

  next();
};

export default checkTime;
