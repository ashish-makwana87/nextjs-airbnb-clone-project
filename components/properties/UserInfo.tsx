import Image from "next/image"

type InfoObject = {firstName: string, image: string}


function UserInfo({userInfo}:{userInfo: InfoObject}) {
  

 return (
    <div className="mt-2 md:mt-4 flex items-center gap-x-2 md:gap-x-4">
     <Image src={userInfo.image} alt={userInfo.firstName} width={500} height={500} className="h-10 w-10 rounded-sm" />
     <div >
      <p className="text-sm md:text-base">Hosted by <span className="font-semibold capitalize">{userInfo.firstName}</span></p>
      <p className="text-muted-foreground text-sm md:text-base">Superhost | 2 years of hosting</p>
     </div>
    </div>
  )
}

export default UserInfo