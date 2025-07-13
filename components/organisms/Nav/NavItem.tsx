import { Floor } from ".";
import { NavAccordionItem } from "./NavAccordionItem";
import { NavLinkItem } from "./NavLinkItem";

type Props = {
  floor: Floor;
  onAccess?: () => void;
};

export const NavItem = ({ floor, onAccess }: Props) => {
  if ("href" in floor) {
    return <NavLinkItem floor={floor} onAccess={onAccess} />;
  }
  return <NavAccordionItem floor={floor} onAccess={onAccess} />;
};
