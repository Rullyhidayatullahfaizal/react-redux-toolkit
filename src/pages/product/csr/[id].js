import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DetailProduct from "../[id]";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; 

  const [product, setProduct] = useState(null);

  const dispatch = useDispatch()


  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_API}/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>; 
  }

  const onInsertToCart = () => {
    
    dispatch(addToCart(product))
    
  };

  return (
    <DetailProduct
      image={product.image}
      title={product.title}
      description={product.description}
      price={product.price}
      availability={product.availability}
      onClickCart={onInsertToCart}
    />
  );
};

export default ProductDetailPage;
