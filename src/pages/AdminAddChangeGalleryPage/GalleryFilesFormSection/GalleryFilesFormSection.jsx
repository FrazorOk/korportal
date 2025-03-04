import { useEffect, useState } from 'react';
import DeleteButton from '../../../components/UI/DeleteButton/DeleteButton';
import s from './GalleryFilesFormSection.module.css';
import { deleteGalleryCatalogsFiles, uploadFileInGallery } from '../../../api/api';
import Loader from '../../../components/UI/Loader/Loader';

const GalleryFilesFormSection = ({ files, Id }) => {
	let [filesList, setFilesList] = useState([]);
	let [fetchingFiles, setFetchingFiles] = useState([]);
	let [inputFiles, setInputFiles] = useState([]);
	let [fetchingStatus, setFetchingStatus] = useState(true);
	let [isIndexFetching, setIndexFetching] = useState(0);

	async function processArray(array) {
		console.log(fetchingFiles);

		// for (let index = 0; index < array.length; index++) {
		// 	let imgInArray = [array[index]];
		// 	console.log(array);
		// 	console.log(imgInArray);

		// 	setTimeout(() => {
		// 		setFetchingFiles((list) => {
		// 			let currentList = [...list];

		// 			console.log(list);
		// 			console.log(currentList);
		// 			console.log(currentList[index]);
		// 			console.log(currentList[index].isFetching);

		// 			currentList[index].isFetching = false;

		// 			return currentList;
		// 		});
		// 	}, 500);

		// let result = await uploadFileInGallery(Id, imgInArray);
		// console.log(result);

		// if (result.id) {
		// 	setFetchingFiles((listFiles) => {
		// 		let currentArray = [...listFiles];
		// 		console.log(currentArray);
		// 		console.log(index);
		// 		console.log(currentArray[index]);

		// 		if (currentArray[index]) {
		// 			currentArray[index].fetching = false;
		// 			currentArray[index].type = result.file_type;
		// 			currentArray[index].id = result.id;
		// 			currentArray[index].url = result.url;
		// 			return currentArray;
		// 		}
		// 	});
		// }
		// }
		console.log('Done!');
	}

	// async function processArray(array) {
	// 	for (const item of array) {
	// 		let imgInArray = [item];

	// 		let result = await uploadFileInGallery(Id, imgInArray);
	// 		console.log(result);

	// 		if (result.id) {
	// 			setFetchingFiles((listFiles) => {
	// 				indexFile += 1;
	// 				let currentArray = [...listFiles];
	// 				console.log(currentArray);
	// 				console.log(indexFile);
	// 				console.log(currentArray[indexFile]);

	// 				if (currentArray[indexFile]) {
	// 					currentArray[indexFile].fetching = false;
	// 					currentArray[indexFile].type = result.file_type;
	// 					currentArray[indexFile].id = result.id;
	// 					currentArray[indexFile].url = result.url;
	// 					return currentArray;
	// 				}
	// 			});
	// 		}
	// 	}
	// 	console.log('Done!');
	// }

	const onChangeInputFilesHandler = (e) => {
		let filesListInput = e.target.files;

		if (filesListInput.length > 0) {
			let objectFetchingFile = { isFetching: true, url: '', id: null, type: null };

			let currentArray = [];
			for (let index = 0; index < filesListInput.length; index++) {
				currentArray.push(objectFetchingFile);
			}
			setFetchingFiles(currentArray);
			setInputFiles(filesListInput);
		}
	};

	useEffect(() => {
		files && setFilesList(files);
	}, [files]);

	useEffect(() => {
		console.log(fetchingFiles);
	}, [fetchingFiles]);

	useEffect(() => {
		if (fetchingFiles.length > 0 && inputFiles.length > 0 && fetchingStatus) {
			setFetchingStatus(false);
			processArray(inputFiles);
		}
	}, [fetchingFiles, inputFiles]);

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

				{fetchingFiles &&
					fetchingFiles.map((file, indexFile) => (
						<div key={indexFile} className={`${s.files_item} ${s.files_fetching}`}>
							{file.isFetching && <Loader />}
						</div>
					))}

				{files &&
					files.length > 0 &&
					files.map((file) => (
						<div key={file.id} className={s.files_item}>
							<img className={s.file_img} src={`${file.url}`} alt="" />
							<DeleteButton onClickHandler={() => onClickDeleteHandler(file.id)} />
						</div>
					))}
			</div>
		</>
	);
};

export default GalleryFilesFormSection;
