import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const FileSwiper = ({ media }) => {
	return (
		<div className="">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={1}
				navigation
				scrollbar={{ draggable: true }}
			>
				{media.map((file, index) => (
					<SwiperSlide key={index} className="w-full">
						<img className="w-full" src={file} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default FileSwiper;
