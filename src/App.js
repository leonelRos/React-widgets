import Accordion from "./components/Accordion";
import Search from "./components/Search";
import "./App.css";

const items = [
  {
    title: "What is React?",
    content: "React is a front end javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components",
  },
];

const App = () => {
  return (
    <div>
      <Accordion items={items} />
      <br />
      <Search />
    </div>
  );
};

export default App;
