import clsx from "clsx";
import {
  Button as RaButton,
  type ButtonProps as RaButtonProps,
} from "react-aria-components";
import styles from "./button.module.scss";

const Button = (props: RaButtonProps) => {
  return (
    <RaButton {...props} className={clsx(props.className, styles.button)}>
      {props.children}
    </RaButton>
  );
};

export { Button };
