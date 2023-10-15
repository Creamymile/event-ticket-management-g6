import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import "../assets/styles/ProductDetail.css";
import { getCartData } from "../redux/actions/cart";

import {
  Button,
  Textarea,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Divider,
  Alert,
  AlertIcon,
  ChakraProvider,
  CSSReset,
  ColorModeScript,
} from "@chakra-ui/react";

function ProductDetail(props) {
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const [productNotFound, setProductNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const fetchProductData = () => {
    Axios.get(`${API_URL}/products/${productId}`)
      .then((result) => {
        if (result.data) {
          setProductData(result.data);
        } else {
          setProductNotFound(true);
        }
      })
      .catch(() => {
        alert("Error fetching product data");
      });
  };

  const qtyBtnHandler = (action) => {
    if (action === "increment") {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    // Check apakah user sudah memiliki barang tsb di cart
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: props.userGlobal.id,
        productId: productData.id,
      },
    }).then((result) => {
      if (result.data.length) {
        Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + quantity,
        })
          .then(() => {
            props.getCartData(props.userGlobal.id);
            setTimeout(() => {
              setShowSuccessAlert(false);
            }, 2000);
          })
          .catch(() => {
            alert("Terjadi kesalahan di server");
          });
      } else {
        Axios.post(`${API_URL}/carts`, {
          userId: props.userGlobal.id,
          productId: productData.id,
          price: productData.price,
          productName: productData.productName,
          productImage: productData.productImage,
          quantity: quantity,
        })
          .then(() => {
            alert("Berhasil menambahkan barang");
            props.getCartData(props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi kesalahan di server");
          });
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  //   useEffect(() => {
  //     document.body.style.backgroundColor = "lightgrey";

  //     return () => {
  //       document.body.style.backgroundColor = "";
  //     };
  //   }, []);

  return (
    <div className="container">
      {productNotFound ? (
        <div className="alert alert-warning mt-3">
          {" "}
          Product with ID {productId} has not been found{" "}
        </div>
      ) : (
        <div className="row mt-3">
          <div className="col-6">
            <img
              style={{ width: "100%" }}
              src={productData.productImage}
              alt=""
            />
          </div>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            className="col-6 d-flex flex-column justify-content-center"
            bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
          >
            <Box
              display="contents"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Card marginTop="10">
                <CardHeader>
                  <Heading size="lg">Overview</Heading>
                  <Divider />
                </CardHeader>

                <CardBody>
                  <Box>
                    <Text>
                      For more product information and details you can directly
                      send a message with any platform social media. Thank you
                      for trusting us and using our newest application.
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            </Box>
            <h2>{productData.productName}</h2>
            <h5>Rp {productData.price}</h5>
            <h5>{productData.description}</h5>
            <div>
              <Box className="d-flex flex-row align-items-center justify-content-center">
                <Button
                  onClick={() => qtyBtnHandler("decrement")}
                  className="btn btn-primary mr-4"
                  style={{ marginLeft: 20 }}
                  colorScheme={"blue"}
                >
                  -
                </Button>

                <div style={{ marginLeft: 20 }}>{quantity}</div>
                <Button
                  colorScheme="blue"
                  onClick={() => qtyBtnHandler("increment")}
                  className="btn btn-primary mx-4"
                >
                  +
                </Button>
              </Box>
              <Box style={{ marginTop: 30 }}>
                <Button
                  size={"lg"}
                  colorScheme="green"
                  onClick={() => {
                    addToCartHandler();
                    setShowSuccessAlert(true);
                  }}
                >
                  Add to cart
                </Button>
              </Box>
              {showSuccessAlert && (
                <Alert status="success">
                  <AlertIcon />
                  Your Product has been added to cart.
                </Alert>
              )}
            </div>
            <div style={{ marginTop: 5 }}>
              <Textarea placeholder="Write your comment here ..." />
              <Button size={"lg"} marginTop="15" colorScheme="blue">
                Add comment
              </Button>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
