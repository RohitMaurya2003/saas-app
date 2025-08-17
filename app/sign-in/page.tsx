
import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
};

export default Page;