 /* jshint esversion: 8 */
 let verificaToken = (req, res, next) => {
    let token = req.get('token');

    console.log('entre al midd pero no te diste cuenta');
    next();
};
module.exports = {
    verificaToken
};

      /*    return res.status(200).json({
           token
       }); */