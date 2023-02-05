import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
//import { clippingParents } from '@popperjs/core';

const Crud = () => {

    const ProductUrl = "http://localhost:8080/product";
    const CategoryUrl = "http://localhost:8080/category";
    const InventoryUrl = "http://localhost:8080/inventory";
    const DiscountUrl = "http://localhost:8080/discount";
    //data de los model para las solicitudes GET 
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataInventory, setDataInventory] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [SelectedProduct, setSelectedProduct] = useState({});
    const [SelectedProductAdd, setSelectedProductAdd] = useState({});
    //  const [SelectedCategory, setSelectedCategory] = useState({});
    // const [SelectedInventory, setSelectedInventory] = useState({});

    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toISOString();
    //FUNCION PARA DAR FORMATO DE DOLAR 
    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency: "USD"
        })
        return formatter.format(value)
    }

    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES DE PRODUCTOS PARA SU POSTERIOR ACTUALIZACION
    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedProduct((prevState) => ({
            ...prevState,
            [name]: value
        }))
  
    }
    //AQUÍ SE GUARDA EL OBJETO QUE CONTIENE LAS VARIABLES PARA GUARDAR UN PRODUCTO NUEVO
    const handleChangeProduct = e => {
        const { name, value } = e.target;
        setSelectedProductAdd((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // FUNCIONES DE LOS MODALES 
    const abrirCerrarModalInsertar = () => {
        setSelectedProductAdd({});
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }
    // CObtener todos los prodcutos
    const peticionGetProduct = async () => {
        await axios.get(ProductUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    // CObtener todos los Inventory
    const peticionGetInventory = async () => {
        await axios.get(InventoryUrl)
            .then(response => {
                setDataInventory(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // CObtener todos los Discount
    const peticionGetDiscount = async () => {
        await axios.get(DiscountUrl)
            .then(response => {
                setDataDiscount(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // CObtener todos los Category
    const peticionGetCategory = async () => {
        await axios.get(CategoryUrl)
            .then(response => {
                setDataCategory(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // ENVIO Y REGISTRO DE UN NUEVO inventario 
    const saveInventory = async () => {
        try {
            const response = await axios.post(InventoryUrl + "/save", {
                quantity: SelectedProductAdd.Inventory,
                createAt: now
            })

            const inventoryId = response.data.id;
            return inventoryId;

        } catch (error) {
            console.error(error);
        }
    }

    // ENVIO Y REGISTRO DE UN NUEVO PRODUCTO 
    const peticionPost = async () => {
        try {
            const inventoryId = await saveInventory();
            if (!inventoryId) {
                throw new Error("No se pudo obtener el ID del registro de inventario");
            }
            await axios.post(ProductUrl + "/save", {
                name: SelectedProductAdd.name,
                description: SelectedProductAdd.description,
                img: SelectedProductAdd.img,
                dimensions: SelectedProductAdd.dimensions,
                weight: SelectedProductAdd.weight,
                price: SelectedProductAdd.price,
                createAt: now,
                longdesc: SelectedProductAdd.longdesc,
                sku: "1245687451",
                productCategory: {
                    id: SelectedProductAdd.category
                },
                discount: {
                    id: SelectedProductAdd.discount
                },
                productInventory: {
                    id: inventoryId
                }
            })
                .then(response => {
                    //setData(data.concat(response.data));
                    peticionGetProduct();
                    abrirCerrarModalInsertar();
                    peticionGetCategory();
                    peticionGetDiscount();
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.error(error);
        }
    }

    //ACTUALIZAR PRODUCTOS 
    const peticionPut = async () => {
        await axios.put(ProductUrl + "/update/" + SelectedProduct.id, {
            name: SelectedProduct.name,
            description: SelectedProduct.description,
            dimensions: SelectedProduct.dimensions,
            img: SelectedProduct.img,
            weight: SelectedProduct.weight,
            price: SelectedProduct.price,
            longdesc: SelectedProduct.longdesc,
            sku: SelectedProduct.sku,
            productCategory: {
                id: SelectedProduct.category
            },
            discount: {
                id: SelectedProduct.discount
            },
            productInventory: {
                id: 1
            }
        })
            .then(response => {
                var newdata = data;
                peticionGetProduct();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    //ELIMINAR PRODUCTOS 
    const peticionDelete = async () => {
        await axios.delete(ProductUrl + "/delete/" + SelectedProduct.id)
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
        peticionGetProduct();
        peticionGetInventory();
        peticionGetCategory();
        peticionGetDiscount();
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
                        <th>Category</th>
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
                            <td>{product.productCategory.name}</td>
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
                        <input type="text" className="form-control" name="name" onChange={handleChangeProduct} />
                        <br />
                        <label>description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="description" onChange={handleChangeProduct} />
                        <br />
                        <label>Loong description: </label>
                        <br />
                        <textarea type="text" className="form-control" name="longdesc" onChange={handleChangeProduct} />
                        <br />
                        <label>price: </label>
                        <br />
                        <input type="text" className="form-control" name="price" onChange={handleChangeProduct} />
                        <br />
                        <label>Category: </label>
                        <br />
                        <select name="category" id="selCategory" onClick={handleChangeProduct} >
                            <option>Seleccione una categoria: </option>
                            {
                                dataCategory.map((category) => (
                                    <option key={category.id} value={category.id}> {category.name}</option>
                                ))
                            }
                        </select>
                        <br /><br />
                        <label>Ofertas y descuentos: </label>
                        <br />
                        <select name="discount" id="selDiscount" onClick={handleChangeProduct} >
                            <option>Seleccione un  descuento: </option>
                            {
                                dataDiscount.map((discount) => (
                                    <option key={discount.id} value={discount.id}> {discount.name}</option>
                                ))
                            }
                        </select>
                        <br /><br />
                        <label>Stock: </label>
                        <br />
                        <input type="text" className="form-control" name="Inventory" onChange={handleChangeProduct} />
                        <label>dimensions: </label>
                        <br />
                        <input type="text" className="form-control" name="dimensions" onChange={handleChangeProduct} />
                        <label>weight: </label>
                        <br />
                        <input type="text" className="form-control" name="weight" onChange={handleChangeProduct} />
                        <label>Ruta de Imagen: </label>
                        <br />
                        <input type="text" className="form-control" name="img" onChange={handleChangeProduct} />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary m-1" onClick={() => peticionPost()}>Registrar    </button>
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
                        <label>Category: </label>
                        <br />
                        <select name="categorias" id="selCategory" value={SelectedProduct && SelectedProduct.category}>
                            <option value={-1}>Seleccione una opción: </option>
                            {
                                dataCategory.map((category) => (
                                    <option key={category.id} value={category.id}> {category.name} </option>
                                ))
                            }
                        </select>
                        <br /><br />
                        <label>Ofertas y descuentos: </label>
                        <br />
                        <select name="discount" id="selDiscount" onClick={handleChange}  >
                            <option>Seleccione un descuento: </option>
                            {
                                dataDiscount.map((discount) => (
                                    <option key={discount.id} value={discount.id}> {discount.name}</option>
                                ))
                            }
                        </select>
                        <br /><br />
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