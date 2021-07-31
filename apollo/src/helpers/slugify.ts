import slugifyIt from "slugify";
export function slugify(txt: string): string {
  return slugifyIt(txt, { remove: /[*+~.()'"!:@]/g });
}
