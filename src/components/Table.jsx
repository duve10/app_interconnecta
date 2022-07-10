import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const Table = () => {
  /**VARIABLES */

  /**LIST */
  const [products, setProducts] = useState(null);

  /** CATEGORY INFO */
  const [code, setCode] = useState("");
  const [nameP, setNameP] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");

  /** DATA ROW */
  const [rowData, setRowData] = useState([]);
  const [viewShow, setViewShow] = useState(false);

  /** SEE BUTTON AND MODAL POST */
  const [deleteStore, setDeleteStore] = useState(false);
  const [viewPost, setViewPost] = useState(false);

  /** MODAL VIEW STORE */
  const handleViewShow = () => {
    setViewShow(true);
  };
  const handleViewClose = () => {
    setViewShow(false);
  };

  //EDIT
  const [viewEdit, setViewEdit] = useState(false);
  const handleEditClose = () => {
    setViewEdit(false);
  };

  //ADD

  const handlePostShow = () => {
    setViewPost(true);
  };
  const handlePostClose = () => {
    setViewPost(false);
  };

  /** FUNCTION TO CREATE */
  const handleSubmit = () => {
    const nameAdd = `${code} - ${nameP} - ${sku}`;

    const store = { name: nameAdd, category };
    Service.create("stores", store).then((response) => {
      const { data, status } = response;

      if (status === 200) {
        alert("REGISTERED PRODUCT");
        setViewPost(false);
        getStores();
      }
    });
  };

  /** OBTAIN DATA TO EDIT */
  const handleEdit = async () => {
    const nameAdd = `${code} - ${nameP} - ${sku}`;
    const storeEdit = { name: nameAdd, category };
    const { links } = rowData;

    Service.update(links[0].uri, storeEdit).then((response) => {
      const { data, status } = response;
      if (status === 200) {
        alert("Edit");
        setViewEdit(false);
        getStores();
      }
    });
  };

  /** FUNCTION TO GET ONE STORE */

  const getStore = async (id) => {
    setRowData(id);
    Service.get(id.links[0].uri)
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          const updateDescription = data.data.name.split(" - ");
          setCode(updateDescription[0]);
          setNameP(updateDescription[1]);
          setSku(updateDescription[2]);
          setCategory(data.data.category);
          setViewEdit(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /** FUNCTION TO DELETE */

  const handleDelete = async () => {
    const { links } = rowData;

    Service.remove(links[0].uri).then((response) => {
      const { data, status } = response;
      if (status === 200) {
        alert("Eliminado");
        getStores();
        setViewShow(false);
      }
    });
  };

  /** FUNCTION TO GET DATA */

  const getStores = async () => {
    Service.getAll("stores")
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          setProducts(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /** GET ALL DATA FIRST VIEW */

  useEffect(() => {
    // getProducts();
    getStores();
  }, []);

  return (

    
    // TABLE
    <div>
      <div className="row">
        <div className="mt-5 mb-4">
          <Button
            variant="primary"
            onClick={(e) => {
              handlePostShow();
            }}
          >
            <i className="fa fa-plu"></i> Add new Product{" "}
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products == null ? (
                <tr>
                  <td colSpan="2"> Cargando</td>
                </tr>
              ) : (
                products.data.map((product, index) => (
                  <tr key={index}>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td style={{ minWidth: 190 }}>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleViewShow(setRowData(product))}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => getStore(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          handleViewShow(
                            setRowData(product),
                            setDeleteStore(true)
                          )
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>



      {/* MODAL TO VIEW */}

      <div className="model-box view">
        <Modal
          show={viewShow}
          onHide={handleViewClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title> Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={rowData.name}
                  readOnly
                />
              </div>

              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={rowData.category}
                  readOnly
                />
              </div>
            </div>

            {deleteStore && (
              <Button
                type="submit"
                className="btn btn-danger mt-4"
                onClick={handleDelete}
              >
                Delete Store
              </Button>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/*  SUBMIT DATA */}
      <div className="model-box view">
        <Modal
          show={viewPost}
          onHide={handlePostClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title> Create STORE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label className="mt-2" htmlFor="">
                  Name Store
                </label>
              </div>

              <div className="form-group col-xs-6 form-inline description">
                <input
                  type="text"
                  className="form-control "
                  onInput={(e) => setCode(e.target.value)}
                  placeholder="Product code"
                />
                <label htmlFor="">-</label>
                <input
                  type="text"
                  className="form-control "
                  onInput={(e) => setNameP(e.target.value)}
                  placeholder="Product Name"
                />
                <label htmlFor="">-</label>
                <input
                  type="text"
                  className="form-control "
                  onInput={(e) => setSku(e.target.value)}
                  placeholder="SKU"
                />
              </div>

              <div className="form-group">
                <label className="mt-2" htmlFor="">
                  Description Product
                </label>
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="btn btn-success mt-4"
              onClick={handleSubmit}
            >
              Add Store
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handlePostClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* EDIT MODAL */}
      <div className="model-box view">
        <Modal
          show={viewEdit}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title> Edit Store</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group col-xs-6 form-inline description">
                <input
                  type="text"
                  className="form-control "
                  onInput={(e) => setCode(e.target.value)}
                  placeholder="Product code"
                  value={code}
                />
                <label htmlFor="">-</label>
                <input
                  type="text"
                  className="form-control "
                  onInput={(e) => setNameP(e.target.value)}
                  placeholder="Product Name"
                  value={nameP}
                />
                <label htmlFor="">-</label>
                <input
                  type="text"
                  className="form-control "
                  onInput={(e) => setSku(e.target.value)}
                  s
                  placeholder="SKU"
                  value={sku}
                />
              </div>

              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Category"
                  value={category}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="btn btn-warning mt-4"
              onClick={handleEdit}
            >
              Edit Store
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
