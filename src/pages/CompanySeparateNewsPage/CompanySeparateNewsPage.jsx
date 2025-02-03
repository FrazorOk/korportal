import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';

const CompanySeparateNewsPage = () => {
	return (
		<div>
			<h1>title</h1>
			<GoBackButton toLink={'/company-marketing-news?activetab=1'} />
			<div className="row">
				<div className="section-container" style={{ maxWidth: '1200px', width: '100%' }}></div>
			</div>
		</div>
	);
};

export default CompanySeparateNewsPage;
