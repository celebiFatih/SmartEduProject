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

    req.flash("success", `${course.name} course has been created successfully`);//başarılı oldugunda flash mesajı
    res.status(201).redirect('/courses'); // yeni olusturma için 201 kodu
  } catch (error) {
    req.flash("error", `Something happened!`);//başarılı oldugunda flash mesajı
    res.status(400).redirect('/courses');
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
    
    // search
    const query = req.query.search; // search: courses.ejs -> form input name=search
    if (query) { // searh alanına bir şey yazılmıssa
      filter = {name: query} // örn: search alanına java yazdığında query java olacak burada da ilgili kursun isminde arayacak
    }

    if(!query && !categorySlug){
      filter.name = "";
      filter.category = null;
    }

    const courses = await Course.find({
      $or:[
        {name: {$regex: '.*'+ filter.name + '.*', $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-createdAt').populate('user'); // tüm kursları kategorisine göre alsın // öğretmen isimlerini coures.ejs'de çekebilmek için populate ettik
    
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
    const user = await User.findById(req.session.userID); // giriş yapan kullanıcıyı yakalıyoruz
    const course = await Course.findOne({ slug: req.params.slug }).populate('user'); //slug'ına göre bul // user'ı populate ederek kursun user ilişkisinden faydalanarak single course sayfasında user bilgisine erişebiliriz
    //bir modelden referans olan diğer modele populate ederek erişebiliyoruz
    const categories = await Category.find();
    
    // cevap
    res.status(200).render('course', {
      // course template' i içinde render et
      course, // kurs bilgilerini gonderdik
      page_name: 'courses',
      user, // kullanıcı bilgilerini gonderdik
      categories
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

// User'ın kurslar alanından kurs çıkarma
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id: req.body.course_id});
    await user.save(); 
    // cevap
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({slug:req.params.slug}); // kursun slug parametresinin requestten gelen parametreye esşit oldugu zaman sil
    req.flash("error", `${course.name} course has been removed successfully`);
    
    // cevap
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};