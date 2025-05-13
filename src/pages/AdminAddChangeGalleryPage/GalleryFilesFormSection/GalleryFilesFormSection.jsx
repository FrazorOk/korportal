import { useEffect, useState } from 'react';
import DeleteButton from '../../../components/UI/DeleteButton/DeleteButton';
import s from './GalleryFilesFormSection.module.css';
import { deleteGalleryCatalogsFiles, domain, uploadFileInGallery } from '../../../api/api';
import Loader from '../../../components/UI/Loader/Loader';
import asseptIcon from '../../../assets/img/icons/assept-blue-icon.svg';
import axios from 'axios';
import { getCookie } from '../../../helpers/cookieMetods';

const GalleryFilesFormSection = ({ files, Id, getCatalogFunction }) => {
	let [filesList, setFilesList] = useState([]);
	let [fetchingFiles, setFetchingFiles] = useState([]);
	let [inputFiles, setInputFiles] = useState([]);
	let [fetchingStatus, setFetchingStatus] = useState(true);

	async function processArray(array) {
		for (let index = 0; index < array.length; index++) {
			let imgInArray = [array[index]];

			const handleUpload = async () => {
				// ← зробили async
				let token = getCookie('_form_token');

				let data = new FormData();
				data.append('token', `${token}`);
				data.append('catalog_id', Id);

				if (imgInArray) {
					for (let i = 0; i < imgInArray.length; i++) {
						data.append('img[]', imgInArray[i]);
					}
				}

				try {
					const response = await axios.post(`${domain}/php/upload.php`, data, {
						onUploadProgress: (event) => {
							const percent = Math.round((event.loaded * 100) / event.total);
							console.log(`main percent: ${percent}`);

							setFetchingFiles((fetchingFilesList) => {
								let currentItem = [...fetchingFilesList];
								currentItem[index] = {
									...currentItem[index],
									percent: percent,
								};
								return currentItem;
							});
						},
					});

					return response.data; // ← важливо повернути результат
				} catch (error) {
					console.error('error ' + error);
					return null;
				}
			};

			let result = await handleUpload(); // тепер await працює правильно

			if (result?.id) {
				setFetchingFiles((fetchingFilesList) => {
					let currentItem = [...fetchingFilesList];

					currentItem[index] = {
						id: result.id,
						url: result.url,
						fetching: false,
						type: result.file_type,
					};

					return currentItem;
				});
			}
		}
	}
	const nullState = () => {
		setFetchingFiles([]);
		setInputFiles([]);
		setFetchingStatus(true);
	};
	const onChangeInputFilesHandler = (e) => {
		let filesListInput = e.target.files;

		if (filesListInput.length > 0) {
			let objectFetchingFile = { fetching: true, url: '', id: null, type: null };

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
		if (fetchingFiles.length > 0 && inputFiles.length > 0 && fetchingStatus) {
			setFetchingStatus(false);

			setTimeout(() => {
				processArray(inputFiles);
			}, 300);
		}
	}, [fetchingFiles, inputFiles]);

	useEffect(() => {
		if (fetchingFiles && fetchingFiles.length > 0) {
			let allFetchedStatus = fetchingFiles.find((findItem) => {
				console.log(findItem.fetching);
				console.log(findItem);

				if (findItem.fetching == true) {
					return true;
				}
			});

			console.log(allFetchedStatus);

			if (!allFetchedStatus) {
				nullState();
				getCatalogFunction();
			}
		}
	}, [fetchingFiles]);

	const onClickDeleteHandler = (id) => {
		const deleteGallery = async () => {
			let result = await deleteGalleryCatalogsFiles(id, 'files');
			getCatalogFunction();
		};
		deleteGallery();
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
							{file.fetching ? (
								<>
									<Loader />
									{file && file.percent && (
										<p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{file.percent}%</p>
									)}
								</>
							) : (
								<img className={s.assept_icon} src={asseptIcon} alt="" />
							)}
						</div>
					))}

				{filesList &&
					filesList.length > 0 &&
					filesList.map((file) => (
						<div key={file.id} className={s.files_item}>
							{file.file_type === 'image' && <img loading="lazy" className={s.file_img} src={`${file.url}`} alt="" />}
							{file.file_type === 'video' && <video controls loading="lazy" className={s.file_img} src={`${file.url}`} alt="" />}
							{file.file_type !== 'video' && file.file_type !== 'image' && (
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '16px',
										position: 'absolute',
										top: 0,
										left: 0,
										padding: '20px',
									}}>
									<span style={{ textAlign: 'center', overflowWrap: 'break-word', width: '100%' }}>{file.file_type}</span>
									<span style={{ textAlign: 'center', overflowWrap: 'break-word', width: '100%' }}>{file.url}</span>
								</div>
							)}

							<DeleteButton onClickHandler={() => onClickDeleteHandler(file.id)} />
						</div>
					))}
			</div>
		</>
	);
};

export default GalleryFilesFormSection;
