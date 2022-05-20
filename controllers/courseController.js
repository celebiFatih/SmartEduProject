// burada yapacağımız ilk işlem yeni bir kurs olusturmak için gerekli fonksiyonu yaz
const Course = require('../models/Course'); // kurs olusturmak için model dosyamızı çağırıyoruz
const Category = require('../models/Category'); // courses sayfasına aynı zamanda kategorileri de gondememiz gerek
const User = require('../models/User');

// CREATE  COURSE
exports.createCourse = async (req, res) => {
  //kurs olusturma sayfası henuz hazır olmadığı için burada once onun simulasyonunu yapacağız
  // aldığımız cevap. henuz template'e render etmiyoruz. onun yerine json dosyası olarak yazdıyoruz
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    }); // gelen kullanıcı bilgilerinden kursu olusturanın hangi öğretmen oldugunu yakalamak için sessiondaki userID den alıyoruz

    res.status(201).redirect('/courses'); // yeni olusturma için 201 kodu
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
/* bu işlemi soyle dusunmeliyiz: biz backend'de calısıypruz ve frontend henuz hazır değil. ancak backendde yaparkende
    bizde bir şekilde yeni bir kurs olusturma isteği gelmiş giib davranmamız lazım. bunun için postman yazılımından faydalanacağız.
*/

// Kursları Sıralama
exports.getAllCourses = async (req, res) => {
  try {
    // kursları kategorilerine gore filtreleyip sıralama
    const categorySlug = req.query.categories; //parametreden gelen kategoriyi bulduk. //http://localhost:3000/courses?categories=programming
    const category = await Category.findOne({ slug: categorySlug }); // await olmasını beklemeden aşağı inmesin kod
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt'); // tüm kursları kategorisine göre alsın
    const categories = await Category.find(); // tüm kategorileri alsın

    // cevap
    res.status(200).render('courses', {
      // '/courses' i render et
      courses,
      categories,
      page_name: 'courses', //courses linkinin aktif olmasını sağlayacak
    }); // yeni olusturma için 201 kodu
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// Tekil Kursu Getirme
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate('user'); //slug'ına göre bul // user'ı populate ederek kursun user ilişkisinden faydalanarak single course sayfasında user bilgisine erişebiliriz
    //bir modelden referans olan diğer modele populate ederek erişebiliyoruz
    
    // cevap
    res.status(200).render('course', {
      // course template' i içinde render et
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// User'ın kurslar alanına yeni kurs ekleme
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);// hangi kullanıcı olduğu
    await user.courses.push({_id: req.body.course_id}); // id'si body'den gelen(formdan) kurs id ile eşit olan kursu kullanıcıya ekle
    await user.save(); // buralarda await i kullanmamızın sebebi işlemlerin sıralı olasını sağlamak. önce ilgili user'ı bulsun ardından kurslar bolumuıne yeni kursu eklesin ve kaydetsin
    // cevap
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
