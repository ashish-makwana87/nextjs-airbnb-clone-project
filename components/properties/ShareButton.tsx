'use client'

import { LuShare2 } from "react-icons/lu";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon} from 'react-share'

function ShareButton({propertyId, name}: {propertyId: string, name: string}) {


 const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
 const shareLink = `${url}/properties/${propertyId}`

  return (
    <Popover>
     <PopoverTrigger asChild>
     <Button variant='outline' size='icon' className="p-2"><LuShare2 /></Button>
     </PopoverTrigger>
     <PopoverContent side="top" sideOffset={10} align="center" className="flex items-center justify-center gap-x-2 w-full " >
     <TwitterShareButton url={shareLink} title={name} >
      <TwitterIcon size={28} round />
     </TwitterShareButton>
     <FacebookShareButton url={shareLink} title={name} >
      <FacebookIcon size={28} round />
     </FacebookShareButton>
     <LinkedinShareButton url={shareLink} title={name} >
     <LinkedinIcon size={28} round />
     </LinkedinShareButton>
     </PopoverContent>
    </Popover>
  )
}

export default ShareButton