export const ShowMore = ({ title, onClickShowMore }: { title: string, onClickShowMore: () => void }) => {
	return <button className='btn secondary mt-10 w-full' onClick={() => onClickShowMore()}>
		{ title }
	</button>
};
