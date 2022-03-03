import { Circle, Pulse } from "better-react-spinkit";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
          height={200}
          style={{ marginBottom: 10 }}
        />
        <Circle size={60} color="green" />
      </div>
    </center>
  );
}
