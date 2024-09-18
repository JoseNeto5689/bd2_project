export function getToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token !== null) {
        try {
          return token;
        } catch (error) {
          console.error(error);
        }
      }
    }
    return [];
  }
  console.log(getToken())

export function verifyToken(token: string, router: any) {
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {if (res.status !== 200) {router.push("/")}})
    .catch((error) => {router.push("/")})
  }