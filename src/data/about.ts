import BuffaloNY from "@/assets/photos/BuffaloNY.jpg";
import UniversityOfOklahoma from "@/assets/photos/UniversityOfOklahoma.jpg";
import Stillwater from "@/assets/photos/Stillwater.jpg";
import UniversityOfOklahomaFootball from "@/assets/photos/UniversityOfOklahomaFootball.jpg";
import TexasRangers from "@/assets/photos/TexasRangers.jpg";
import OklahomaStateCowboys from "@/assets/photos/OSU.jpg";
import WoWMidnight from "@/assets/photos/WoW_Midnight.png";
import LeagueOfLegends from "@/assets/photos/LeagueOfLegends.jpg";
import Overwatch2 from "@/assets/photos/Overwatch2.jpg";
import RhineRiverCastle from "@/assets/photos/RhineRiverCastle.jpg";
import ParisFranceEiffelTower from "@/assets/photos/ParisFranceEiffelTower.jpg";
import GrandCaymanIsland from "@/assets/photos/GrandCaymanIsland.jpg";
import GameOfThrones from "@/assets/photos/GameOfThrones.jpg";
import Fallout from "@/assets/photos/Fallout.jpg";
import TheWalkingDead from "@/assets/photos/TheWalkingDead.jpg";
import TheOutsiders from "@/assets/photos/TheOutsiders.jpeg";
import Hadestown from "@/assets/photos/Hadestown.jpg";
import TheLionKing from "@/assets/photos/TheLionKing.jpeg";

export interface AboutItem {
  title: string;
  image: string;
  // Optional second line under the caption, for a card that needs a joke or a
  // bit of context the title cannot carry on its own.
  note?: string;
}

export interface AboutSection {
  heading: string;
  items: AboutItem[];
}

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    heading: "Places",
    items: [
      { title: "Live: Go Pokes, Oklahoma", image: Stillwater },
      { title: "Study: Boomer Sooner, Oklahoma", image: UniversityOfOklahoma },
      { title: "Born: Buffalo, New York", image: BuffaloNY },
    ],
  },
  {
    heading: "Sports",
    items: [
      { title: "Oklahoma Sooners", image: UniversityOfOklahomaFootball },
      { title: "Texas Rangers", image: TexasRangers },
      {
        title: "Oklahoma State Cowboys",
        image: OklahomaStateCowboys,
        note: "House divided: my alma mater says Sooner, my fiancée says Cowboy. She won. I have never owned this much orange.",
      },
    ],
  },
  {
    heading: "Games",
    items: [
      { title: "World of Warcraft", image: WoWMidnight },
      { title: "League of Legends", image: LeagueOfLegends },
      { title: "Overwatch 2", image: Overwatch2 },
    ],
  },
  {
    heading: "Travel",
    items: [
      { title: "Rhine River Castles, Germany", image: RhineRiverCastle },
      { title: "Paris, France", image: ParisFranceEiffelTower },
      { title: "Grand Cayman Islands", image: GrandCaymanIsland },
    ],
  },
  {
    heading: "TV",
    items: [
      { title: "Game of Thrones", image: GameOfThrones },
      { title: "Fallout", image: Fallout },
      { title: "The Walking Dead", image: TheWalkingDead },
    ],
  },
  {
    heading: "Broadway",
    items: [
      { title: "The Outsiders", image: TheOutsiders },
      { title: "Hadestown", image: Hadestown },
      { title: "The Lion King", image: TheLionKing },
    ],
  },
];
