import React from "react";
import css from "./carousel-page.module.scss";
import { Link } from "react-router-dom";

type Shoe = {
  image: string;
  name: string;
  shortDescription: string;
  id: number;
};

type Props = {
  shoe: Shoe;
};

function CarouselPage(props: Props) {
  const { shoe } = props;
  return (
    <div className={css["page"]}>
      <div className={css["image"]}>
        <img src={shoe.image} alt=""/>
      </div>
      <div className={css["content"]}>
        <h2 className={css["title"]}>{shoe.name}</h2>
        <p className={css["desc"]}>{shoe.shortDescription}</p>
        <Link className={css["action-buy"]} to={`/detail/${shoe.id}`}>Buy now</Link>
      </div>
    </div>
  );
}

export default CarouselPage;
