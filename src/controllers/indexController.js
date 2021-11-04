//  chamada em /routes/index
module.exports.index = function (req, res) {
  res.render('welcome');
};
module.exports.GETdashboard = (req, res) => {
  res.render('dashboard');
}
