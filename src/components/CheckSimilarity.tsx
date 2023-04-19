"use client"

import { FC, useState } from "react"
import { Input } from "./ui/Input"
import Paragraph from "./ui/Paragraph"
import Button from "./ui/Button"
import { TextArea } from "./ui/TextArea"
import LargeHeading from "./ui/LargeHeading"
import axios from "axios"
import { toast } from "./ui/Toast"

const CheckSimilarity: FC = () => {
  const [text1, setText1] = useState<string>("")
  const [text2, setText2] = useState<string>("")
  const [apiKey, setApiKey] = useState<string>("")
  const [similarity, setSimilarity] = useState()
  const [similarityColor, setSimilarityColor] = useState("green-500")

  const makingRequest = async (
    text1: string,
    text2: string,
    apiKey: string
  ) => {
    try {
      const { data } = await axios.post(
        `${window.location.origin}/api/v1/similarity/`,
        {
          text1: text1,
          text2: text2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: apiKey,
          },
        }
      )

      const similarityData = data.similarity.toString().slice(0, 4)
      setSimilarity(similarityData)
    } catch (error) {
      console.log("error:", error)
      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      })
    }
  }

  return (
    <div className="flex flex-col ">
      <LargeHeading className="self-center">
        Check Similarity between two texts
      </LargeHeading>

      <div className="w-2/4 flex flex-col mt-10 self-center">
        <Paragraph className="">API Key:</Paragraph>
        <Input
          type="text"
          placeholder={"Your api key"}
          className="w-2/3 self-center"
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      {similarity ? (
        <div className="self-center mt-5">
          <Paragraph className="self-center">Similarity:</Paragraph>
          <Input
            className={`${
              similarity <= 0.35
                ? "dark:text-red-600 text-red-600"
                : similarity > 0.35 && similarity <= 0.65
                ? "dark:text-yellow-600 text-yellow-500"
                : "dark:text-green-600 text-green-600"
            } w-24 font-bold disabled:opacity-100`}
            readOnly
            disabled
            value={similarity}
          />
        </div>
      ) : null}

      <div className="w-3/4 flex flex-col md:flex-row md:justify-between self-center gap-6 mt-10">
        <div className="flex flex-col ">
          <Paragraph className="self-center">Text 1:</Paragraph>
          <TextArea
            className="h-28 w-96 self-center"
            placeholder="Input first text"
            onChange={(e) => setText1(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <Paragraph className="self-center">Text 2:</Paragraph>
          <TextArea
            className="h-28 w-96 self-center"
            placeholder="Input second text"
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-2 grid-rows-1 gap-6  ">
        <div className=" row-span-1 col-span-1 flex flex-col mt-10">
          <Paragraph className="self-center mt-5">Text 1:</Paragraph>
          <TextArea
            className="h-28 self-center"
            placeholder="Input first text"
            onChange={(e) => setText1(e.target.value)}
          />
        </div>

        <div className=" row-span-1 col-span-1 flex flex-col mt-10">
          <Paragraph className="self-center mt-5">Text 2:</Paragraph>
          <TextArea
            className="h-28 self-center"
            placeholder="Input second text"
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
      </div> */}

      <Button
        className="self-center mt-5"
        onClick={() => makingRequest(text1, text2, apiKey)}
      >
        Check Similarity
      </Button>
    </div>
  )
}

export default CheckSimilarity
