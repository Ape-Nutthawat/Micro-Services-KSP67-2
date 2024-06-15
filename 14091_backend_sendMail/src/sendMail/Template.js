export const Template =  () => {
    return `<!doctype html>
    <html>
    
    <head>
      <meta
        name="viewport"
        content="width=device-width"
      />
      <meta
        http-equiv="Content-Type"
        content="text/html; charset=UTF-8"
      />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      >
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      >
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit&display=swap"
        rel="stylesheet"
      >
      <style>
        /* -------------------------------------
                GLOBAL RESETS
            ------------------------------------- */
    
        /*All the styling goes here*/
        font {
          color: #000000 !important;
        }
    
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          width: 15%;
          height: auto;
        }
    
        body {
          background-color: #e0e0e0;
          color: #000000 !important;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
    
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }
    
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top;
        }
    
        /* -------------------------------------
                BODY & CONTAINER
            ------------------------------------- */
    
        .body {
          background-color: #f6f6f6;
          width: 100%;
          color: #000000 !important;
        }
    
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px;
        }
    
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px;
        }
    
        /* -------------------------------------
                HEADER, FOOTER, MAIN
            ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%;
        }
    
        .wrapper {
          box-sizing: border-box;
          padding: 20px;
          font-family: 'Kanit', sans-serif;
        }
    
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
    
        .footer {
          clear: both;
          margin-top: 10px;
          text-align: center;
          width: 100%;
        }
    
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #999999;
          font-size: 12px;
          text-align: center;
        }
    
        /* -------------------------------------
                TYPOGRAPHY
            ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: 'Kanit', sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          margin-bottom: 30px;
        }
    
        h1 {
          font-size: 35px;
          font-weight: 300;
          text-align: center;
          text-transform: capitalize;
          font-family: 'Kanit', sans-serif;
        }
    
        p,
        ul,
        ol {
          font-family: 'Kanit', sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 20px;
        }
    
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px;
        }
    
        a {
          color: #3498db;
          text-decoration: underline;
        }
    
        /* -------------------------------------
                BUTTONS
            ------------------------------------- */
    
        .btn-login {
          /* font-family: 'Kanit', sans-serif;
              background-color:#3357dd;
                color: #fff;
                text-decoration: none;
                display : block;
                padding : 10px 0;
                width : 200px;
                margin-left : 50%;
                transform: translate(-50%);
                transition: .3s all;
                margin-top : 30px;
                border-radius: 5px; */
    
          font-family: 'Kanit', sans-serif;
          background-color: #3498db;
          border: solid 1px #ffffff;
          border-radius: 5px;
          box-sizing: border-box;
          color: #ffffff;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 100px;
          text-decoration: none;
          text-transform: capitalize;
        }
    
        .btn-login:hover {
          background-color: #5eb0e7;
          color: #ffffff;
        }
    
        .btn {
          box-sizing: border-box;
          width: 100%;
        }
    
        .btn>tbody>tr>td {
          padding-bottom: 15px;
        }
    
        .btn table {
          width: auto;
        }
    
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center;
        }
    
        .btn a {
          background-color: #ffffff;
          border: solid 1px #3498db;
          border-radius: 5px;
          box-sizing: border-box;
          color: #3498db;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize;
        }
    
        .btn-primary table td {
          background-color: #3498db;
        }
    
        .btn-primary a {
          background-color: #3498db;
          border-color: #3498db;
          color: #ffffff;
        }
    
        /* -------------------------------------
                OTHER STYLES THAT MIGHT BE USEFUL
            ------------------------------------- */
        .last {
          margin-bottom: 0;
        }
    
        .first {
          margin-top: 0;
        }
    
        .align-center {
          text-align: center;
    
        }
    
        .align-right {
          text-align: right;
        }
    
        .align-left {
          text-align: left;
        }
    
        .clear {
          clear: both;
        }
    
        .mt0 {
          margin-top: 0;
        }
    
        .mb0 {
          margin-bottom: 0;
        }
    
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0;
        }
    
        .powered-by a {
          text-decoration: none;
        }
    
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          margin: 20px 0;
        }
    
        /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
    
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important;
          }
    
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important;
          }
    
          table[class=body] .content {
            padding: 0 !important;
          }
    
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
    
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
    
          table[class=body] .btn table {
            width: 100% !important;
          }
    
          table[class=body] .btn a {
            width: 100% !important;
          }
    
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
    
        /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%;
          }
    
          .im {
            color: #000000 !important;
          }
    
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
    
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
    
          .btn-primary table td:hover {
            background-color: #34495e !important;
          }
    
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important;
          }
        }
      </style>
    </head>
    
    <body>
      <div style="background-color:#f9f9f9;padding-bottom: 40px;">
    
        <div
          style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;"
        >
    
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background:#f9f9f9;background-color:#f9f9f9;width:100%;"
          >
            <tbody>
              <tr>
                <td
                  style="border-bottom: #31a922 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"
                >
                </td>
              </tr>
            </tbody>
          </table>
    
        </div>
        <div
          style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;"
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background:#fff;background-color:#fff;width:100%;"
          >
            <tbody>
              <tr>
    
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;"
                >
    
                  <!-- START CENTERED WHITE CONTAINER -->
                  <table
                    role="presentation"
                    class="main"
                  >
    
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tr>
                            <td>
                              <div class="align-center">
                                <center> <img
                                    height="auto"
                                    src="https://www.pngmart.com/files/16/Green-Check-Mark-PNG-Pic.png"
                                    style="border:0;display:block;outline:none;text-decoration:none;width:12%;"
                                    width="50px"
                                  /></center>
                                <br />
                                <!-- <h2 style="color : #31a922;"></h2> -->
                                <h3>
                                  <br>สำนักงานเลขาธิการคุรุสภาได้รับข้อมูลการกรอกใบสมัครสอบวิชาครู
                                  <br>ครั้งที่ 2/2567 ของท่านแล้ว</br></h3>  
                              </div>
                              <p style="text-indent: 24px">
                                ให้ท่านดำเนินการ เลือกรอบ สถานที่ และ
                                <b style="color: red;">ชำระเงินให้แล้วเสร็จก่อนเวลา 08.00 น. ของวันถัดไป<br>หลังจากเลือกรอบและสถานที่</b>
                                หากไม่ชำระเงินภายในเวลาที่กำหนด รอบและสถานที่ที่ท่านเลือกจะถูกยกเลิก ให้ท่านดำเนินการเลือกรอบและสถานที่ใหม่ที่ยังมีที่ว่างโดยไม่ต้องกรอกใบสมัครใหม่ โดยเข้าไปที่เมนู
                                <b style="color: red;">ตรวจสอบสถานะการสมัครสอบ</b>
                                และดำเนินการตามขั้นตอนเพื่อชำระเงินอีกครั้ง และ
                                <b style="color: red;">เมื่อชำระเงินเรียบร้อยแล้ว จะไม่สามารถแก้ไขรอบและสถานที่สอบได้</b>
                              </p>
                              <b>หมายเหตุ : QR Code มีอายุ 30 นาที โดยเป็นเงื่อนไขของธนาคาร ถ้าหมดระยะเวลาดังกล่าวผู้สมัครสามารถสร้าง QR Code ใหม่ เพื่อชำระเงินได้</b>
                              <br />
                              <br />
                              <div class="align-left">
                                <p style="color: #0277BD;">ตัวอย่างการล็อกที่นั่งเพื่อชำระเงิน</p>
                                <p style="color: #0277BD;">กรณี เลือกรอบ และสถานที่ ในวันที่ 28 มิถุนายน 2567 เวลา 23.00 น. ที่นั่งจะถูกล็อกให้ท่านชำระเงินจนถึงวันที่ 29 มิถุนายน 2567 เวลา 07.59 น.</p>
                                <p style="color: #0277BD;">กรณี เลือกรอบ และสถานที่ ในวันที่ 29 มิถุนายน 2567 เวลา 03.00 น. ที่นั่งจะถูกล็อกให้ท่านชำระเงินจนถึงวันที่ 30 มิถุนายน 2567 เวลา 07.59 น.</p>
                              </div>
                            </td>
                          </tr>
                          
                        </table>
    
    
                      </td>
                    </tr>
                  </table>
                </div>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
        </div>
    
      </div>
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="body"
      >
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
              <!-- START FOOTER -->
              <div class="footer">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td class="content-block">
                      <span
                        class="apple-link">อีเมลฉบับนี้เป็นการแจ้งข้อมูลจากระบบอัตโนมัติ
                        กรุณาอย่าตอบกลับอีเมลนี้ </span>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
    
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
      <td>&nbsp;</td>
    
      <script>
        const date = new Date("2022-08-19 10:52:58")
    
        const result = date.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
    
        })
        const resultTime = date.toLocaleTimeString('th-TH', {
          hour: 'numeric',
          minute: 'numeric',
    
        })
        // console.log(result);
        document.getElementById("result").innerHTML = result;
        document.getElementById("resultTime").innerHTML = resultTime;
      </script>
    </body>
    
    </html>
    
    `
}