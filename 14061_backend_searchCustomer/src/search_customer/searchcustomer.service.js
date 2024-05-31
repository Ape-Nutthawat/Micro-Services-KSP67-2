import { pool } from '../database.js';

export default class SearchCustomerService {
  async searchCustomer(CustomerID, BirthDMY) {
    const sqlCustomer = `SELECT 
                          ID,
                          PayStatus,
                          RefNo1,
                          RoundID,
                          Round,
                          LocationID,
                          Location,
                          CustomerID,
                          Name1,
                          Name2,
                          Name3,
                          Gender,
                          Name1EN,
                          Name2EN,
                          NameMidEN,
                          Name3EN,
                          BirthDMY,
                          Degree,
                          Major,
                          University,
                          Address,
                          Soi,
                          Road,
                          District,
                          Amphur,
                          Province,
                          Zipcode,
                          TelMobile,
                          Email,
                          SpecialNeeds,
                          NationalityID,
                          Nationality,
                          StatusStudy,
                          Grade,
                          FileImg,
                          FileImgStatus,
                          TypeRegis,
                          CreatedAt,
                          UpdateAt,
                          TransDate,
                          TransTime,
                          optionsLocation
                        FROM vStatusCustomer
                        WHERE
                            CustomerID = ?
                            AND BirthDMY = ?
                        LIMIT 1`;

    const [customer] = await pool.query(sqlCustomer, [CustomerID, BirthDMY]);
    if (customer.length === 0) {
      return false;
    }
    return customer[0];
  }
}
