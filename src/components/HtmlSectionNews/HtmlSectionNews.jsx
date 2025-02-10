import s from './HtmlSectionNews.module.css';

const HtmlSectionNews = ({ htmlBody }) => {
	return (
		<div className="row">
			<div
				className={`${s.html_body} section-container`}
				style={{ maxWidth: '1200px', width: '100%' }}
				dangerouslySetInnerHTML={{ __html: htmlBody }}></div>
		</div>
	);
};

export default HtmlSectionNews;
