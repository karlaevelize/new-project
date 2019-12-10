import {
  JsonController,
  Get,
  Param,
  Put,
  Post,
  Body,
  HttpCode,
  NotFoundError
} from "routing-controllers";
import User from "./entity";

@JsonController()
export default class UserController {
  @Get("/users/:id")
  getUser(@Param("id") id: number): User {
    return User[id];
  }

  @Get("/users")
  async allUsers() {
    const users = await User.find();
    return { users };
  }

  @Put("/users/:id")
  async updateUser(@Param("id") id: number, @Body() update: Partial<User>) {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundError("Cannot find page");

    return User.merge(user, update).save();
  }

  @Post("/users")
  @HttpCode(201)
  createPage(@Body() user: User) {
    return user.save();
  }
}
