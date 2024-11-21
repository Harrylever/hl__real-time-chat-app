/* eslint-disable prettier/prettier */
import clsx from 'clsx'

interface IFeature {
  icon: string
  title: string
  context: string
}

const ourFeaturesList: IFeature[] = [
  {
    icon: '/svg/features-icon-1.svg',
    title:
      'Your digital footprint gives only YOU access to your MX Chat account',
    context:
      "This powerful feature gives you complete control over your digital footprint, allowing you to engage in conversations with the peace of mind that sensitive or time-sensitive information can be seamlessly erased after serving its purpose. Whether you're discussing confidential matters or simply prefer to maintain a clutter-free chat environment, the incognito mode offers a convenient solution.",
  },
  {
    icon: '/svg/features-icon-2.svg',
    title: 'Connect with friends and family, anytime, anywhere with MX Chat',
    context:
      "Whether you're collaborating with colleagues, coordinating plans with friends, or engaging in lively discussions, MX Chat provides an unparalleled messaging experience. Our advanced infrastructure optimizes data transmission, ensuring that every word, every thought, reaches its destination instantaneously",
  },
  {
    icon: '/svg/features-icon-3.svg',
    title: 'Chat freely, confidentially. with MX Chat  incognito mode',
    context:
      "At MX Chat, we prioritize your privacy and security with our cutting-edge end-to-end message encryption technology. This robust encryption ensures that your messages remain confidential and protected from prying eyes, providing a secure communication channel. User privacy doesn't stop there, we also offer innovative incognito mode, giving the ability to delete messages within a selected time interval.",
  },
]

const OurFeaturesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-16">
      {ourFeaturesList.map((tab, index) => (
        <FeatureTab key={index} prop={tab} />
      ))}
    </div>
  )
}

const FeatureTab = ({ prop: { icon, title, context } }: { prop: IFeature }) => {
  return (
    <div
      className={clsx([
        'flex flex-col items-center justify-start gap-6 max-w-[390px] pb-5 px-5 border-b sm:border-none border-[#45454533] shadow-sm',
      ])}
    >
      <div className="h-fit w-fit">
        <img src={icon} alt={title} className="h-[50px] w-[50px]" />
      </div>

      {/*  */}
      <div className="">
        <p className="text-center text-sm font-medium">{title}</p>
      </div>

      {/*  */}
      <div>
        <p className="text-justify text-xs font-normal">{context}</p>
      </div>
    </div>
  )
}

export default OurFeaturesList
