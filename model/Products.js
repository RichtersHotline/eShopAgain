import { connection as db } from "../config/Config.js";

class products {
  fetchProducts(req, res) {
    try {
      const strQry = `
        select productID, prodName, Category, prodDescription, prodURL, amount
        from Products;
    
        
        
        `;
      db.query(strQry, (err, results) => {
        // `Unable to get users`

        if (err) throw new Error("Products couldn't be retrieved");
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        Msg: e.message,
      });
    }
  }
  RecentProducts(req, res) {
    try {
      const strQry = `
        select productID, prodName, Category, prodDescription, prodURL, amount
        from Products
        order by productID desc
        limit 5;
        
        
        `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(err);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        Msg: e.message,
      });
    }
  }

  fetchSingleProduct(req, res) {
    try {
      const strQry = `
        select productID, prodName, Category, prodDescription, prodURL, amount
        from Products
        where productID = ${req.params.id}; 
        
        
        `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(err);
        res.json({
          status: res.statusCode,
          results: results[0],
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        Msg: e.message,
      });
    }
  }

  async addProduct(req, res) {
    try {
      let data = req.body;

      let Product = {
        prodURL: data.prodURL,
        amount: data.amountwd,
      };
      const strQry = `
     insert into Products
     SET ?;
    
    `;
      db.query(strQry, [req.body], (err) => {
        if (err) {
          res.json({
            status: res.statusCode,
            msg: err.message,
          });
        } else {
          res.json({
            status: res.statusCode,
            msg: "Product has successfully been added",
          });
        }
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const strQry = `
        
        update Products
        set ?
        where productID = ${req.params.id};
        
        
        `;
      db.query(strQry, [req.body], (err) => {
        if (err)
          throw new Error("unable to update product. Contact site Admin");
        res.json({
          status: res.statusCode,
          msg: "product record, Updated.",
        });
      });
    } catch (e) {
      res.json({
        status: 400,
        msg: e.message,
      });
    }
  }
  deleteProduct(req, res) {
    try {
      const strQry = ` 
    delete from Products
    where ProductID = ${req.params.id};
    
    `;
      db.query(strQry, (err) => {
        if (err)
          throw new Error(
            "Cannot delete Product, contact Site Admin if problem persists"
          );
        res.json({
          status: res.statusCode,
          msg: "Product's info was sucessfully removed.",
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }
}

export { products };
