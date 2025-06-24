import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FirstPage from "./firstpage";
import Loader from "../components/ui/loader";

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const { data, error } = await supabase.from("problems").select("*");
    if (error) return console.error(error);
    setProblems(data);
    setFiltered(data);
  };

  const getColor = (level) =>
    level === "Easy"
      ? "text-green-400"
      : level === "Medium"
      ? "text-yellow-400"
      : "text-red-400";

  const getEmoji = (level) =>
    level === "Easy" ? "🟢" : level === "Medium" ? "🟡" : "🔴";

  const handleToggleSolved = async (id, currentValue) => {
    console.log(`Updating problem ID ${id}, solved: ${!currentValue}`);
    const { error } = await supabase
      .from("problems")
      .update({ solved: !currentValue })
      .eq("id", id);

    if (!error) {
      const updated = problems.map((p) =>
        p.id === id ? { ...p, solved: !currentValue } : p
      );
      setProblems(updated);
      setFiltered(updated);
    }
  };

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.topic]) acc[item.topic] = {};
    if (!acc[item.topic][item.difficulty])
      acc[item.topic][item.difficulty] = [];
    acc[item.topic][item.difficulty].push(item);
    return acc;
  }, {});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="p-6 h-screen overflow-y-auto max-w-5xl mx-auto text-white ">
      <h1 className="text-3xl font-bold mb-6 text-center">DSA Problem Sets</h1>

      {Object.entries(grouped).map(([topic, levels], index) => (
        <div
          key={index}
          className="mb-4 rounded-xl shadow-lg bg-white/10 backdrop-blur-md hover:bg-white/15"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value={topic}>
              <AccordionTrigger className="text-xl px-4 py-2 font-semibold">
                {topic}
              </AccordionTrigger>
              <AccordionContent className="bg-white/10 backdrop-blur-md px-4 py-2">
                <Accordion type="single" collapsible>
                  {Object.entries(levels).map(([level, items], idx) => (
                    <AccordionItem key={idx} value={`${topic}-${level}`}>
                      <AccordionTrigger
                        className={`text-md ${getColor(
                          level
                        )} hover:opacity-80`}
                      >
                        {getEmoji(level)} {level}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-300 space-y-2">
                        {items.map((problem, pIndex) => (
                          <div
                            key={pIndex}
                            className="flex items-center justify-between border-b border-gray-700 pb-2"
                          >
                            <div className="flex flex-col">
                              <a
                                href={problem.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline text-white"
                              >
                                {problem.title}
                              </a>
                              <span className="text-xs text-gray-500">
                                {problem.url?.includes("leetcode")
                                  ? "LeetCode"
                                  : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-xs">Solved</label>
                              <input
                                type="checkbox"
                                checked={problem.solved}
                                onChange={() =>
                                  handleToggleSolved(problem.id, problem.solved)
                                }
                                className="accent-green-700 h-4 w-4"
                              />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
      <div className="fixed bottom-5 right-5 mb-4 rounded-xl shadow-lg bg-white/10 backdrop-blur-md hover:bg-white/80">
        <Link to={"/firstpage"}>
          <Button>Ask AI</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
