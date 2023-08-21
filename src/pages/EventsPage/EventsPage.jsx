import EventCard from "../../components/Events/EventCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Layout/Footer";

const EventsPage = () => {
    return (
        <div>
            <Header/>
            <EventCard active={true}/>
            <EventCard active={true}/>
            <Footer/>
        </div>
    );
};

export default EventsPage;