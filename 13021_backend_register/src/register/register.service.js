import { pool } from '../database.js';

export default class RegisterService {
  async addCustomer(registerData, registerFileData) {
    const sql = `INSERT INTO customer SET 
                      PayStatus = ?, 
                      RefNo1 = ?, 
                      CustomerID = ?, 
                      Name1 = ?, 
                      Name2 = ?, 
                      Name3 = ?, 
                      Gender = ?, 
                      Name1EN = ?, 
                      Name2EN = ?, 
                      NameMidEN = ?, 
                      Name3EN = ?, 
                      BirthDMY = ?, 
                      Degree = ?, 
                      Major = ?, 
                      University = ?, 
                      Address = ?, 
                      Soi = ?, 
                      Road = ?, 
                      District = ?, 
                      Amphur = ?, 
                      Province = ?, 
                      Zipcode = ?, 
                      TelMobile = ?, 
                      Email = ?, 
                      SpecialNeeds = ?, 
                      NationalityID = ?, 
                      Nationality = ?, 
                      StatusStudy = ?, 
                      Grade = ?, 
                      FileImg = ?, 
                      FileImgStatus = ?, 
                      smsStatus = "2", 
                      IP = ?`;
    const currentDate = new Date();
    const thaiTime = currentDate.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' });
    const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${thaiTime.split(':')[0]}`;
    const calRef = `${registerData.NationalityID}${formattedDate}${registerData.CustomerID}`;

    await pool.query(sql, [
      '*',
      calRef,
      registerData.CustomerID,
      registerData.Name1,
      registerData.Name2,
      registerData.Name3,
      registerData.Gender,
      registerData.Name1EN,
      registerData.Name2EN,
      registerData.NameMidEN,
      registerData.Name3EN,
      registerData.BirthDMY,
      registerData.Degree,
      registerData.Major,
      registerData.University,
      registerData.Address,
      registerData.Soi,
      registerData.Road,
      registerData.District,
      registerData.Amphur,
      registerData.Province,
      registerData.Zipcode,
      registerData.TelMobile,
      registerData.Email,
      registerData.SpecialNeeds,
      registerData.NationalityID,
      registerData.Nationality,
      registerData.StatusStudy,
      registerData.Grade,
      registerFileData.FileImg,
      registerFileData.FileImg != '-' ? 1 : '-',
      registerData.ip,
    ]);
  }
}
