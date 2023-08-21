import Header from "../../components/Header/Header";
import BestDeals from "../../components/Route/BestDeals";
import Categories from "../../components/Route/Categories";
import Hero from "../../components/Route/Hero";
import FeatureProducts from '../../components/Route/FeatureProducts/FeatureProducts'
import Events from '../../components/Events/Events'
import Sponsored from '../../components/Route/Sponsored/Sponsored'
import Footer from '../../components/Layout/Footer'

const HomePage = () => {
    return (
        <div>
            <Header/>
            <Hero/>
            <Categories/>
            <BestDeals/>
            <Events/>
            <FeatureProducts/>
            <Sponsored/>
            <Footer/>
        </div>
    );
};

export default HomePage;