import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";

const logsnag = new LogSnag({
  token: "LOGSNAG_TOKEN",
  project: "PROJECT_NAME",
});

const track = async () => {
  await logsnag.track({
    channel: "yes",
    event: "Valentine's Day",
    description: "She said yes!",
    icon: "💖",
    notify: true,
  });
};

function App() {
  const steps = [
    {
      content: "Hey, Bestiee",
      image: "/character/one.png",
    },
    {
      content: `It's been 1 year, 4 months, and 3 days.
      Our love for each other still blossoms.
      `,
      image: "/character/two.png",
    },
    {
      content: `In the good, the bad and ugly days. You show me genuine love ❤️. Always.
      `,
      image: "/character/three.png",
    },
    {
      content: `You're beautiful, you're fun, you're so cute,
and you make spending time together feel so short.`,
      image: "/character/four.png",
    },
    {
      content: `Each day, I look forward to seeing you again,
hold your hands, look into your pretty eyes, and kiss you.`,
      image: "/character/five.png",
    },
    {
      content: "In this season of love Lerato Laka…",
      image: "/character/six.png",
    },
    {
      content: "Will you be my Valentine?",
      image: "/character/seven.png",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [sheWantsToBeMyValentine, setSheWantsToBeMyValentine] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const imagePaths = [
      ...steps.map((step) => step.image),
      "/character/yayyyy.png",
    ];

    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  return (
    <>
      {sheWantsToBeMyValentine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed top-0 left-0 w-full h-full bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Yayyyyyyy!!!!!
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt=""
              className="w-40 animate-bounce"
            />
          </div>
        </motion.div>
      )}
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.img
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={steps[currentStep].image}
          alt=""
          className="w-40"
        />
        <motion.div
          key={currentStep + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-josefin text-4xl font-bold"
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < 6 && (
          <>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Next
            </button>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90"
              >
                Back
              </button>
            )}
          </>
        )}
        {currentStep === 6 && (
          <>
            <button
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Yes
            </button>

            <button
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold"
            >
              Yes
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
