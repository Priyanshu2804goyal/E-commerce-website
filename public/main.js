function deleteproduct(id){
   const result=confirm('are you sure you want to delete this product');
   if(result){
      fetch('/delete-product/'+id,{
        method:'post',
      }).then((res)=>{
        if(res.ok){
            location.reload();
        }
      })
   }
}