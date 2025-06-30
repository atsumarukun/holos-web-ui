import { Floor } from ".";
import { NavAccordionItem } from "./NavAccordionItem";
import { NavLinkItem } from "./NavLinkItem";

type Props = {
  floor: Floor;
};

export const NavItem = ({ floor }: Props) => {
  if ("href" in floor) {
    return <NavLinkItem floor={floor} />;
  }
  return <NavAccordionItem floor={floor} />;
};
