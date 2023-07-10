class CharacterDetail {
  firstName: string;
  lastName: string;
  height: string;
  birthYear: string;
  mass: string;
  hair: string;
  skin: string;
  eye: string;
  gender: string;
  homeWorld: string;
  movies: string[];
  starships: string[];
  stanceUrl: string;

  constructor(detail: any) {
    var name = detail["name"];

    this.firstName = name.split(" ")[0];
    this.lastName = name.split(" ")[1];

    this.height = detail["height"];
    this.mass = detail["mass"];
    this.hair = detail["hair"];
    this.birthYear = detail["birthYear"];

    this.skin = detail["skin"];
    this.eye = detail["eye"];
    this.gender = detail["gender"];

    this.homeWorld = detail["homeWorld"];
    this.movies = detail["movies"];
    this.starships = detail["starships"];
    this.stanceUrl = detail["stanceUrl"];
  }
}

export default CharacterDetail;
