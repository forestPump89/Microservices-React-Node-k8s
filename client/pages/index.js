import buildClient from "../api/build-client";

export default function Landing({ currentUser }) {
  return <h1>{currentUser ? "Signed in" : "not signed in"}</h1>;
}

Landing.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};
