import LogoutButton from "./LogoutButton";
import Persons from "./Persons";
import SearchPerson from "./SearchPerson";

const SideBar = ({ handleButtonA, onMessage }) => {
  return (
    <div
      className={`${
        onMessage ? "hidden" : ""
      } md:block md:col-span-1 bg-slate-500 bg-opacity-55 md:grid-cols-9 rounded-md p-2`}
    >
      <SearchPerson />
      <Persons handleButtonA={handleButtonA} />
      <LogoutButton />
    </div>
  );
};
export default SideBar;
