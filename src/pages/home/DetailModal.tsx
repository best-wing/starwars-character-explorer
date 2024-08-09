import "../../styles/components/_detailModal.scss";
import { CharacterInterface } from "../../types";

interface Props {
  data: CharacterInterface;
  onClose: () => void;
}

export default function DetailModal({ data, onClose }: Props) {
  const formatHeight = (height: number) => {
    if (height < 100) {
      return `${height} cm`;
    } else {
      const meters = Math.floor(height / 100);
      const centimeters = height % 100;
      return `${meters}m ${centimeters}cm`;
    }
  };

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{data.name}</h2>
        <ul className="modal-list">
          <li>
            <b>Height:</b> {formatHeight(data.height)}
          </li>
          <li>
            <b>Mass:</b> {data.mass} Kg
          </li>
          <li>
            <b>Added:</b> {formatDate(data.created)}
          </li>
          <li>
            <b>Number of films:</b> {data.films.length}
          </li>
          <li>
            <b>Birth Year:</b> {data.birth_year}
          </li>
        </ul>
      </div>
    </div>
  );
}
