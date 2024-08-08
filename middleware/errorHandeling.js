function errHandling(err, req, res, next) {
 if (err || res.statusCode >= 400) {
  res.json (

    {
        status:err.status ||
        res.statusCode || 500,
        err: "An error has occured please contact the Site Director"
    }
  )
}
next()



}
export {

errHandling

}
