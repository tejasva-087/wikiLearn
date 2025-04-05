import Stats from "./ui/Stats";

function SideMenu() {
  return (
    <div className="side-menu">
      <Stats type="streak" points={12} />
      <Stats type="points" points={12} />
      <Stats type="badges" points={12} />
      <Stats type="certificate" points={12} />
    </div>
  );
}

export default SideMenu;
