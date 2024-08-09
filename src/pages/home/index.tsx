import { useEffect, useState } from "react";
import "../../styles/pages/_home.scss";
import axios from "axios";
import { CharacterInterface } from "../../types";
import CharacterCard from "./CharacterCard";

export default function HomePage() {
  const [data, setData] = useState<CharacterInterface[]>([]);
  const [getURL, setGetURL] = useState<string>("https://swapi.dev/api/people");
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCharacterData = async () => {
    const res = await axios.get(getURL);
    const temp = [...data];

    res.data.results.map((item: CharacterInterface) => {
      const imageUrl = `https://picsum.photos/seed/${item.name}/250/200`;
      temp.push({ ...item, avatar: imageUrl });
    });

    setData(temp);
    setIsLoading(false);
    if (res.data.next) {
      setGetURL(res.data.next);
    } else {
      setIsEnd(true);
    }
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    getCharacterData();
  };

  useEffect(() => {
    getCharacterData();
  }, []);

  return (
    <>
      <h1 className="title">Starwars Character Explorer</h1>
      <div className="card-board">
        {data ? (
          data.map((item, index) => (
            <CharacterCard key={`characterCard_${index}`} data={item} />
          ))
        ) : (
          <h1>There is no data to display</h1>
        )}
      </div>
      {isEnd ? null : (
        <button className="button" onClick={handleButtonClick}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
