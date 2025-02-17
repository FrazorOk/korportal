import { useRedirectAdmin } from '../../hooks/useRedirectHoook';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GalleryList from '../../components/GalleryList/GalleryList';
import AddEventButton from '../../components/UI/AddEventButton/AddEventButton';
import { useEffect, useState } from 'react';
import { getGalleryCatalogs } from '../../api/api';

let data2 = [
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/204/0_c950b6a2598ee30ce60a976473171201.webp',
	'https://portal.softcom.ua/content/pictures/news/114/8143a0b13864287f49231364a28f9861.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_ca0cfa3fee00e069c788f8bf004d73ed.webp',
	'https://portal.softcom.ua/content/pictures/news/114/0_287f10f366717da565a5785d0ce971b0.webp',
	'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
	'https://portal.softcom.ua/content/pictures/news/113/d8fa4702b5dbfe75a84e15f24b6401c6.webp',
	'https://portal.softcom.ua/content/pictures/news/112/18169e39f49ed3bd5560bdde216506f1.webp',
	'https://portal.softcom.ua/content/pictures/news/111/b329dd506fad2d22c7767aed4dc62d9c.webp',
	'https://portal.softcom.ua/content/pictures/news/33/%D0%9C%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B5%D0%B4%D1%96%D0%B0%20(36)%202.jfif',
	'https://portal.softcom.ua/content/pictures/news/4/preview.jpeg',
	'https://portal.softcom.ua/content/pictures/news/7/preview.jpeg',
	'https://web.archive.org/web/20220919054459im_/https://www.softcom.ua/images/V34_ukr.jpg',
	'https://softcom.ua/images/cd823ca7-f482-45f2-809f-27ffe6787fc9.jpg',
	'https://portal.softcom.ua/content/pictures/news/187/0_1165314a063533c78d74a591b11d8a77.webp',
	'https://portal.softcom.ua/content/pictures/news/115/017bf1af817f7e716cc79d838a89ee5f.webp',
];

const AdminGalleryPage = () => {
	let { statusAdmin } = useRedirectAdmin();

	let [data, setData] = useState([]);

	useEffect(() => {
		getGalleryCatalogs().then((response) => setData(response));
	}, []);

	useScrollToTop();

	return (
		<>
			{statusAdmin && (
				<div>
					<h1>Налаштування галереї</h1>
					<div className="row" style={{ width: 'calc(25% - 15px)', height: '150px' }}>
						<AddEventButton path={'add-gallery'} />
					</div>
					<div className="row">
						<GalleryList galleryList={data} />
					</div>
				</div>
			)}
		</>
	);
};

export default AdminGalleryPage;
