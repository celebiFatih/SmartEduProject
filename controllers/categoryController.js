// burada kategori olusutrma ekleme ve silme işlemlerini gerçekleştireceğiz.
// ancak bizim hala bir kategori olusturma ön sayfamız yok. bunun için denememiz gerektiğinde postman den faydalanacağız

const Category = require('../models/Category'); // kurs olusturmak için model dosyamızı çağırıyoruz

// Create Course
exports.createCategory = async (req, res) => {
  //kurs olusturma sayfası henuz hazır olmadığı için burada once onun simulasyonunu yapacağız
  // aldığımız cevap. henuz template'e render etmiyoruz. onun yerine json dosyası olarak yazdıyoruz
  try {
    const category = await Category.create(req.body); // req.body kursu doldurmak için gerekli olan formdan gelecek bilgiler
    res.status(201).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// DELETE USER
exports.deleteCategory = async (req, res) => {
  try {
    // const user = 
    await Category.findByIdAndRemove(req.params.id);
    
    // req.flash("error", `${user.name} user has been removed successfully`);
    
    // cevap
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};