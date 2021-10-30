import React from 'react'
import PanelHeader from "../PanelHeader";
import {recoverPassword, updateProfile} from "../../providers/authProvider";
import {AuthContext} from "../../providers/authProvider";
import UserAvatar from '../../img/anonymous_user.png'
import {storage} from '../../config/firebase'
import {uid} from 'uid';


const Settings = () => {
	const {state} = React.useContext(AuthContext)
	const [message, setMessage] = React.useState("")

	const uploadAvatar = (file) => {
		const ref = storage.ref()
		const id = uid(64)
		const childRef = ref.child(`avatar/${id}.png`)
		childRef.put(file).then((snapshot) => {
			setMessage('Profile picture successfully uploaded!')
			updateProfile({
				avatar:
					`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_PROJECT_ID}.appspot.com/o/avatar${encodeURIComponent('/') + id}.png?alt=media`
			}).then(() => {
				window.location.reload(false);
			})
		});
	}

	return (
		<>
			<PanelHeader name="Settings"/>
			<div className="min-h-full pt-20">

				{/* AVATAR */}
				<div className="flex justify-center items-center">
					<div className="w-60 h-60">
						<img
							className="shadow-md rounded-full w-60 h-60 object-cover"
							src={state.profile.avatar || UserAvatar}
							alt=''
						/>
					</div>
				</div>

				<p className="text-center pt-5 text-3xl font-bold hidden md:block group-hover:block pl-6">
					{state.profile.nickname}
				</p>

				<>
					<div className="flex justify-center items-center">
						<input onChange={(e) => uploadAvatar(e.target.files[0])} type="file" name="avatar"
						       accept="image/png, image/jpeg" className="bg-chatAction
								text-gray-100 text-center font-medium rounded-md mb-3
								border border-transparent items-center justify-center px-8 py-3 mt-7
								hover:bg-actionH cursor-pointer"/>

					</div>
					<div className="flex justify-center items-center">
						<button className="bg-chatAction  text-gray-100 text-center font-medium rounded-md mb-3
								border border-transparent items-center justify-center px-8 py-3
								hover:bg-actionH cursor-pointer">Download private key
						</button>
					</div>

					<div className="flex justify-center items-center">
						<button
							onClick={() => {
								recoverPassword(state.account.email)
								setMessage("An email has been send to your email address with the new password")
							}}
							className="bg-chatAction text-gray-100 text-center font-medium rounded-md mb-3
								border border-transparent items-center justify-center px-8 py-3
								hover:bg-actionH cursor-pointer">Change password
						</button>
					</div>
					<p className='flex justify-center items-center text-green-500 mt-2'>{message}</p>
				</>

			</div>

		</>
	)
}

export default Settings;