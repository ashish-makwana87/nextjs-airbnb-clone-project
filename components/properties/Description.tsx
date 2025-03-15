'use client';
import { useState } from "react";
import { Button } from "../ui/button";


function Description({description, title}:{description: string, title:string}) {
 
 const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
 const words = description.split(' ');
 const isLongDescription = words.length > 90;
 const shortDescription = words.splice(0, 90).join(' ')

  return (
    <div className="mt-4">
    <h4 className="head-5 capitalize mb-2">{title}</h4>
    <p className="text-muted-foreground">{isFullDescriptionShown ? description : isLongDescription ? `${shortDescription}...` : description}</p>
    {isLongDescription && <Button variant='link' onClick={() => setIsFullDescriptionShown(!isFullDescriptionShown)} className="p-0 capitalize" >{isFullDescriptionShown ? 'show less' : 'show more'}</Button>}
    </div>
  )
}

export default Description