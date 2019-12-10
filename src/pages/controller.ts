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
import Page from "./entity";

// type PageList = { pages: Page[] };

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number): Page {
    return Page[id];
  }

  @Get("/pages")
  async allPages() {
    const pages = await Page.find();
    return { pages };
  }

  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    return page.save();
  }

  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    const page = await Page.findOne(id);
    if (!page) throw new NotFoundError("Cannot find page");

    return Page.merge(page, update).save();
  }
}
