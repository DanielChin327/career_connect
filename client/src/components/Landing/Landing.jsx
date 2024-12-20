import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer'
import bannerImage from "../../assets/styles/landing/banner2.jpg";
import "./Landing.scss"




function Landing() {
  const reviewsWrapperRef = useRef(null);
  const navigate = useNavigate()
  const scrollLeft = () => {
    const cardWidth = reviewsWrapperRef.current.children[0].offsetWidth;
    const scrollDistance = cardWidth * 3;
    reviewsWrapperRef.current.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const cardWidth = reviewsWrapperRef.current.children[0].offsetWidth;
    const scrollDistance = cardWidth * 3;
    reviewsWrapperRef.current.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <>
    <div className="landing-container">
    <div
      className="banner"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bannerImage})`,
      }}
    >
      <div className="container">
        <h1>
          Career Connect
        </h1>
        <p>Connect with your future.</p>
        <a className="btn btn-danger" href="#" onClick={() => navigate("/register")}>
          Start Now
        </a>
      </div>
    </div>

    <div className="services-info">
        <h2 className="service-title">Services</h2>
      <div className="services-category">
      <div className="service-card service-info-one">
        <h3>Fast Application</h3>
        <p>Streamline your job search with instant applications. With just a click, apply to multiple opportunities without the hassle of filling out repetitive forms.</p>
      </div>
      <div className="service-card service-info-two">
        <h3>Encourages Response</h3>
        <p>Boost your chances of engagement. Our platform actively prompts employers to review and respond, keeping job seekers informed every step of the way.</p>
      </div>
      <div className="service-card service-info-three">
        <h3>One Profile Only</h3>
        <p>Level the playing field with a single, polished profile. Say goodbye to endless resume tweaks – one profile connects you to all relevant jobs, reducing stress and saving time.</p>
      </div>
      </div>
    </div>

    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
      <p>
        At <span className="company-name">Career Connect</span>, we believe in
        bridging the gap between talented professionals and the opportunities
        they deserve. Founded with a vision to simplify the job search process,
        our platform is designed to connect job seekers with top employers
        across various industries. Whether you’re a fresh graduate looking for
        your first opportunity or a seasoned professional seeking your next big
        move,
        <span className="company-name"> Career Connect</span> is here to make
        the process easier, faster, and more effective.
      </p>
      <p>
        Our <span className="buzzword">mission</span> is to empower individuals
        by providing a user-friendly platform where candidates can find jobs
        that match their skills, values, and career aspirations. With
        personalized job recommendations, expert resources, and a focus on{" "}
        <span className="buzzword">transparency</span>, we are committed to
        helping you navigate the competitive job market with confidence.{"\n"}
      </p>
      <p>
        For employers, <span className="company-name">Career Connect</span>{" "}
        offers a seamless recruitment experience, providing access to a diverse
        pool of qualified candidates. We understand the challenges of finding
        the right fit, which is why we’ve built advanced tools to help you
        discover, engage, and hire top talent effortlessly.
      </p>
      <p>
        Join <span className="company-name">Career Connect</span> today—where
        <span className="buzzword"> ambition</span> meets{" "}
        <span className="buzzword"> opportunity</span>, and{" "}
        <span className="buzzword"> success stories </span>
        are written every day.
      </p>
      </div>

      <div className="start-now-btn-container">
        <button className="start-now-btn" onClick={() => navigate("/register")}>
          Register
        </button>

    </div>
    </div>

    <Footer />
    </div>
  </>
  );
}

export default Landing;
