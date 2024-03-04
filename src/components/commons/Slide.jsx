import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
// eslint-disable-next-line react/prop-types
const Slide = ({ settings }) => {
  return (
    <div className="w-full mx-auto  slider-container">
      <Slider {...settings}>
        <div className="w-full h-[350px]  rounded-md  ">
          <img
            className="w-full h-full object-cover rounded-md "
            src="https://xdcs.cdnchinhphu.vn/446259493575335936/2023/2/27/trungtamdangkiem-16774849631191300821353.jpg"
          />
        </div>
        <div className="w-[500px] h-[350px]  rounded-md  ">
          <img
            className="w-full h-full object-cover rounded-md "
            src="https://static-images.vnncdn.net/files/publish/2023/1/31/dang-kiem-tv-2-1067.png"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
