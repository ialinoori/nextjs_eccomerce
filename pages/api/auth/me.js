import { handleError } from "lib/helper";
import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(403).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
      return;
    }

    try {
      const resApi = await axios.post(
        "/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );

      res.status(200).json({ user: resApi.data.data });
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err)] } });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
