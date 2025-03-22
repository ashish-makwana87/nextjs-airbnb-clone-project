"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function ReviewComment({ comment }: { comment: string }) {
  const [isFullCommentShown, setIsFullCommentShown] = useState(false);

  const words = comment.split(" ");
  const isLongComment = words.length > 35;

  const shortComment = words.slice(0, 35).join(" ");

  return (
    <div className='overflow-hidden'>
      <p className='text-sm text-muted-foreground mt-2 md:mt-3'>
        {isFullCommentShown ? comment : isLongComment ? shortComment : comment}
      </p>
      {isLongComment && (
        <Button
          variant='link'
          className='pl-0 text-black text-sm'
          onClick={() => setIsFullCommentShown(!isFullCommentShown)}
        >
          {isFullCommentShown ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}

export default ReviewComment;
