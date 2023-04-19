import { getServerSession } from "next-auth"
import Link from "next/link"
import Button, { buttonVariants } from "@/ui/Button"
import SignInButton from "@/components/ui/SignInButton"
import SignOutButton from "@/components/ui/SignOutButton"
import ThemeToggle from "./ThemeToggle"
import { authOptions } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropDownMenu"

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div
      className="fixed backdrop:blur-sm bg-white/75 dark:bg-slate-900 
  z-50 top-0 left-0 right-0 h-20 border border-slate-300 dark:border-slate-700 
  shadow-sm flex items-center justify-between"
    >
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Text Similarity 1.0
        </Link>

        {/* <div className="md:hidden flex justify-between w-1/2"> */}
        <div className="md:hidden flex gap-2">
          <ThemeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href="/documentation"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Documentation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className={buttonVariants({ variant: "link" })}
                    href={"/dashboard"}
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className={buttonVariants({ variant: "link" })}
                    href={"/check-similarity"}
                  >
                    Check Similarity
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-center">
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignInButton />
          )}
          {/* <SignOutButton /> */}
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>

          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href={"/dashboard"}
              >
                Dashboard
              </Link>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href={"/check-similarity"}
              >
                Check Similarity
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
