SELECT
    c.RoundID,
		l.Round,
    c.LocationID,
		l.Location,
    COUNT(c.CustomerID) as จำนวนจองที่นั่งสอบหลังคืนที่นั่งสอบ 
FROM
    customer c
LEFT JOIN
    location l ON l.RoundID = c.RoundID AND l.LocationID = c.LocationID
WHERE
    PayStatus = ''
    AND c.DateExp = '2024-01-26'
    AND c.RoundID IS NOT NULL 
    AND c.LocationID IS NOT NULL 
GROUP BY
    c.RoundID,
    c.LocationID;
ORDER BY l.ID ASC
		
		
		
		
		
SELECT
    sub1.DateExp AS 'เลือกสนามสอบและชำระเงินแล้ว',
    sub2.DateExp AS 'เลือกสนามสอบแต่ยังไม่ชำระเงินแล้ว',
    sub3.DateExp AS 'สมัครแต่ยังไม่เลือกสนามสอบ'
FROM 
(
    SELECT
        c.DateExp,
        c.RoundID,
        l.Round,
        c.LocationID,
        l.Location,
        COUNT(c.CustomerID) AS seatCount 
    FROM
        customer c
    LEFT JOIN
        location l ON l.RoundID = c.RoundID AND l.LocationID = c.LocationID
    WHERE
        -- PayStatus = '*' 
        c.DateExp = '2024-01-26'
        AND c.RoundID IS NOT NULL 
        AND c.LocationID IS NOT NULL 
    GROUP BY
        c.DateExp,
        c.RoundID,
        c.LocationID
) sub1
LEFT JOIN
(
   SELECT
        c.DateExp,
        c.RoundID,
        l.Round,
        c.LocationID,
        l.Location,
        COUNT(c.CustomerID) AS seatCount 
    FROM
        customer c
    LEFT JOIN
        location l ON l.RoundID = c.RoundID AND l.LocationID = c.LocationID
    WHERE
        PayStatus = '' ,
        c.DateExp = '2024-01-24'
        AND c.RoundID IS NOT NULL 
        AND c.LocationID IS NOT NULL 
    GROUP BY
        c.DateExp,
        c.RoundID,
        c.LocationID
) sub2 ON sub1.RoundID = sub2.RoundID AND sub1.LocationID = sub2.LocationID
LEFT JOIN
(
   SELECT
        c.DateExp,
        c.RoundID,
        l.Round,
        c.LocationID,
        l.Location,
        COUNT(c.CustomerID) AS seatCount 
    FROM
        customer c
    LEFT JOIN
        location l ON l.RoundID = c.RoundID AND l.LocationID = c.LocationID
    WHERE
        PayStatus = '*' ,
        c.DateExp = '2024-01-24'
        AND c.RoundID IS NOT NULL 
        AND c.LocationID IS NOT NULL 
    GROUP BY
        c.DateExp,
        c.RoundID,
        c.LocationID
) sub3 ON sub1.RoundID = sub3.RoundID AND sub1.LocationID = sub3.LocationID;


------------------------------------------------------------------------------------------------1


--เช็คที่นั่งสอบ
SELECT
	c.RoundID,
	l.Round,
	c.LocationID,
	l.Location,
	COUNT( c.ID ) AS seatCount ,
	l.SeatMax,
	l.SeatReal,
	CASE WHEN COUNT(c.CustomerID) >= l.SeatMax THEN "เต็ม" ELSE "ยังว่างอยู่" END AS Status
FROM
	customer c
	RIGHT JOIN location l ON l.RoundID = c.RoundID AND l.LocationID = c.LocationID
WHERE
	c.RoundID IS NOT NULL 
	AND c.LocationID IS NOT NULL 
	AND c.PayStatus = ''
GROUP BY
	c.RoundID,
	c.LocationID
ORDER BY l.ID ASC



SELECT COUNT(CustomerID) FROM customer WHERE (RoundID = "2" OR RoundID = 2) AND (LocationID = "8" OR LocationID = 8)
	
	

SELECT * FROM customer WHERE  RoundID = 4 AND LocationID = '9\r'



SELECT * FROM customer WHERE  RoundID = "2" AND LocationID = "8"

	

SELECT ID, Email, CreatedAt FROM customer WHERE PayStatus = "" AND CreatedAt BETWEEN '2024-01-21 00:30:00' AND '2024-01-21 11:00:00';
		
		

