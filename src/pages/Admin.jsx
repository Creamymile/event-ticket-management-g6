import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import "../assets/styles/admin.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  FormLabel,
  Input,
  FormControl,
  Select,
  Box,
  Card,
  CardBody,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { CardHeader } from "reactstrap";

class Admin extends Component {
  state = {
    productList: [],
    addProductName: "",
    addPrice: 0,
    addProductImage: "",
    addDescription: "",
    addCategory: "",

    editId: 0,

    editProductName: "",
    editPrice: 0,
    editProductImage: "",
    editDescription: "",
    editCategory: "",
    isOpen: false,
    isAlertDialogOpen: false,
    deleteProductId: null,
    isAddEventDialogOpen: false,
    isAlertVisible: false,
    alertMessage: "",
  };

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({ productList: result.data });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  editToggle = (editData) => {
    this.setState({
      editId: editData.id,
      editProductName: editData.productName,
      editPrice: editData.price,
      editProductImage: editData.productImage,
      editDescription: editData.description,
      editCategory: editData.category,
    });
  };

  cancelEdit = () => {
    alert("Cancel editing ?");
    this.setState({ editId: 0 });
  };

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/products/${this.state.editId}`, {
      productName: this.state.editProductName,
      price: parseInt(this.state.editPrice),
      productImage: this.state.editProductImage,
      description: this.state.editDescription,
      category: this.state.editCategory,
    })
      .then(() => {
        this.fetchProducts();

        this.setState({ editId: 0 });
        alert("Product saved.");
      })
      .catch(() => {
        alert("Terjadi kesalahan");
      });
  };

  openDialog = (deleteId) => {
    this.setState({ isAlertDialogOpen: true, deleteProductId: deleteId });
  };

  closeDialog = () => {
    this.setState({ isAlertDialogOpen: false, deleteProductId: null });
  };

  confirmDelete = () => {
    const { deleteProductId } = this.state;
    if (deleteProductId) {
      Axios.delete(`${API_URL}/products/${deleteProductId}`)
        .then(() => {
          this.fetchProducts();
          this.closeDialog();
        })
        .catch(() => {
          // alert("Terjadi kesalahan diserver");
          this.closeDialog();
        });
    }
  };

  // deleteBtnHandler = (deleteId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want delete this event?"
  //   );
  //   if (confirmDelete) {
  //     Axios.delete(`${API_URL}/products/${deleteId}`)
  //       .then(() => {
  //         this.fetchProducts();
  //       })
  //       .catch(() => {
  //         alert("Terjadi kesalahan di server!");
  //       });
  //   } else {
  //     alert("Cancel delete barang");
  //   }
  // };

  renderProducts = () => {
    return this.state.productList.map((val) => {
      if (val.id === this.state.editId) {
        return (
          <Tr>
            <Td>{val.id}</Td>
            <Td>
              {" "}
              <Input
                placeholder="Product name"
                value={this.state.editProductName}
                onChange={this.inputHandler}
                type="text"
                className="form-conTrol"
                name="editProductName"
              />{" "}
            </Td>
            <Td>
              {" "}
              <Input
                placeholder="Price"
                value={this.state.editPrice}
                onChange={this.inputHandler}
                type="number"
                className="form-conTrol"
                name="editPrice"
              />{" "}
            </Td>
            <Td>
              {" "}
              <Input
                placeholder="Image"
                value={this.state.editProductImage}
                onChange={this.inputHandler}
                type="text"
                className="form-conTrol"
                name="editProductImage"
              />{" "}
            </Td>
            <Td>
              {" "}
              <Input
                placeholder="Description"
                value={this.state.editDescription}
                onChange={this.inputHandler}
                type="text"
                className="form-conTrol"
                name="ediTdescription"
              />{" "}
            </Td>
            <Td>
              <FormControl>
                <FormLabel>Category :</FormLabel>
                <Select
                  value={this.state.editCategory}
                  onChange={this.inputHandler}
                  name="EditCategory"
                  className="form-conTrol"
                >
                  <option value="Events">All Events : </option>
                  <option value="sport">Sport</option>
                  <option value="food">Food</option>
                  <option value="festival">Festival</option>
                  <option value="education">Education</option>
                  <option value="game">Game</option>
                </Select>
              </FormControl>
            </Td>
            <Td>
              <Button
                onClick={this.saveBtnHandler}
                colorScheme={"green.200"}
                bg={"green"}
                className="btn btn-success"
              >
                Save
              </Button>
            </Td>
            <Td>
              <Button
                colorScheme={"red.200"}
                bg={"red.600"}
                onClick={this.cancelEdit}
                className="btn btn-danger"
              >
                Cancel
              </Button>
            </Td>
          </Tr>
        );
      }
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.productName}</Td>
          <Td>{val.price}</Td>
          <Td>
            <img
              className="admin-product-image"
              src={val.productImage}
              alt=""
            />
          </Td>
          <Td>{val.description}</Td>
          <Td>{val.category}</Td>
          <Td>
            <Button
              colorScheme={"black.200"}
              onClick={() => this.editToggle(val)}
              className="btn btn-secondary"
            >
              Edit
            </Button>
          </Td>
          <Td>
            <Button colorScheme="red" onClick={() => this.openDialog(val.id)}>
              Delete
            </Button>

            <AlertDialog
              isOpen={this.state.isAlertDialogOpen}
              onClose={this.closeDialog}
              bgColor={"white"}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button colorScheme="gray" onClick={this.closeDialog}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={this.confirmDelete}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Td>
        </Tr>
      );
    });
  };

  openAddEventDialog = () => {
    this.setState({ isAddEventDialogOpen: true });
  };

  closeAddEventDialog = () => {
    this.setState({ isAddEventDialogOpen: false });
  };

  addNewProduct = () => {
    Axios.post(`${API_URL}/products`, {
      productName: this.state.addProductName,
      price: parseInt(this.state.addPrice),
      productImage: this.state.addProductImage,
      description: this.state.addDescription,
      category: this.state.addCategory,
    })
      .then(() => {
        this.fetchProducts();
        this.closeAddEventDialog();
        this.setState({
          addProductName: "",
          addPrice: 0,
          addProductImage: "",
          addDescription: "",
          addCategory: "",
          isAlertVisible: true,
          alertMessage: "Event added successfully !",
        });
        setTimeout(() => {
          this.setState({ isAlertVisible: false, alertMessage: "" });
        }, 5000);
      })
      .catch(() => {
        alert("Terjadi Kesalahan di Server");
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return (
        <div style={{ textAlign: "center" }}>
          <p>You are not authorized.</p>
          <Link to="/">
            <Button colorScheme={"red"} className="btn btn-danger">
              Go Back to Home
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <Box
        className="p-5"
        bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
      >
        <div className="col-12 text-center">
          <Card>
            <CardHeader>
              <Heading size="4xl">Manage Events</Heading>
            </CardHeader>
          </Card>
          <Box borderRadius="lg" overflow="hidden">
            <Table
              variant={"striped"}
              colorScheme="gray"
              className="table mt-4"
              size={"md"}
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                px={"5"}
              >
                <Box p={"10px"}>
                  <Thead className="thead-light">
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Price</Th>
                      <Th>Image</Th>
                      <Th>Description</Th>
                      <Th>Category</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>{this.renderProducts()}</Tbody>
                  <Tfoot className="bg-light">
                    <Tr>
                      <Td></Td>
                      <Td>
                        <Input
                          placeholder="Event name"
                          value={this.state.addProductName}
                          onChange={this.inputHandler}
                          name="addProductName"
                          type="text"
                          className="form-conTrol"
                        />
                      </Td>
                      <Td>
                        <Input
                          placeholder="0"
                          value={this.state.addPrice}
                          onChange={this.inputHandler}
                          name="addPrice"
                          type="number"
                          className="form-conTrol"
                        />
                      </Td>
                      <Td>
                        <Input
                          placeholder="Image URL"
                          value={this.state.addProductImage}
                          onChange={this.inputHandler}
                          name="addProductImage"
                          type="text"
                          className="form-conTrol"
                        />
                      </Td>
                      <Td>
                        <Input
                          placeholder="Description"
                          value={this.state.addDescription}
                          onChange={this.inputHandler}
                          name="addDescription"
                          type="text"
                          className="form-conTrol"
                        />
                      </Td>
                      <Td>
                        <Select
                          value={this.state.addCategory}
                          onChange={this.inputHandler}
                          name="addCategory"
                          className="form-conTrol"
                        >
                          <option value="">All Events</option>
                          <option value="sport">Sport</option>
                          <option value="food">Food</option>
                          <option value="festival">Festival</option>
                          <option value="education">Education</option>
                          <option value="game">Game</option>
                        </Select>
                      </Td>

                      <Td colSpan="2">
                        <Button
                          colorScheme={"blue"}
                          onClick={this.addNewProduct}
                          className="btn btn-info"
                        >
                          Add Event
                        </Button>
                        <AlertDialog
                          isOpen={this.state.isAddEventDialogOpen}
                          onClose={this.closeAddEventDialog}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                Add Event
                              </AlertDialogHeader>
                              <AlertDialogBody>
                                <Input
                                  placeholder="Event name"
                                  value={this.state.addProductName}
                                  onChange={this.inputHandler}
                                  name="addProductName"
                                  type="text"
                                  className="form-conTrol"
                                />
                              </AlertDialogBody>
                              <AlertDialogFooter>
                                <Button
                                  colorScheme="gray"
                                  onClick={this.closeAddEventDialog}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  colorScheme="blue"
                                  onClick={this.addNewProduct}
                                  ml={3}
                                >
                                  Save
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
                        {this.state.isAlertVisible && (
                          <Alert status="success">
                            <AlertIcon />
                            {this.state.alertMessage}
                          </Alert>
                        )}
                      </Td>
                    </Tr>
                  </Tfoot>
                </Box>
              </Card>
            </Table>
          </Box>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(Admin);
