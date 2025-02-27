import { useEffect, useState } from 'react';
import DeleteButton from '../../../components/UI/DeleteButton/DeleteButton';
import s from './GalleryFilesFormSection.module.css';
import { deleteGalleryCatalogsFiles, uploadFileInGallery } from '../../../api/api';

const GalleryFilesFormSection = ({ files, Id }) => {
	let [filesList, setFilesList] = useState([]);

	useEffect(() => {
		files && setFilesList(files);
	}, [files]);

	const onChangeInputFilesHandler = (e) => {
		let filesList = e.target.files;

		if (filesList.length > 0) {
			async function processArray(array) {
				for (const item of array) {
					let imgInArray = [item];
					console.log(imgInArray);

					await uploadFileInGallery(Id, imgInArray);
				}
				console.log('Done!');
			}
			processArray(filesList);
		}
	};

	const onClickDeleteHandler = (id) => {
		deleteGalleryCatalogsFiles(id, 'files');
	};

	return (
		<>
			<div className={s.files_list}>
				<div className={`${s.files_item} ${s.files_add_btn}`}>
					<label htmlFor="upload-files"></label>
					<input id="upload-files" type="file" multiple onChange={onChangeInputFilesHandler}></input>
				</div>

				{files &&
					files.length > 0 &&
					files.map((file) => (
						<div className={s.files_item}>
							<img className={s.file_img} src={`${file.url}`} alt="" />
							<DeleteButton onClickHandler={() => onClickDeleteHandler(file.id)} />
						</div>
					))}
			</div>
		</>
	);
};

export default GalleryFilesFormSection;
