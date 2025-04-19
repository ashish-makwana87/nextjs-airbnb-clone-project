import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FaBars } from "react-icons/fa6";
import navLinks from "@/utils/links";
import UserIcon from "./UserIcon";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Separator } from "../ui/separator";
import SignoutLink from "./SignOutLink";

// dropdown stays open after navigating to pages, we can use "use client" and implement "usePathname" hook to resolve it. --code-- const pathName = usePathname() -- <DropdownMenu key={pathName}> --code-- But then we can't import server only component "UserIcon" inside client component.

function LinksDropdown() {
  const { userId } = auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='bg-transparent border-2 border-[#6c6c6c] flex gap-x-3 items-center justify-center focus:outline-none'
        >
          <UserIcon />
          <FaBars className='w-6 h-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36' align='start' sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full capitalize text-left'>signin</button>
            </SignInButton>{" "}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button className='w-full capitalize text-left'>signup</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {navLinks.map((item) => {

            if (userId !== process.env.ADMIN_USERID && item.label === 'admin') {return null};

            return (
              <DropdownMenuItem key={item.label}>
                <Link href={item.href} className='capitalize w-full'>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <Separator />
          <DropdownMenuItem>
            <SignoutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
