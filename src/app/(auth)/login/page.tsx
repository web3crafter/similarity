import { FC } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/Button"
import LargeHeading from "@/components/ui/LargeHeading"
import Icons from "@/components/Icons"
import UserAuthForm from "@/components/UserAuthForm"
import Paragraph from "@/components/ui/Paragraph"

const page: FC = () => {
  return (
    // Styling the page
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-start space-y-6 max-w-lg">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Creating a link to go back to the home page */}
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "w-fit",
            })}
            href="/"
          >
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          {/* Adding a large heading, paragraph and rendering UserAuthForm component to the page */}
          <LargeHeading>Welcome Back!</LargeHeading>
          <Paragraph>Please sign in using your google account</Paragraph>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}

export default page
