import clsx from "clsx";
import Moment from 'react-moment';


const ChatPreview = ({name, avatar, timestamp, isNewMessage}) => {
	return (
		<div
			className="flex justify-between items-center p-3 hover:bg-chatAction rounded-lg relative">
			<div className="w-16 h-16 relative flex flex-shrink-0">
				<img
					className="shadow-md rounded-full w-full h-full object-cover"
					src={avatar}
					alt={name}
				/>
			</div>
			<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
				<p className={clsx('', isNewMessage && 'font-bold')}> {name}</p>
				<div className={clsx('flex items-center text-sm', {
					'font-bold text-white': isNewMessage,
					'text-gray-600': !isNewMessage
				})}>
					<div className="min-w-0">
						<p className="truncate">Hey, Are you there?</p>
					</div>
					<p className="ml-2 whitespace-no-wrap">
						<Moment unix date={timestamp} format="HH:mm" durationFromNow/>
					</p>
				</div>
			</div>
			{isNewMessage && <div
				className="bg-newMessage w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"/>
			}
			{/*	TODO: seen functionality*/}
		</div>
	)
}

export default ChatPreview;