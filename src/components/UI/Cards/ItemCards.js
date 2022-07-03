import React from "react";
import { Card, Button } from "react-bootstrap";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions";
import { useState, useEffect } from "react";
import "./style.css";

function ItemCards(props) {
  const { item, setCurrentProduct, setShowProductViewModal, setShowToast } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart.updatingCart) {
      setIsLoading(true);
    }
    if (!cart.updatingCart) {
      setIsLoading(false);
    }
  }, [cart.updatingCart]);

  const handleAddProductToCart = () => {
    dispatch(
      addToCart(
        {
          _id: item._id,
          name: item.name,
          category: item.category,
          price: item.price,
          quantity: item.quantity,
          productPictures: item.productPictures,
        },
        1
      )
    ).then((res) => {
      console.log(res);
      setShowToast(true);
    });
  };

  return (
    <Card>
      <Link to={`/product/${item.category.slug}/${item._id}/`}>
        <Card.Img
          variant="top"
          src={generatePublicUrl(item.productPictures[0].img)}
        />
      </Link>

      <div className="btn-quickView-container">
        <Button
          size="sm"
          className="btn-quickView shadow-none"
          onClick={(event) => {
            event.stopPropagation();
            setCurrentProduct(item);
            setShowProductViewModal(true);
          }}
        >
          View
        </Button>
      </div>

      <Card.Body style={{ textAlign: "center" }}>
        <Card.Text className="carditem-categoryname">
          {item.category.slug}
        </Card.Text>
        <Card.Title as="h6">
          <Link className="itemcard-link" to={`/${item.slug}/${item._id}/`}>
            <strong>{item.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text className="itemcard-price">
          {" "}
          <del>RS:000</del> <strong>RS:{item.price}</strong>
        </Card.Text>
      </Card.Body>

      <Card.Footer>
        <Button
          className="btn-addToCart"
          size="sm"
          onClick={(e) => {
            handleAddProductToCart();
          }}
          disabled={isLoading}
        >
          add to cart
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ItemCards;
