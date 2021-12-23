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

  async findByTitleContaining(param: string): Promise<Game[]> {// Complete usando query builder
    const games =
      this.repository
        .createQueryBuilder('game')
        .where(`game.title ILIKE '%${param}%' `)
        .getMany();


    return games


  }

  async countAllGames(): Promise<[{ count: string }]> {
    const [Game, number] = await this.repository.
      createQueryBuilder("games")
      .getManyAndCount(); // Complete usando raw query

    return [{ count: number.toString() }]
  }

  async findUsersByGameId(id: string): Promise<User[]> {// Complete usando query builder
    const userWtGms =
      getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.games', 'game')
        .where('game.id = :id', { id })
        .getMany()
    /* this.repository
      .createQueryBuilder('game')
      .innerJoin('game.users', 'user')
      .where('game.id = :id', { id: id })
      .getMany() */


    return userWtGms

  }
}

