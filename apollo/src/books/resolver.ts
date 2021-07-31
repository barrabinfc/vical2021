const BOOKS_BASE_ID = "appOqm0oQNWYyP5Kd";

export async function books(
  _: any,
  { limit = 10, page = 0 }: { limit: number; page: number },
  { dataSources }
) {
  const booksAPI = dataSources.books.api;
  const booksResponse = await booksAPI.select(
    "Books",
    {
      pageSize: limit,
      view: "Main View",
    },
    page
  );

  const books = booksResponse.map(({ id, fields }) => ({
    id,
    name: fields.Name,
    synopsis: fields.Synopsis,
  }));
  return books;
}
