import Searchbar from "../components/Searchbar";
import styled from "styled-components";
import homepageBg from "../assets/biganime.png";

const Homepage = ({}) => {
  return (
    <Wrapper>
      <BannerImage
        src={
          process.env.PUBLIC_URL +
          "/132-1326686_creepy-yuno-anime-banners-de-youtube.png"
        }
      />
      {/* <Gradient /> */}
      <Searchbar />
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  /* border: 1px blue solid; */
  width: 100%;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),
    url(${homepageBg}); */
  background-position: center;
  background-repeat: no-repeat;
  /* background-repeat: repeat; */
  background-size: cover;
  position: relative;
  /* height: 100vh; */
  /* filter: grayscale(100%); */
  /* animation: change 10s infinite ease-in-out; */
  /* background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)); */
`;

const Gradient = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.2;
`;

const BannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 450px;
  /* margin: 1rem 0 0 0; */
  /* z-index: 100; */
`;
