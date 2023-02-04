import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

const Crud = () => {

    const baseUrl = "http://localhost:8080/product";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [SelectedProduct, setSelectedProduct] = useState({});
    
    
    function currencyFormatter( value) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          minimumFractionDigits: 2,
          currency: "USD"
        }) 
        return formatter.format(value)
      }
      

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedProduct((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(SelectedProduct);
    }

    // FUNCIONES DE LOS MODALES 
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }
    // CObtener todos los prodcutos
    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
       
        await axios.post(baseUrl+"/save", {
            name: SelectedProduct.name,
            description: SelectedProduct.description,
            dimensions: SelectedProduct.dimensions,
            img: SelectedProduct.img,
            weight: SelectedProduct.weight,
            price: SelectedProduct.price,
            longdesc: SelectedProduct.longdesc,
            sku:    1245687451,
            // inventory_id: 2,
            // discount_id: 2,
            // category_id: 2
            productCategory: {
                id:2},
            discount: {
                id:2},
            productInventory: {
               id:2}
        })
            .then(response => {
                //setData(data.concat(response.data));
                peticionGet();
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put(baseUrl + "/update/"+SelectedProduct.id,{
            name: SelectedProduct.name,
            description: SelectedProduct.description,
            dimensions: SelectedProduct.dimensions,
            img: SelectedProduct.img,
            weight: SelectedProduct.weight,
            price: SelectedProduct.price,
            longdesc: SelectedProduct.longdesc,
            sku:    SelectedProduct.sku,
            // inventory_id: 2,
            // discount_id: 2,
            // category_id: 2
            productCategory: {
                id:2},
            discount: {
                id:2},
            productInventory: {
               id:2}
        })
            .then(response => {
                var newdata = data;
                peticionGet();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var f = new FormData();
        await axios.delete(baseUrl + "/delete/" + SelectedProduct.id)
            .then(response => {
                setData(data.filter(Product => Product.id !== SelectedProduct.id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const seleccionarFramework = (Product, caso) => {
        setSelectedProduct(Product);
        (caso === "Editar") ?
            abrirCerrarModalEditar() :
            abrirCerrarModalEliminar()
    }

    useEffect(() => {
        peticionGet();
    }, [])


    return (
        <Container className='text-center'>
            <br />
            <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Add product</button>
            <br /><br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>description</th>
                        <th>Inventory</th>
                        <th>Price</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(product => (
                        <tr key={product.id}>
                            <td> <img src={product.img} alt="Publication" width="50" height="50" /></td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.productInventory.quantity}</td>
                            <td>{currencyFormatter(product.price)}</td>
                            <td>
                                <div className='d-flex text-center'>
                                    <button className="btn btn-primary m-1 " onClick={() => seleccionarFramework(product, "Editar")}><i className="fab fa-instagram fa-sm fa-fw "></i></button>
                                    <button className="btn btn-danger m-1" onClick={() => seleccionarFramework(product, "Eliminar")}><i className="fa-solid fa-trash"></i></button>
                                </div>

                            </td>
                        </tr>
                    ))}


                </tbody>

            </table>


            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar Producto</ModalHeader>
                <ModalBody>
                <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="name" onChange={handleChange}  />
                        <br />
                        <label>description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="description" onChange={handleChange}  />
                        <br />
                        <label>Loong description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="longdesc" onChange={handleChange}  />
                        <br />
                        <label>price: </label>
                        <br />
                        <input type="text" className="form-control" name="price" onChange={handleChange} />
                        <br />
                        <label>dimensions: </label>
                        <br />
                        <input type="text" className="form-control" name="dimensions" onChange={handleChange} />
                        <label>weight: </label>
                        <br />
                        <input type="text" className="form-control" name="weight" onChange={handleChange}  />
                        <label>Ruta de Imagen: </label>
                        <br />
                        <input type="text" className="form-control" name="img" onChange={handleChange}  />
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPost()}>Registrar</button>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Producto</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br />
                        <input type="text" className="form-control" name="name" onChange={handleChange} value={SelectedProduct && SelectedProduct.name} />
                        <br />
                        <label>description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="description" onChange={handleChange} value={SelectedProduct && SelectedProduct.description} />
                        <br />
                        <label>Loong description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="longdesc" onChange={handleChange} value={SelectedProduct && SelectedProduct.longdesc} />
                        <br />
                        <label>price: </label>
                        <br />
                        <input type="text" className="form-control" name="price" onChange={handleChange} value={SelectedProduct && SelectedProduct.price} />
                        <br />
                        <label>dimensions: </label>
                        <br />
                        <input type="text" className="form-control" name="dimensions" onChange={handleChange} value={SelectedProduct && SelectedProduct.dimensions} />
                        <label>weight: </label>
                        <br />
                        <input type="text" className="form-control" name="weight" onChange={handleChange} value={SelectedProduct && SelectedProduct.weight} />
                        <label>Ruta de Imagen: </label>
                        <br />
                        <input type="text" className="form-control" name="img" onChange={handleChange} value={SelectedProduct && SelectedProduct.img} />
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    <div>
                        ¿Estás seguro que deseas eliminar el producto {SelectedProduct && SelectedProduct.name}?
                    </div>

                    <div className='text-center'>
                        <img src={SelectedProduct.img} alt="Publication" width="250" height="250" />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => peticionDelete()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => abrirCerrarModalEliminar()}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}


export default Crud;