SELECT ID, TelMobile, CreatedAt FROM customer WHERE PayStatus = "" AND CreatedAt BETWEEN '2024-01-26 12:00:00' AND '2024-01-27 16:30:00';



SELECT COUNT( ID ) AS CountPay FROM customer WHERE PayStatus = ""
	


SELECT detail__customer_id AS CustomerID, COUNT( id ) AS RepeatPayment FROM transaction_log GROUP BY detail__order_id ORDER BY RepeatPayment DESC

------------------------------------------------------------------------------------------------2


SELECT
    sub1.เลือกสนามสอบและชำระเงินแล้ว,
    sub2.เลือกสนามสอบแต่ยังไม่ชำระเงินแล้ว,
    sub3.สมัครแต่ยังไม่เลือกสนามสอบ,
    sub4.จำนวนผู้สมัครทั้งหมด
FROM 
(
    SELECT
        COUNT(CustomerID) AS เลือกสนามสอบและชำระเงินแล้ว
    FROM
        customer
-- 				INNER JOIN teller ON teller.order_id = customer.RefNo1
    WHERE
        PayStatus = "" AND LocationID IS NOT NULL
) sub1,
(
    SELECT
        COUNT(CustomerID) AS เลือกสนามสอบแต่ยังไม่ชำระเงินแล้ว
    FROM
        customer
    WHERE
        PayStatus != "" AND LocationID IS NOT NULL AND RoundID IS NOT NULL
) sub2,
(
    SELECT
        COUNT(ID) AS สมัครแต่ยังไม่เลือกสนามสอบ
    FROM
        customer
    WHERE
        LocationID IS NULL
) sub3,
(
    SELECT
        COUNT(CustomerID) AS จำนวนผู้สมัครทั้งหมด
    FROM
        customer
) sub4;



------------------------------------------------------------------------------------------------3



--เช็คคืนที่นั่งสอบ
SELECT
	DateExp,
	RoundID,
	LocationID,
	COUNT( ID ) AS seatCount 
FROM
	customer 
WHERE
	PayStatus = '*' 
	AND DateExp = DATE (
	NOW()) 
	AND RoundID IS NOT NULL 
	AND LocationID IS NOT NULL 
GROUP BY
	RoundID,
	LocationID



------------------------------------------------------------------------------------------------4


SELECT *
FROM customer
WHERE PayStatus = '*'
  AND LocationID IS NULL
  AND CreatedAt BETWEEN '2024-01-21 00:30:00' AND '2024-01-21 01:30:00';
	
	
	
SELECT *
FROM customer
INNER JOIN teller ON teller.order_id = customer.RefNo1
WHERE customer.RoundID = "3" OR customer.RoundID = "6" AND customer.PayStatus =""



SELECT customer.CustomerID,customer.Email
FROM customer
INNER JOIN teller ON teller.order_id = customer.RefNo1
WHERE teller.transaction_date = '20240128' AND customer.PayStatus =""



SELECT  
customer.PayStatus,
customer.RefNo1,
customer.DateExp,
customer.UpdateSeat,
customer.RoundID,
customer.LocationID,
customer.CustomerID,
customer.Email,
teller.order_description

FROM customer 
INNER JOIN teller ON teller.order_id = customer.RefNo1
WHERE customer.PayStatus = "" 
GROUP BY teller.order_id



SELECT  
customer.PayStatus,
customer.RefNo1,
customer.DateExp,
customer.UpdateSeat,
customer.RoundID,
customer.LocationID,
customer.CustomerID,
customer.Email,
teller.order_description
FROM teller 
INNER JOIN customer ON customer.RefNo1 = teller.order_id
WHERE customer.PayStatus = "" 
GROUP BY customer.CustomerID



SELECT COUNT( ID ) AS เลือกสนามสอบแต่ยังไม่ชำระเงินแล้ว FROM customer WHERE PayStatus = "*" AND LocationID IS NOT NULL
	


SELECT COUNT( ID ) AS เลือกสนามสอบและชำระเงินแล้ว FROM customer WHERE PayStatus = "" AND LocationID IS NOT NULL
	


SELECT COUNT( ID ) AS CountRegister FROM customer WHERE LocationID IS NOT NULL
	


SELECT COUNT( ID ) AS สมัครแต่ยังไม่เลือกสนามสอบ FROM customer WHERE LocationID IS NULL
	


SELECT COUNT( ID ) AS จำนวนผู้สมัครทั้งหมด FROM customer
	



