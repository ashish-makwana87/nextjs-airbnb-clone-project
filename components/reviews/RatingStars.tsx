import { FaRegStar, FaStar } from "react-icons/fa";

function RatingStars({rating}:{rating: number}) {
 
 const stars = Array.from({length: 5}, (_,i) => i + 1 <= rating)

  return (
    <div className="flex items-center gap-x-1 mt-1">
     {stars.map((item, i) => {
      return item ? <FaStar key={i} className="text-xs text-[#e91d54]" /> : <FaRegStar key={i} className="text-xs text-gray-500" />;
     })}
    </div>
  )
}

export default RatingStars