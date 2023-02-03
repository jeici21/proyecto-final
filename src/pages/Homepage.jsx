import Carousel from "../components/Carousel";
import FeaturedProducts from "../components/FeaturedProducts";
import MonthCategories from "../components/MonthCategories";

const Homepage = () => {
    return (
        <>
            <Carousel />
            <MonthCategories />
            <FeaturedProducts />
        </>
    );
}

export default Homepage;