SELECT
    sub2.เลือกสนามสอบและชำระเงินแล้ว,
    sub1.เลือกสนามสอบแต่ยังไม่ชำระเงินแล้ว,
    sub3.สมัครแต่ยังไม่เลือกสนามสอบ,
    sub4.จำนวนผู้สมัครทั้งหมด
FROM (
    SELECT
        COUNT(ID) AS เลือกสนามสอบแต่ยังไม่ชำระเงินแล้ว
    FROM
        customer
    WHERE
        PayStatus = "*" AND LocationID IS NOT NULL
) sub1,
(
    SELECT
        COUNT(ID) AS เลือกสนามสอบและชำระเงินแล้ว
    FROM
        customer
    WHERE
        PayStatus = "" AND LocationID IS NOT NULL
) sub2,
(
    SELECT
        COUNT(ID) AS สมัครแต่ยังไม่เลือกสนามสอบ
    FROM
        customer
    WHERE
        LocationID IS NULL
) sub3,
(
    SELECT
        COUNT(ID) AS จำนวนผู้สมัครทั้งหมด
    FROM
        customer
) sub4;



------------------------------------------------------------------------------------------------5


SELECT 
customer.* ,
(SELECT teller.order_id FROM teller WHERE teller.order_id = customer.RefNo1 ORDER BY teller.transaction_date DESC, transaction_time DESC LIMIT 1 ) AS order_id,

(SELECT teller.transaction_date FROM teller WHERE teller.order_id = customer.RefNo1 ORDER BY teller.transaction_date DESC, transaction_time DESC LIMIT 1 ) AS transaction_date,

(SELECT teller.transaction_time FROM teller WHERE teller.order_id = customer.RefNo1 ORDER BY teller.transaction_date DESC, transaction_time DESC LIMIT 1 ) AS transaction_time

FROM customer
WHERE customer.PayStatus = ''



------------------------------------------------------------------------------------------------6


SELECT *
FROM teller
GROUP BY order_id
HAVING COUNT(order_id) > 1;
ORDER BY transaction_date DESC




SELECT customer.*, teller.*
FROM customer
INNER JOIN teller ON teller.order_id = customer.RefNo1
WHERE teller.order_id IN (
  '10121011159900367801',
  '10121011340500295421',
  '10121011349901164198',
  '10121011401400082549',
  '10121011459900887292',
  '10121011468300006928',
  '10121011469900591911',
  '10121011481000134819',
  '10121011499900377880',
  '10121011600101938228',
  '10121011729900610221',
  '10121012141400030116',
  '10121021319900829803',
  '10121021549900613485',
  '10121021910501189238',
  '10121031478800014504',
  '10121031609200005104',
  '10121031720900248469',
  '10121041320700133271',
  '10121051301700191182',
  '10121051479900514101',
  '10121111420901373588',
  '10121141407800011121'
);
ORDER BY teller.transaction_date DESC
ORDER BY teller.transaction_date and transaction_time AND customer.CustomerID DESC




SELECT customer.*, teller.*
FROM customer
INNER JOIN teller ON teller.order_id = customer.RefNo1
GROUP BY teller.order_id
HAVING COUNT(teller.order_id) > 1
ORDER BY teller.transaction_date DESC;

------------------------------------------------------------------------------------------------7

SELECT 
 customer.ID,
 customer.PayStatus,
 customer.RefNo1,
 customer.TypeRegis,
 customer.RoundID,
 location_app.Round,
 customer.LocationID,
 location_app.LocationAppID,
 location_app.Location,
 customer.CustomerID,
 customer.Name1,
 customer.Name2,
 customer.Name3,
 customer.Gender,
 customer.Name1EN,
 customer.Name2EN,
 customer.NameMidEN,
 customer.Name3EN,
 customer.BirthDMY,
 customer.Degree,
 customer.Major,
 customer.University,
 customer.Address,
 customer.Building,
 customer.Moo,
 customer.Soi,
 customer.Road,
 customer.District,
 customer.Amphur,
 customer.Province,
 customer.Zipcode,
 customer.Telephone,
 customer.TelMobile,
 customer.Email,
 customer.SpecialNeeds,
 customer.NationalityID,
 customer.Nationality,
 customer.StatusStudy,
 customer.Grade,
 customer.FileImg,
 teller.*
FROM customer
INNER JOIN teller ON teller.order_id = customer.RefNo1
INNER JOIN location_app ON location_app.RoundID = customer.RoundID AND location_app.LocationID = customer.LocationID
GROUP BY teller.order_id
ORDER BY teller.transaction_date AND teller.transaction_time DESC;