interface UserAvatarProps {
  image: string
  alt: string
  isOnline: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, alt, isOnline }) => {
  return (
    <div className="w-fit border-2 border-[#ffffff73] rounded-full hover:border-white relative">
      <img
        src={image}
        alt={alt}
        width={0}
        height={0}
        className="rounded-full h-[50px] w-[50px] shadow-lg overflow-hidden"
      />
      {isOnline && (
        <div className="rounded-full h-[10px] w-[10px] bg-mx-primary-4 absolute bottom-[8%] left-[75%]"></div>
      )}
    </div>
  )
}

export default UserAvatar
