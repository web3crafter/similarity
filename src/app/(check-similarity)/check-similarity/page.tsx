import CheckSimilarity from "@/components/CheckSimilarity"
import Paragraph from "@/components/ui/Paragraph"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Similarity API | Check Similarity",
  description: "Free and open-source text similarity API",
}

const page = async () => {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  })
  return (
    <div className="max-w-5xl mx-auto mt-16 self-center">
      {apiKey ? (
        <CheckSimilarity />
      ) : (
        <div className=" flex flex-col self-center">
          <Paragraph className="self-center">
            You need to create an API Key
          </Paragraph>
          <Link
            href="/dashboard"
            className="self-center text-slate-700 dark:text-slate-300"
          >
            Click here to request an API Key
          </Link>
        </div>
      )}
    </div>
  )
}

export default page
