import { FaAngleRight } from "react-icons/fa6";

export default function CallToActionCard() {
  return (
    <div className="flex flex-col items-center justify-center shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] bg-[#F5F5F5] w-full h-[450px] rounded-[24px]">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[#1D1E20] font-bold text-center text-3xl md:text-[44px]">
            Do you have any market
          </h2>
          <h2 className="text-[#1D1E20] font-bold text-center text-3xl md:text-[44px]">
            research problem?
          </h2>
        </div>

        <p className="text-[#31373D] text-sm md:text-[16px]">
          We can provide a Quality Research and Fieldwork!
        </p>
        <button className="text-[#ffffff] flex items-center group gap-2 bg-[#000000] cursor-pointer px-5 py-3 rounded-full hover:bg-[#181717] transition-colors">
          Get stated now
          <FaAngleRight className="ml-2 group-hover:ml-4 transition-all" />
        </button>
      </div>
    </div>
  );
}
