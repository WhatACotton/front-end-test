import { useRouter } from "next/router";
export default function Routing(dest) {
  const router = useRouter();
  router.push(dest);
  return <div></div>;
}
