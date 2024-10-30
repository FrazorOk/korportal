import { emojiArray } from '../../constants/emoji';
import s from './EmojiList.module.css';

const EmojiList = ({ visibleStatus, setSmile }) => {
	return (
		<div>
			<ul className={`${s.emoji_list} ${visibleStatus && s.active}`}>
				{emojiArray.map((item, index) => (
					<button key={`emoji-key-${index}`} onClick={(e) => setSmile((text) => text + item.emoji)}>
						<span className={s.emoji_item}>{item.emoji}</span>
					</button>
				))}
			</ul>
		</div>
	);
};

export default EmojiList;
