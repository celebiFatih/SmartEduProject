module.exports = (roles) => { //önce rolun ne olduguna bakıyoruz role'u parametre olarak aldık. buraya courseRoute.js den admin ve öğretmen parametresini gondererek kontrolunu sağlıyoruz
    return (req,res,next) => {
        const userRole = req.body.role; // req.body.role: form alanındaki select'e verdiğimiz name özelliğindeki role
        if(roles.includes(userRole)) { // teacher ya da admin içeriyorsa işleme devam
            next();
        }else { // kullanıcı rolu student'sa yapamaz
            return res.status(401).send('U CANT DO IT')
        }
    }
}