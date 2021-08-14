import db from '../models/index'

let homePage = async (req,res)=> {
    try {
        let data = await db.User.findAll();
        res.render('home', {
            data:JSON.stringify(data),
        })
    } catch (error) {
        console.log(error);
    }

}

let aboutPage = (req,res)=> {
    res.render('./test/about')
}





module.exports = {
    homePage:homePage,
    aboutPage:aboutPage
}
