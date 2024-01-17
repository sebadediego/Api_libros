const errorHeader = (err, req, res, next) => {
    console.log(err);
  
    res.status(err.status || 500);
    res.json({
      status: err.status,
      error: err.message || "Error en el Servidor",
    });
  };
  
  module.exports = errorHeader;
  