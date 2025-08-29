import UserRepository from "../repositories/model_repositories/user_repository";
import DuoRepository from "../repositories/model_repositories/duo_repository";
import db from "../../database/db";

class BaseService {
    userRepository: UserRepository;
    duoRepository: DuoRepository

    constructor(database: typeof db) {
        this.userRepository = new UserRepository(database);
        this.duoRepository = new DuoRepository(database);
    }

};


export default BaseService;