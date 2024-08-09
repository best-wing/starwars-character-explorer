import { useState } from "react";
import "../../styles/components/_characterCard.scss";
import { CharacterInterface } from "../../types";
import DetailModal from "./DetailModal";

interface Props {
  data: CharacterInterface;
}

export default function CharacterCard({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card" onClick={handleCardClick}>
        <img className="card-img" src={data.avatar} alt={data.name} />
        <h5 className="card-title">{data.name}</h5>
      </div>
      {showModal && <DetailModal data={data} onClose={handleCloseModal} />}
    </>
  );
}
