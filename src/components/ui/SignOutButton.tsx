"use client";
import { FC, useState } from "react";
import Button from "./Button";
import { signIn, signOut } from "next-auth/react";
import { toast } from "./Toast";

interface SignOutButtonProps {}

const SignUserOut: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error Signing In out",
        message: "Please try again later",
        type: "error",
      });
    }
  };
  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign Out
    </Button>
  );
};

export default SignUserOut;
