import FAQDiv from '../FAQDiv'
import DefaultWidth from '../DefaultWidth'

const FAQSection = () => {
  return (
    <section className="w-full h-[58vh] lg:h-[60vh] relative bg-mx-white flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute top-0 z-10 bg-mx-primary w-full h-[29vh]"></div>
      <div className="relative z-20 w-full">
        <DefaultWidth>
          <div className="relative w-full bg-mx-primary-9 px-6 rounded-md pb-6 md:py-10">
            <img
              src="/png/faq-vectors.png"
              alt="FAQ"
              className="absolute z-20 -right-5 sm:right-20"
            />
            <div className="flex flex-col items-center justify-start gap-6 mx-auto max-w-[500px] pt-[20px]">
              <p className="text-mx-black font-medium text-base text-center">
                Frequently asked questions
              </p>
              <p className=" text-mx-grey-2 font-normal text-xs text-center">
                Clear all your confusions and reservations, ask us anything and
                the team will provide swift responses.
              </p>

              <div className="w-full">
                <FAQDiv />
              </div>
            </div>
          </div>
        </DefaultWidth>
      </div>
    </section>
  )
}

export default FAQSection
