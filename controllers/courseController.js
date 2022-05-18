// burada yapacağımız ilk işlem yeni bir kurs olusturmak için gerekli fonksiyonu yaz
const Course = require('../models/Course'); // kurs olusturmak için model dosyamızı çağırıyoruz

// Create Course
exports.createCourse = async (req, res) => {
  //kurs olusturma sayfası henuz hazır olmadığı için burada once onun simulasyonunu yapacağız
  
  // aldığımız cevap. henuz template'e render etmiyoruz. onun yerine json dosyası olarak yazdıyoruz  
  try {
    const course = await Course.create(req.body); // req.body kursu doldurmak için gerekli olan formdan gelecek bilgiler
    res.status(201).json({
      status: 'success',
      course,
    }); // yeni olusturma için 201 kodu
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