import {
  getRepository,
  Repository,
} from "typeorm";

import {
  IFindUserByFullNameDTO,
  IFindUserWithGamesDTO,
} from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM

    let userWtGames = await this.repository.find({
      relations: ['games'],
      where: { id: user_id }
    })

    return userWtGames[0];
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {

    const usersFirstName = await
    this.repository
    .createQueryBuilder("user")
    .select('first_name')
    .orderBy("user.first_name", "ASC")
    .getRawMany();


    return usersFirstName; // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(); // Complete usando raw query
  }
} 
