import s from './Loader.module.css';

const Loader = ({ background = false }) => {
	return <div className={`${s.loader} ${background && s.background}`}></div>;
};

export default Loader;
