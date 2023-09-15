import BestDeals from "../../components/Route/BestDeals";
import Categories from "../../components/Route/Categories";
import Hero from "../../components/Route/Hero";
import FeatureProducts from "../../components/Route/FeatureProducts/FeatureProducts";
import Events from "../../components/Events/Events";
import Sponsored from "../../components/Route/Sponsored/Sponsored";

const HomePage = () => {
  window.scrollTo(0,0)
  return (
    <div>
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeatureProducts />
      <Sponsored />
    </div>
  );
};

export default HomePage;
