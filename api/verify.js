import { createVerify } from "../server/handlers.mjs";
export const config = { api: { bodyParser: { sizeLimit: "1kb" } } };
export default createVerify();
