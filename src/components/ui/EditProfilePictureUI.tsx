import { useAppSelector } from 'src/app'

const EditProfilePictureUI = () => {
  const user = useAppSelector((state) => state.userReduce)

  return (
    <div>
      <label htmlFor="profile-image">
        <div className="py-2.5 px-4 bg-mx-primary-9">
          <p className="text-sm text-mx-primary font-normal">Click here</p>
        </div>

        <div>
          <img src={user.imgUri} alt={user.fullname + ' Profile Picture'} />
        </div>

        <input type="text" name="profile-image" id="profile-image" />
      </label>
    </div>
  )
}

export default EditProfilePictureUI
