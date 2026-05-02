import BuffaloNY from "@/assets/photos/BuffaloNY.jpg";
import UniversityOfOklahoma from "@/assets/photos/UniversityOfOklahoma.jpg";
import Stillwater from "@/assets/photos/Stillwater.jpg";
import UniversityOfOklahomaFootball from "@/assets/photos/UniversityOfOklahomaFootball.jpg";
import TexasRangers from "@/assets/photos/TexasRangers.jpg";
import BakerMayfieldBucs from "@/assets/photos/BakerMayfieldBucs.jpeg";
import WoWMidnight from "@/assets/photos/WoW_Midnight.png";
import Overwatch2 from "@/assets/photos/Overwatch2.jpg";
import CallOfDuty from "@/assets/photos/CallOfDuty.jpg";
import RhineRiverCastle from "@/assets/photos/RhineRiverCastle.jpg";
import ParisFranceEiffelTower from "@/assets/photos/ParisFranceEiffelTower.jpg";
import GrandCaymanIsland from "@/assets/photos/GrandCaymanIsland.jpg";
import GameOfThrones from "@/assets/photos/GameOfThrones.jpg";
import TheWalkingDead from "@/assets/photos/TheWalkingDead.jpg";
import FamilyGuy from "@/assets/photos/FamilyGuy.png";
import Land from "@/assets/photos/Land.jpg";
import AQuietPlace from "@/assets/photos/AQuietPlace.jpg";
import EagleEye from "@/assets/photos/EagleEye.jpg";

export interface AboutItem {
  title: string;
  image: string;
}

export interface AboutSection {
  heading: string;
  items: AboutItem[];
}

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    heading: "Places",
    items: [
      { title: "Now: Stillwater, Oklahoma", image: Stillwater },
      { title: "School: Boomer Sooner, Oklahoma", image: UniversityOfOklahoma },
      { title: "Hometown: Buffalo, New York", image: BuffaloNY },
    ],
  },
  {
    heading: "Sports",
    items: [
      { title: "Oklahoma Sooners", image: UniversityOfOklahomaFootball },
      { title: "Texas Rangers", image: TexasRangers },
      { title: "Tampa Bay Buccaneers", image: BakerMayfieldBucs },
    ],
  },
  {
    heading: "Games",
    items: [
      { title: "World of Warcraft", image: WoWMidnight },
      { title: "Overwatch 2", image: Overwatch2 },
      { title: "Call of Duty", image: CallOfDuty },
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
      { title: "The Walking Dead", image: TheWalkingDead },
      { title: "Family Guy", image: FamilyGuy },
    ],
  },
  {
    heading: "Movies",
    items: [
      { title: "Land (2021)", image: Land },
      { title: "A Quiet Place (2018)", image: AQuietPlace },
      { title: "Eagle Eye (2008)", image: EagleEye },
    ],
  },
];
