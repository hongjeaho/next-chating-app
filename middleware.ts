// https://next-auth.js.org/tutorials/securing-pages-and-api-routes
import { withAuth } from "next-auth/middleware";

// 로그인 되어 있지 않은 경우 로그인 페이지로 이동 처리
export default withAuth({
  pages: {
    signIn: "/",
  },
});

// 로그인한 사용자만 접근 가능
export const config = {
  matcher: ["/conversations/:path*", "/users/:path*"],
};
