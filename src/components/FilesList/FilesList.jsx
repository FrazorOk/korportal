import { useEffect, useState } from 'react';
import s from './FilesList.module.css';
import searchIcon from '../../assets/img/icons/search-icon.svg';

const FilesList = ({ data, setModalWindowStatus, setActiveSLide }) => {
	let [isFiles, setFiles] = useState([]);

	useEffect(() => {
		data && setFiles(data);
	}, [data]);

	return (
		<div className="row">
			<div className={s.files}>
				{isFiles.length > 0 ? (
					isFiles.map(
						(fileItem, fileIndex) =>
							fileItem && (
								<div className={s.files__item}>
									{fileItem.file_type === 'image' && <img loading="lazy" className={s.file} src={fileItem.url} alt="" />}
									{fileItem.file_type === 'video' && (
										<video controls loading="lazy" className={`${s.file} ${s.video}`} src={`${fileItem.url}`} alt="" />
									)}
									{fileItem.file_type !== 'video' && fileItem.file_type !== 'image' && (
										<div className={`${s.file} ${s.other_type}`}>
											<span>{fileItem.file_type}</span>
											<span>{fileItem.url}</span>
										</div>
									)}
									<button
										className={s.zoom_btn}
										onClick={() => {
											setActiveSLide(fileIndex);
											setModalWindowStatus(true);
										}}>
										<img src={searchIcon} />
									</button>
								</div>
							)
					)
				) : (
					<p style={{ fontSize: '16px', color: '#7d7d7d' }}>Немає файлів</p>
				)}
			</div>
		</div>
	);
};

export default FilesList;
