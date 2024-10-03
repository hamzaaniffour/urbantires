"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import Recipe from "@/public/assets/Newsletter/recipe.jpeg";
import { Vidaloka } from "next/font/google";

const vidaloka = Vidaloka({
  subsets: ["latin"],
  weight: "400",
});

interface NewsletterPopUpProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsletterPopUp: React.FC<NewsletterPopUpProps> = ({
  popup,
  setPopup,
}) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [result, setResult] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    setLoading(true);
    setResult({});

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult({ success: data.message || "Email sent successfully!" });
        // Clear form fields after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setResult({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 h-screen p-5 lg:pt-16">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[900px]">
              <div className="lg:flex">
                <div className="lg:w-5/12 hidden lg:block">
                  <div className="relative overflow-hidden flex justify-center items-start">
                    <div
                      className={`absolute inset-0 bg-gradient-to-t bg-center bg-cover`}
                      style={{ backgroundImage: `url(${Recipe.src})` }}
                    ></div>
                  </div>
                </div>
                <div className="lg:w-7/12">
                  <div className="bg-white p-8">
                    <div className="flex justify-end items-center">
                      <IoMdClose
                        className="text-slate-400 size-6 -mt-2.5 cursor-pointer"
                        onClick={() => setPopup(false)}
                      />
                    </div>
                    <h4
                      className={`${vidaloka.className} text-3xl font-semibold text-blue-950 mb-5`}
                    >
                      Keep in touch!
                    </h4>
                    <p className="text-slate-600 mb-5 text-sm">
                      Sign up we&#39;ll send you a seasonal recipe, easy
                      gardening idea, or fun entertaining tip that you can do at
                      home. (Know that I respect your privacy and will never
                      ever share your information.)
                    </p>
                    <p
                      className={`${vidaloka.className} text-3xl text-blue-950 font-bold lowercase mb-8`}
                    >
                      Elizabeth Carter
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendEmail();
                      }}
                    >
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="w-full">
                          <input
                            className="w-full bg-slate-200 outline-none text-blue-950 font-semibold rounded p-3"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                          />
                        </div>
                        <div className="w-full">
                          <input
                            className="w-full bg-slate-200 outline-none text-blue-950 font-semibold rounded p-3"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mb-3">
                        <div className="w-full">
                          <input
                            className="w-full bg-slate-200 outline-none text-blue-950 font-semibold rounded p-3"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={handleEmailChange}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="py-3 rounded bg-pink-600 transition-all duration-300 hover:bg-pink-700 text-white font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? "Signing up..." : "Yes, Sign me up"}
                      </button>
                    </form>
                    {result.success && (
                      <p className="text-green-500 mt-2">{result.success}</p>
                    )}
                    {result.error && (
                      <p className="text-red-500 mt-2">{result.error}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterPopUp;
