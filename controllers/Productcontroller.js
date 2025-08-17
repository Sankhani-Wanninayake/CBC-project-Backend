import Product from "../models/product.js";

export async function getProduct(req, res) {
  // Fetch all products from the database
   const productList = await Product.find();
   res.json({
      list: productList

    })

    
  }

export function createProduct(req,res){

  console.log(req.user)

  const product = new Product (req,res)


  product.save().then(()=>{

    res.json({
    
      message:"Product Created"
    })

    }).catch (()=>{
      res.json({
        message:"Product not created"
      })
    })
  }

export function getProductByname(req,res){

  const name = req.params.name;

  Product.find({name:name}).then(
    (productList)=>{
    
      if(productList.length==0){

        res.jason({
          message:"product not found"
        })
      }else{
        res.json({
          list : productList
      })
      }
    }

  ).catch(
    ()=>{
      res.json({
        message: "Error"
      })
    }
  )
}

   export function deleteProduct(req,res){

    Product.deleteOne({name:req.params.name}).then(
      ()=>{
        res.json({
          message:"product delete successfully"
        })
      }
    ).catch(
      ()=>
        res.json({
          message:"product not delete successfully"
        })
    )
   }