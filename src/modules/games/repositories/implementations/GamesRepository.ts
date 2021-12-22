import "../../entities/Game";

import {
  getRepository,
  Repository,
} from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from '../../../games/entities/Game'
import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private a: Game;

  constructor() {
    this.a = new Game()
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const [Game, number] = await this.repository.
      createQueryBuilder("games")
      .getManyAndCount(); // Complete usando raw query

    return [{ count: number.toString() }]
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder();
    // Complete usando query builder
  }
}

