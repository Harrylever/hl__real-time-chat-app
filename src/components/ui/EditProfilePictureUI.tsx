import { useAppSelector } from 'src/app'

const EditProfilePictureUI = () => {
  const { user } = useAppSelector((state) => state.userReduce)

  if (!user) return null

  return (
    <div>
      <label htmlFor="profile-image">
        <div className="py-2.5 px-4 bg-mx-primary-9">
          <p className="text-sm text-mx-primary font-normal">Click here</p>
        </div>

        <div>
          <img
            src={user.profileImage}
            alt={user.fullname + ' Profile Picture'}
            width={0}
            height={0}
            className="w-[30px] h-auto"
          />
        </div>

        <input type="text" name="profile-image" id="profile-image" />
      </label>
    </div>
  )
}

export default EditProfilePictureUI
