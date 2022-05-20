const nodemailer = require("nodemailer");

// '/index' template'ini render et'
exports.getIndexPage = (req, res) => { 
  console.log(req.session.userID); // her index sayfasına geldiğimizde hangi kullanıcı sessionda ise onu yazdırsın
  res.status(200).render('index', {
    page_name: 'index', //template engine page_name isimli değişken gonderiyoruz. sayfa aktif olanı gosterilmesinde kullanamk için
  });
};

// '/about' template'ini render et'
exports.getAboutPage = (req, res) => { 
  res.status(200).render('about', {
    page_name: 'about',
  });
};

// '/register' template'ini render et'
exports.getRegisterPage = (req, res) => { 
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => { 
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => { 
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => { 
  
  const outputMessage = `
  <h1>Message Details</h1>
  <ul>,
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>    
  `
  // npm node mailer
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "fatihcelebi13@gmail.com", // gmail account
      pass: "sfljgmywcocjrhuf", // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart EDU Contact Form" <fatihcelebi13@gmail.com>', // sender address
    to: "fatihcelebi13@icloud.com", // list of receivers
    subject: "Smart EDU Contact Form New Message", // Subject line
    text: "Hello world?", // plain text body
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.status(200).redirect('contact')
};