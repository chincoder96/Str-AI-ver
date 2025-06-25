import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Home from "./home";
import Loader from "@/components/ui/loader";
import { useUser } from "@clerk/clerk-react";

const Intro = () => {
  const [easyProgress, setEasyProgress] = useState(0);
  const [mediumProgress, setMediumProgress] = useState(0);
  const [hardProgress, setHardProgress] = useState(0);
  const [arrayProgress, setArrayProgress] = useState(0);
  const [stringProgress, setStringProgress] = useState(0);
  const [recursionProgress, setRecursionProgress] = useState(0);
  const [stackProgress, setStackProgress] = useState(0);
  const [queueProgress, setQueueProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchSolvedData = async (difficulty, setProgress) => {
      const { data: allProblems, error } = await supabase
        .from("problems")
        .select("*")
        .eq("difficulty", difficulty);

      const solved = allProblems.filter((p) => p.solved);
      const percent =
        allProblems.length === 0
          ? 0
          : Math.round((solved.length / allProblems.length) * 100);

      setProgress(percent);
    };

    fetchSolvedData("Easy", setEasyProgress);
    fetchSolvedData("Medium", setMediumProgress);
    fetchSolvedData("Hard", setHardProgress);
  }, []);

  useEffect(() => {
    const fetchSolvedData = async (topic, setProgress) => {
      const { data: allProblems, error } = await supabase
        .from("problems")
        .select("*")
        .eq("topic", topic);

      const solved = allProblems.filter((p) => p.solved);
      const percent =
        allProblems.length === 0
          ? 0
          : Math.round((solved.length / allProblems.length) * 100);

      setProgress(percent);
    };

    fetchSolvedData("Arrays", setArrayProgress);
    fetchSolvedData("Strings", setStringProgress);
    fetchSolvedData("Recursions", setRecursionProgress);
    fetchSolvedData("Stacks", setStackProgress);
    fetchSolvedData("Queues", setQueueProgress);
  }, []);

  const handleGetStarted = async () => {
    try {
      await user.update({
        unsafeMetadata: { role: "basic" },
      });
      navigate("/home");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="h-screen overflow-y-auto text-white flex flex-col items-center gap-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Str-AI-ver
      </h1>
      <div className="max-w-4xl text-lg">
        <p>
          Str-AI-ver is your intelligent companion for mastering Data Structures
          and Algorithms. This app brings you a curated set of
          problems—organized by topic and difficulty and contains AI-powered
          assistance to help you every step of the way.Whether you're preparing
          for placements, coding interviews, or just building confidence in DSA,
          Str-AI-ver brings together the roadmap for DSA and the power of AI to
          accelerate your journey. What makes Str-AI-ver special?
        </p>
        <ul>
          <li>
            ✅ Structured practice: Solve problems sorted by topic and
            difficulty (Easy, Medium, Hard).
          </li>
          <li>
            🧠 Instant AI help: Stuck? Get hints, explanations, and optimized
            solutions powered by AI.
          </li>
          <li>
            📈 Progress tracking: Mark problems as solved and visualize your
            growth with dynamic progress rings.
          </li>
          <li>
            🔗 LeetCode integration: Practice directly on LeetCode with problem
            links.
          </li>
        </ul>
      </div>
      <div className="mb-2 rounded-xl shadow-lg bg-white/10 backdrop-blur-md hover:bg-white/80">
        <Link to={"/home"}>
          <Button
            onClick={handleGetStarted}
            className="bg-green-950 hover:bg-green-800 text-white text-lg px-6 py-3 rounded-xl font-semibold"
          >
            Start Solving
          </Button>
        </Link>
      </div>

      <div className="text-3xl font-bold">Progress by Difficulty</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={easyProgress}
            gaugePrimaryColor="#22c55e"
            gaugeSecondaryColor="#1e3a1e"
          />
          <span className="mt-2 text-green-400 font-semibold">Easy</span>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={mediumProgress}
            gaugePrimaryColor="#eab308"
            gaugeSecondaryColor="#78350f"
          />
          <span className="mt-2 text-yellow-400 font-semibold">Medium</span>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={hardProgress}
            gaugePrimaryColor="#ef4444"
            gaugeSecondaryColor="#7f1d1d"
          />
          <span className="mt-2 text-red-400 font-semibold">Hard</span>
        </div>
      </div>

      <div className="text-3xl font-bold">Progress by Topic</div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 mb-10">
        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={arrayProgress}
            gaugePrimaryColor="#22c55e"
            gaugeSecondaryColor="#1e3a1e"
          />
          <span className="mt-2 text-green-400 font-semibold">Arrays</span>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={stringProgress}
            gaugePrimaryColor="#eab308"
            gaugeSecondaryColor="#78350f"
          />
          <span className="mt-2 text-yellow-400 font-semibold">Strings</span>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={recursionProgress}
            gaugePrimaryColor="#ef4444"
            gaugeSecondaryColor="#7f1d1d"
          />
          <span className="mt-2 text-red-400 font-semibold">Recursions</span>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={stackProgress}
            gaugePrimaryColor="#eab308"
            gaugeSecondaryColor="#78350f"
          />
          <span className="mt-2 text-red-400 font-semibold">Stacks</span>
        </div>

        <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            value={queueProgress}
            gaugePrimaryColor="#22c55e"
            gaugeSecondaryColor="#1e3a1e"
          />
          <span className="mt-2 text-red-400 font-semibold">Queues</span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
