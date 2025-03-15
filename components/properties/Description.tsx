'use client';
import { useState } from "react";
import { Button } from "../ui/button";


function Description({description, title}:{description: string, title:string}) {
 
 const [fullDescription, setFullDescription] = useState(false);
 const words = description.split(' ');
 const isLongDescription = words.length > 80;
 const shortDescription = words.splice(0, 100).join(' ')

  return (
    <div className="mt-4">
    <h4 className="head-5 capitalize mb-2">{title}</h4>
    <p>{fullDescription ? description : isLongDescription ? `${shortDescription}...` : description}</p>
    {isLongDescription && <Button variant='link' onClick={() => setFullDescription(!fullDescription)} className="mt-2 p-0 capitalize" >{fullDescription ? 'show less' : 'show more'}</Button>}
    </div>
  )
}

export default Description