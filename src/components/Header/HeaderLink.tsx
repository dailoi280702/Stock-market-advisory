import { NavLink, NavLinkProps } from 'react-router-dom';

type Props = NavLinkProps & {
  text: string;
};

const HeaderLink = (props: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${isActive ? 'underline' : ''} underline-offset-[6px] hover:text-blue-600`
      }
      {...props}
    >
      {props.text}
    </NavLink>
  );
};

export default HeaderLink;
