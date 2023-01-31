const MonthCategories = () => {
    return (
        <section className="container py-5">
            <div className="row text-center pt-3">
                <div className="col-lg-6 m-auto">
                    <h1 className="h1">Categories of The Month</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4 p-5 mt-3">
                    <a href="#">
                        <img src="https://therichpost.com/wp-content/uploads/2021/05/category_img_01.jpg"
                            className="rounded-circle img-fluid border" alt="" />
                    </a>
                    <h5 className="text-center mt-3 mb-3">Watches</h5>
                    <p className="text-center"><a className="btn btn-success">Go Shop</a></p>
                </div>
                <div className="col-12 col-md-4 p-5 mt-3">
                    <a href="#">
                        <img src="https://therichpost.com/wp-content/uploads/2021/05/category_img_02.jpg"
                            className="rounded-circle img-fluid border" alt="" />
                    </a>
                    <h2 className="h5 text-center mt-3 mb-3">Shoes</h2>
                    <p className="text-center"><a className="btn btn-success">Go Shop</a></p>
                </div>
                <div className="col-12 col-md-4 p-5 mt-3">
                    <a href="#">
                        <img src="https://therichpost.com/wp-content/uploads/2021/05/category_img_03.jpg"
                            className="rounded-circle img-fluid border" alt="" />
                    </a>
                    <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
                    <p className="text-center"><a className="btn btn-success">Go Shop</a></p>
                </div>
            </div>
        </section>
    );
}

export default MonthCategories;